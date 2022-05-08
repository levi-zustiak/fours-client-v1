import { useRef, useState, useCallback } from 'react';
import { Socket } from 'socket.io-client';

import { useRecoilValue } from 'recoil';
import sessionAtom from '@state/Session';

import { config } from '@utils/Constants';

import { ISession, IUser } from '@types';

const usePeerConnection = (socket: Socket) => {
    const session = useRecoilValue<ISession>(sessionAtom);
    const _socket = useRef<Socket>(socket);
    const _peer = useRef<IUser>();
    const pc = useRef<RTCPeerConnection>();
    const channel = useRef<RTCDataChannel>();
    const [connected, setConnected] = useState<boolean>(false);

    const init = useCallback((onMessage: (e: any) => void) => {
        _peer.current = session.peer;

        pc.current = new RTCPeerConnection(config);
        channel.current = pc.current.createDataChannel("gameChannel");

        pc.current.ondatachannel = setChannelListener;
        pc.current.onicecandidate = sendCandidate

        channel.current.onmessage = onMessage;
        channel.current.onopen = connectionOpen;
        channel.current.onclose = connectionClose;

        console.log(pc.current);
    }, [session]);

    const create = useCallback(async (): Promise<void> => {
        try {
            console.log('create');
            if (pc.current) {
                const offer = await pc.current.createOffer();
                const description = await new RTCSessionDescription(offer);
                await pc.current.setLocalDescription(description);
    
                message(description);
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    interface IConnectionMessage {
        description: RTCSessionDescription;
    }

    const handleMessage = useCallback(async ({ description }: IConnectionMessage): Promise<void> => {
        try {
            console.log('message-received');
            if (description && pc.current) {
                switch (description.type) {
                    case 'offer': {

                        const remoteDescription = await new RTCSessionDescription(description);
                        await pc.current.setRemoteDescription(remoteDescription);

                        const answer = await pc.current.createAnswer();
                        await pc.current.setLocalDescription(answer);

                        message(answer);

                        break;
                    }

                    case 'answer': {
                        const remoteDescription = await new RTCSessionDescription(description);
                        await pc.current.setRemoteDescription(remoteDescription);

                        break;
                    }
                }
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    const message = useCallback((description: RTCSessionDescriptionInit) => {
        console.log('sending message');
        _socket.current.emit('connectionMessage', {
            to: _peer.current,
            description: description,
        }, handleRes)
    }, []);

    interface IResponse {
        status: boolean;
        data?: any;
        error?: Error;
    }

    const handleRes = ({ status, error }: IResponse) => {
        if (!status) {
            console.error(error);
            throw new Error('Failed to send candidate');
        }
    }

    const sendCandidate = useCallback(({ candidate }: RTCPeerConnectionIceEvent): void => {
        _socket.current.emit('candidateOffer', {
            peer: _peer.current,
            candidate: candidate,
        }, handleRes);
    }, [session]);

    interface ICandidateMessage {
        candidate: RTCIceCandidate;
    }

    const handleCandidate = async ({ candidate }: ICandidateMessage): Promise<void> => {
        const _candidate = await new RTCIceCandidate(candidate);
        pc.current?.addIceCandidate(_candidate);
    }

    const setChannelListener = async (e: any): Promise<void> => {
        channel.current = await e.channel
    }

    interface IMessage {
        type: string;
        data: unknown;
    }

    const sendMessage = (message: IMessage): void => {
        console.log('sendMessage');
        if (channel.current) {
            channel.current.send(JSON.stringify(message));
        }
    }

    const connectionOpen = () => {
        console.log('connected');
        setConnected(true);
    }

    const connectionClose = () => {
        console.log('disconnected');
        setConnected(false);
    }

    const closeConnection = async (): Promise<void> => {
        if (channel.current) {
            await channel.current.close();
        }
        if (pc.current) {
            await pc.current.close();
        }
    }

    const setListeners = () => {
        console.log('peer listeners');
        _socket.current.on('message-received', handleMessage);
        _socket.current.on('ice-candidate-received', handleCandidate);
    }

    const removeListeners = () => {
        _socket.current.off('message-received');
        _socket.current.off('ice-candidate-recieved');
    }

    return {
        init,
        create,
        sendMessage,
        closeConnection,
        connected,
        setListeners,
        removeListeners
    }
}

export default usePeerConnection;