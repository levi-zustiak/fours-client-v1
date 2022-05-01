import { createContext, useCallback, useMemo, useContext, ReactNode } from 'react';
import { Socket } from 'socket.io-client';

import useSocketConnection from '@hooks/useSocketConnection';
import useGameSession from '@hooks/useGameSession';

interface ISocketConnection {
    socket: Socket;
    gameId: string;
    connected: boolean;
    createSession: (user: string) => void;
    joinSession: (gameId: string, user: string) => void;
    removeSession: (user: string) => void;
    closeConnection: () => void;
    endSession: (gameId: string) => void;
}

interface IGameSessionContext {
    socketConnection: ISocketConnection;
    gameSession: any;
    createSession: (user: string) => void;
    joinSession: (user: string, gameId: string) => void;
    endSession: (gameId: string) => void;
}

const GameSessionContext = createContext<IGameSessionContext | undefined>(undefined);

function GameSessionContextProvider({ children }: {children: ReactNode}) {
    const socketConnection = useSocketConnection();
    const gameSession = useGameSession(socketConnection.socket);
    const { peerConnection } = gameSession;

    //add error handler function

    const createSession = useCallback((user: string) => {
        socketConnection.createSession(user)
            .then((session) => socketConnection.waitForPlayer(session))
            .then((session) => gameSession.init(session))
            .then(() => peerConnection.createConnection())
            .catch((e) => console.error(e));
    }, []);

    const joinSession = useCallback((user: string, gameId: string) => {
        socketConnection.joinSession(gameId, user)
            .then((session) => gameSession.init(session))
            .catch((e) => console.error(e));
    }, []);

    const endSession = useCallback((gameId: string) => {
        socketConnection.endSession(gameId);
        gameSession.peerConnection.closeConnection();
    }, []);

    const contextValue: IGameSessionContext = useMemo(() => ({
        socketConnection,
        gameSession,
        createSession,
        joinSession,
        endSession,
    }), [socketConnection, gameSession, createSession, joinSession, endSession]);

    return (
        <GameSessionContext.Provider value={contextValue}>
            {children}
        </GameSessionContext.Provider>
    );
}

function useGameSessionContext()  {
    const context = useContext(GameSessionContext);

    if (context === undefined) {
        throw new Error("GameContext was used outside of it's provider");
    }

    return context;
}

export {
    GameSessionContext,
    GameSessionContextProvider,
    useGameSessionContext,
};