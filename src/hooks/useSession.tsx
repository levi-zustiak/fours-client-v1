import { useRef, useState, useCallback, useEffect } from 'react';

import { useRecoilValue } from 'recoil';
import userAtom from '@state/User';

import { config } from '@utils/Constants';

import { IUser, IMessage } from '@types';

import useSocket from './useSocket';

type Response = {
    status: boolean,
    data?: any,
    error?: Error
};

type CandidateMessage = {
    candidate: RTCIceCandidate;
}

type ConnectionMessage = {
    description: RTCSessionDescription;
}

const useSession = () => {
    const { socket } = useSocket();
    const user = useRecoilValue<IUser>(userAtom);
    const type = useRef<string>();
    const peer = useRef<IUser>();
    const gameId = useRef<string>();
    const channel = useRef<RTCDataChannel>();
    const pc = useRef<RTCPeerConnection>();
    const connecting = useRef<boolean>(false);
    const [connected, setConnected] = useState<boolean>(false);


    //Signaling server logic
    const create = useCallback(async (): Promise<void> => {
        try {
            type.current = 'HOST';
            connecting.current = true;

            await socket.emit('createSession', {
                player: {
                    ...user,
                    socket: socket.id
                }
            }, createAck);

        } catch (e) {
            console.error(e);
        }
    }, [user]);

    const createAck = ({ status, data, error }: Response): void => {
        if (!status) {
            console.error(error);
            throw new Error('Failed to create session');
        }

        gameId.current = data?.gameId;
        socket.on('player-joined', handleJoin);
    }

    const join = useCallback(async (id: string): Promise<void> => {
        try {
            type.current = 'PEER';
            connecting.current = true;

            gameId.current = id;

            await socket.emit('joinSession', {
                gameId: id,
                player: {
                    ...user,
                    socket: socket.id
                }
            }, joinAck);

        } catch (e) {
            console.error(e);
        }
    }, [user]);

    const joinAck = ({ status, data, error }: Response): void => {
        if (!status) {
            console.error(error);
            throw new Error('Failed to join game');
        }

        peer.current = data?.peer;

        createPeerConnection();
    }

    const end = useCallback((): void => {
        socket.emit('endSession', {
            gameId: gameId.current,
            user: user,
        });
    }, [user]);

    const handleJoin = ({ player }: { player: IUser }): void => {
            peer.current = player;

            createOffer();
    };
    
    //PeerConnection Logic
    const createPeerConnection = useCallback(async (): Promise<void> => {
        try {
            const peerconnection = new RTCPeerConnection(config);
            
            if (type.current === 'HOST') {
                const dataChannel = peerconnection.createDataChannel("gameChannel")
                
                dataChannel.onopen = channelOpen;
                dataChannel.onclose = channelClose;

                channel.current = dataChannel
            }

            if (type.current === 'PEER') {
                peerconnection.ondatachannel = setChannelListener;
            }

            peerconnection.onicecandidate = sendCandidate;

            pc.current = peerconnection;
            setListeners();
        } catch (e) {
            console.error(e);
        }
    }, []);

    const createOffer = async (): Promise<void> => {
        try {
            await createPeerConnection();

            if (pc.current) {
                const offer = await pc.current.createOffer();
                const description = await new RTCSessionDescription(offer);
                await pc.current.setLocalDescription(description);
    
                message(description);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const message = (description: RTCSessionDescriptionInit): void => {
        socket.emit('connectionMessage', {
            to: peer.current,
            description: description,
        }, handleRes)
    }; 

    const handleMessage = async ({ description }: ConnectionMessage): Promise<void> => {
        try {
            if (pc.current) {
                if (description) {
                    switch (description.type) {
                        case 'offer': {
                            const remoteDescription = await new RTCSessionDescription(description);
                            pc.current.setRemoteDescription(remoteDescription);

                            const answer = await pc.current.createAnswer();
                            pc.current.setLocalDescription(answer);

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
            }
        } catch (e) {
            console.error(e);
        }
    };

    const sendCandidate = ({ candidate }: RTCPeerConnectionIceEvent): void => {
        socket.emit('candidateOffer', {
            peer: peer.current,
            candidate: candidate,
        }, handleRes);
    };

    const handleCandidate = async ({ candidate }: CandidateMessage): Promise<void> => {
        if (candidate) {
            const _candidate = await new RTCIceCandidate(candidate);
            pc.current?.addIceCandidate(_candidate);
        }
    }

    const setChannelListener = useCallback(async (e: RTCDataChannelEvent): Promise<void> => {
        const dataChannel = await e.channel;
        dataChannel.onopen = channelOpen;
        dataChannel.onclose = channelClose;

        channel.current = dataChannel;
    }, [channel]);

    const channelOpen = (): void => {
        console.log('connection opened');
        setConnected(true);
    }

    const channelClose = (): void => {
        console.log('connection closed');
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

    const handleRes = ({ status, error }: Response): void => {
        if (!status) {
            console.error(error);
            throw new Error('Failed to send candidate');
        }
    }

    const setListeners = (): void => {
        socket.on('message-received', handleMessage)
        socket.on('ice-candidate-received', handleCandidate);
    };

    const removeListeners = (): void => {
        socket.off('player-joined');
        socket.off('message-received');
        socket.off('ice-candidate-recieved');
    }

    useEffect(() => {
        () => {
            removeListeners();
            closeConnection();
        }
    }, []);

    return {
        type,
        peer,
        gameId,
        channel,
        connected,
        connecting,
        create,
        join,
        end,
        closeConnection,
    }
}

export default useSession;