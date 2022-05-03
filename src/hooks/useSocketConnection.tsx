import { useCallback, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { IPeer, ISession, IUser } from '@types';

import { useRecoilState, useResetRecoilState } from 'recoil';
import gameIdAtom from '@state/GameId';

const useSocketConnection = () => {
    const [gameId, setgameId] = useRecoilState(gameIdAtom);
    const reset = useResetRecoilState(gameIdAtom);
    const [connected, setConnected] = useState<boolean>(false);

    const closeConnection = useCallback(() => {
        socket?.close();
    }, []);

    const endSession = useCallback((gameId: string) => {
        socket.emit('endSession', { gameId: gameId, user: 'test' });
        reset();
        setConnected(false);
    }, []);

    const socket: Socket = useMemo(() => {
        return io(process.env.REACT_APP_SERVER_URL || 'localhost:3001');
    }, []);

    interface ICreate {
        connected: boolean;
        gameId: string;
        user: IUser;
    }

    const createAck = ({ connected, gameId, user }: ICreate, resolve: any, reject: any) => {
        if (connected) {
            setConnected(connected);
            resolve({
                gameId: gameId,
                user: user,
            });
        }

        reject(new Error('Failed to create session'));
    }

    const createSession = useCallback((user: IUser): Promise<{gameId: string; user: IUser;}> => {
        const gameId = window.crypto.randomUUID().slice(0, 8);

        setgameId(gameId);

        return new Promise((resolve, reject) => {
            socket.emit('createSession', {
                gameId: gameId,
                user: user,
            }, async (data: ICreate) => {
                await createAck(data, resolve, reject);
            });
        })
    }, []);

    //get the game state from the other player when reconnecting to a gameSession

    interface IJoin {
        connected: boolean;
        gameId: string;
        user: IUser;
        peer: IPeer;
    }

    const joinAck = ({ connected, gameId, user, peer }: IJoin, resolve: (value: ISession) => void, reject: any) => {
        if (connected) {
            setConnected(connected);
            resolve({
                gameId: gameId,
                user: user,
                peer: peer,
            });
        }

        reject(new Error('Failed to create session'));
    }

    const joinSession = useCallback((gameId: string, user: IUser): Promise<ISession> => {
        setgameId(gameId);

        return new Promise ((resolve: any, reject: any) => {
            socket.emit('joinSession', {
                gameId: gameId,
                user: user,
            }, async (data: IJoin) => {
                await joinAck(data, resolve, reject);
            });
        });
    }, []);

    const removeSession = useCallback((user: IUser) => {
        if (socket) {
            socket.emit('removeSession', {
                gameId: gameId,
                user: user,
            });
        }
    }, []);

    const waitForPlayer = useCallback(async (session: {gameId: string; user: IUser}): Promise<ISession> => {
        return new Promise ((resolve) => {
            socket.on('player-joined', ({ peer }) => {
                resolve({
                    ...session,
                    peer: peer
                });
            });
        })
    }, []);

    return {
        socket,
        gameId,
        connected,
        createSession,
        joinSession,
        removeSession,
        waitForPlayer,
        closeConnection,
        endSession,
    }
}

export default useSocketConnection;