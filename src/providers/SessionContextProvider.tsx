import { createContext, useCallback, useMemo, useContext, ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Socket } from 'socket.io-client';

import { useRecoilValue } from 'recoil';
import sessionAtom from '@state/Session';
import userAtom from '@state/User';

import useSocketConnection from '@hooks/useSocketConnection';
import usePeerConnection from '@hooks/usePeerConnection';
import useGame from '@hooks/useGame';

import { ISession, IUser, IPlayers, IGame } from '@types';

interface ISocketConnection {
    socket: Socket;
    create: (user: IUser) => void;
    join: (gameId: string, user: IUser) => void;
    removeSession: (user: IUser) => void;
    closeConnection: () => void;
    endSession: (gameId: string) => void;
}

// interface IPeerConnection {
//     init
// }

interface IGameSession {
    state: IGame;
    setState: any;
    init: (players: IPlayers) => void;
    turn: (move: number) => any;
    myTurn: () => boolean;
    isValidMove: (move: number) => boolean;
    time: number;
}

interface ISessionContext {
    socketConnection: ISocketConnection;
    peerConnection: any;
    game: any;
    move: (move: number) => void;
    newGame: () => void;
    endSession: (gameId: string) => void;
}

const SessionContext = createContext<ISessionContext | undefined>(undefined);

function SessionContextProvider({ children }: {children: ReactNode}) {
    const socketConnection = useSocketConnection();
    const peerConnection = usePeerConnection(socketConnection.socket);
    const game = useGame();

    const location = useLocation();
    const navigate = useNavigate();

    const session = useRecoilValue<ISession>(sessionAtom);
    const user = useRecoilValue(userAtom);

    const onMessage = (e: any) => {
        const { type, data } = JSON.parse(e.data);
        console.log('onMessage', type, data, game);

        switch (type) {
            case 'NEW_GAME':
                game.init(data);
                break;

            case 'GAME_MESSAGE':
                game.setState({ ...game.state, ...data });
                break;
        }
    }

    const move = useCallback(async (move: number): Promise<void> => {
        try {
            if (game.state.playing && game.myTurn() && game.isValidMove(move)) {
                const newState = await game.turn(move);

                peerConnection.sendMessage({
                    type: 'GAME_MESSAGE',
                    data: newState,
                });

                game.setState({
                    ...game.state,
                    ...newState,
                });
            }
        } catch (e: any) {
            console.error(e);
        }
    }, [game, peerConnection]);

    const newGame = useCallback(() => {
        const players: IPlayers = {
            p1: user,
            p2: session.peer,
        };

        game.init(players);

        peerConnection.sendMessage({
            type: 'NEW_GAME',
            data: players,
        });
    }, [user, session]);

    const endSession = useCallback((gameId: string) => {
        socketConnection.endSession(gameId);
        peerConnection.closeConnection();
    }, []);

    useEffect(() => {
        if (session.connected) {
            switch (session.type) {
                case 'HOST': {
                    peerConnection.init(onMessage);
                    peerConnection.create();

                    break;
                }

                case 'PEER': {
                    peerConnection.init(onMessage);

                    break;
                }

                default:
                    break;
            }
        }
    }, [session]);

    useEffect(() => {
        if (game.state.playing) {
            if (location.pathname !== '/play') {
                navigate('/play');
            }
        }
    }, [game.state.playing]);

    const contextValue: ISessionContext = useMemo(() => ({
        socketConnection,
        peerConnection,
        game,
        move,
        newGame,
        endSession,
    }), [socketConnection, peerConnection, game, move, newGame, endSession]);

    return (
        <SessionContext.Provider value={contextValue}>
            {children}
        </SessionContext.Provider>
    );
}

function useSessionContext()  {
    const context = useContext(SessionContext);

    if (context === undefined) {
        throw new Error("GameContext was used outside of it's provider");
    }

    return context;
}

export {
    SessionContext,
    SessionContextProvider,
    useSessionContext,
};