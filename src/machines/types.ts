import { Socket } from 'socket.io-client';
import { User } from 'src/types';

type ResponseError = {
    msg: string;
}

export type Ack = {
    response: number;
    data: unknown;
    error?: ResponseError;
}

export type Joined = {
    user: User;
}

export type Context = {
    socket: Socket;
    gameId?: string;
    peer?: User;
}

export type Events =
    | { type: 'CREATE', data: { user: User } }
    | { type: 'JOIN', data: { gameId: string, user: User }}
    | { type: 'SUCCESS', data: { gameId: string } }
    | { type: 'JOINED', data: { peer: User } }
    | { type: 'LEAVE' };

export type States = 
    | { value: 'idle', context: { socket: Socket } }
    | { value: 'create', context: { socket: Socket } }
    | { value: 'join', context: { socket: Socket, gameId: string } }
    | { value: 'waiting', context: { socket: Socket, gameId: string } }
    | { value: 'connected', context: { socket: Socket, gameId: string, peer: User }}