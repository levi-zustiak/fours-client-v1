import useGame from '@hooks/useGame';
import { createContext, useMemo, useContext, ReactNode, useEffect } from 'react';

import { GameOptions, GameState, Players } from '@types';
import { useSessionContext } from './SessionContextProvider';
import { useRecoilValue } from 'recoil';
import userAtom from '@state/User';

export type Message = {
    type: string;
    data: any;
}

type Game = {
    state: GameState;
    setState: any;
    getState: (col: number) => Promise<GameState>;
    start: (opts: GameOptions) => void;
    myTurn: () => boolean;
    isAvailable: (move: number) => boolean;
    getNextRow: (col: number) => number;
}

type GameContext = {
    game: Game;
    move: (col: number) => void;
}

type GameContextProps = {
    children: ReactNode;
}

const GameContext = createContext<GameContext | undefined>(undefined);

function GameContextProvider({ children }: GameContextProps) {
    const { session } = useSessionContext();

    const game = useGame();
    const user = useRecoilValue(userAtom);

    const move = async (col: number): Promise<void> => {
        if (game.state.playing && game.myTurn() && game.isAvailable(col)) {
            const newState = await game.getState(col);

            sendMessage({
                type: 'GAME_MESSAGE',
                data: newState
            });
        }
    }

    const sendMessage = (message: Message): void => {
        session.channel.current?.send(JSON.stringify(message));
    }

    const onMessage = (e: MessageEvent) => {
        const { type, data } = JSON.parse(e.data);

        switch (type) {
            case 'GAME_MESSAGE':
                game.setState({
                    ...game.state,
                    ...data
                });
                break;

            case 'START_GAME':
                game.start(data);

                break;

            case 'REMATCH':
                //handle rematch logic

                break;

            case 'ACCEPT':
                //handle accept rematch logic

                break;

            case 'DECLINE':
                //handle accept rematch logic

                break;
        }
    }

    const newGame = () => {
        const players: Players = {
            p1: user,
            p2: session.peer.current
        };

        game.start({
            players
        });

        sendMessage({
            type: 'NEW_GAME',
            data: {
                players,
            }
        });
    }

    useEffect(() => {
        if (session.channel.current) {
            session.channel.current.onmessage = onMessage; 
        }

        if (session.type.current === 'HOST') {
            newGame();
        }
    }, []);

    const contextValue: GameContext = useMemo(() => ({
        game,
        move
    }), [game, move]);

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
}

function useGameContext()  {
    const context = useContext(GameContext);

    if (context === undefined) {
        throw new Error("SessionContext was used outside of it's provider");
    }

    return context;
}

export {
    GameContext,
    GameContextProvider,
    useGameContext,
};