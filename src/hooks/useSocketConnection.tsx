import { useCallback, useEffect, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';
import { IUser, ISession } from '@types';

import { useRecoilState, useResetRecoilState } from 'recoil';
import userAtom from '@state/User';
import sessionAtom from '@state/Session';

enum Session {
    PEER = 'PEER',
    HOST = 'HOST',
}

const useSocketConnection = () => {
    const [user, setUser] = useRecoilState(userAtom);
    const [session, setSession] = useRecoilState<ISession>(sessionAtom);
    const reset = useResetRecoilState(sessionAtom);

    const closeConnection = useCallback(() => {
        socket?.close();
    }, []);

    const endSession = (gameId: string) => {
        socket.emit('endSession', { gameId: gameId, user: 'test' });
        reset();
    }

    const socket: Socket = useMemo(() => {
        return io(process.env.REACT_APP_SERVER_URL || 'localhost:3001');
    }, []);

    interface IResponse {
        status: boolean;
        data?: any;
        error?: Error;
    }

    const createAck = ({ status, data, error }: IResponse) => {
        console.log('createAck');
        if (!status) {
            console.error(error);
            throw new Error('Failed to create game');
        }

        setSession({
            type: Session.HOST,
            gameId: data.gameId,
        })
    }

    const create = useCallback(async (user: IUser): Promise<void> => {
        try {
            console.log('create');
            await socket.emit('createSession', {
                user: user,
            }, createAck);

        } catch (e) {
            console.error(e);
        }
    }, []);

    const handleJoin = async ({ peer }: { peer: IUser }) => {
        setSession({
            ...session,
            connected: true,
            peer: peer,
        });
    }

    //get the game state from the other player when reconnecting to a gameSession

    const joinAck = ({ status, data, error }: IResponse) => {
        if (!status) {
            console.error(error);
            throw new Error('Failed to join game');
        }

        setSession({
            connected: true,
            type: Session.PEER,
            gameId: data?.gameId,
            peer: data?.peer,
        });
    }

    const join = useCallback(async (gameId: string, user: IUser): Promise<void> => {
        try {
            await socket.emit('joinSession', {
                gameId: gameId,
                user: user,
            }, joinAck);
        } catch (e) {
            console.error(e);
        }
    }, []);

    const removeSession = (user: IUser) => {
        if (socket) {
            socket.emit('removeSession', {
                gameId: session.gameId,
                user: user,
            });
        }
    }

    const setListeners = () => {
        console.log('socket listeners');
        socket.on('player-joined', handleJoin);
    };

    const removeListeners = () => {
        socket.off('player-joined');
    };

    useEffect(() => {
        if (socket.id) {
            setUser({
                ...user,
                socket: socket.id
            })
        }
    }, [socket.id]);

    useEffect(() => {
        if (session.gameId) {
            setListeners();
        }

        return () => {
            removeListeners();
        }
    }, [session]);

    return {
        socket,
        create,
        join,
        removeSession,
        closeConnection,
        endSession,
    }
}

export default useSocketConnection;