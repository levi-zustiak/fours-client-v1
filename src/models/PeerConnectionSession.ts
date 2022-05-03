import { Socket } from 'socket.io-client';
import { config } from '../utils/Constants';
import { IPeer, IUser } from '@types';

interface IData {
    type: string;
    data: unknown;
}

class PeerConnectionSession {
    user!: IUser;
    peer!: IPeer;
    gameId!: string;
    _socket: Socket;
    _pc!: RTCPeerConnection;
    _channel!: RTCDataChannel;

    constructor(socket: Socket) {
        this._socket = socket;
        this.onIceCandidateReceived();
        this.onReceiveMessage();
    }

    init(gameId: string,
        user: IUser,
        peer: IPeer,
        onData: (e: any) => void,
        handleConnectionOpen: () => void,
        handleConnectionClose: () => void
    ): Promise<void> {
        this.gameId = gameId;
        this.user = user;
        this.peer = peer;

        this._pc = new RTCPeerConnection(config);
        this._channel = this._pc.createDataChannel("gameChannel");
        this._pc.ondatachannel = async (e) => {
            this._channel = await e.channel;
        }
        this._channel.onmessage = onData;
        this._channel.onopen = handleConnectionOpen;
        this._channel.onclose = handleConnectionClose;

        console.log(this._pc);

        return Promise.resolve();
    }

    async createConnection(): Promise<void> {
        this._pc.onicecandidate = this.sendCandidates;

        const offer = await this._pc.createOffer();
        const description = await new RTCSessionDescription(offer);
        await this._pc.setLocalDescription(description);

        console.log('createConn', this.gameId, this.peer, description);

        this._socket.emit('sendMessage', {
            gameId: this.gameId,
            to: this.peer,
            description: description,
        });
    }

    async onReceiveMessage(): Promise<void> {
        this._socket.on('message-received', async ({ description }) => {
            console.log('message-recieved', description);
            if (description) {
                if (description.type === 'offer') {
                    this._pc.ondatachannel = async (e) => {
                        this._channel = await e.channel;
                    }
                    this._pc.onicecandidate = this.sendCandidates;

                    const remoteDescription = await new RTCSessionDescription(description);
                    await this._pc.setRemoteDescription(remoteDescription);

                    const answer = await this._pc.createAnswer();
                    await this._pc.setLocalDescription(answer);

                    console.log('sendMessage', this.gameId, this.peer, description)


                    this._socket.emit('sendMessage', {
                        gameId: this.gameId,
                        to: this.peer,
                        description: answer,
                    });
                }
                if (description.type === 'answer') {
                    const remoteDescription = await new RTCSessionDescription(description);
                    await this._pc.setRemoteDescription(remoteDescription);
                }
            }
        })
    }

    //onInviteDecline()

    sendCandidates = (e: any): void => {
        if (e.candidate) {
            this._socket.emit('candidateOffer', {
                gameId: this.gameId,
                peer: this.peer,
                candidate: e.candidate,
            });
        }
    }

    onIceCandidateReceived(): void {
        this._socket.on('ice-candidate-received', async ({ candidate }) => {
            if (candidate) {
                const c = await new RTCIceCandidate(candidate);
                this._pc.addIceCandidate(c);
            }
        });
    }

    sendData(data: IData): void {
        this._channel.send(JSON.stringify(data));
    }

    closeConnection(): void {
        if (this._pc) {
            console.log('cleared pc');
            // delete this._pc;
        }
    }
}

export const createPeerConnectionContext = (socket: Socket) => {
    return new PeerConnectionSession(socket);
}