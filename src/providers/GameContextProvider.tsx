import useGame from '@hooks/useGame';
import { createContext, useMemo, useContext, ReactNode, useEffect, useState } from 'react';

import { GameOptions, GameState } from '@types';
import { useSessionContext } from './SessionContextProvider';

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
    playingAs: string;
    opponent: string;
}

type GameContext = {
    game: Game;
    move: (col: number) => void;
    newGame: () => void;
    reply: (type: string) => void;
    modalState: string;
}

type GameContextProps = {
    children: ReactNode;
}

const GameContext = createContext<GameContext | undefined>(undefined);

function GameContextProvider({ children }: GameContextProps) {
    const { session } = useSessionContext();

    const game = useGame();
    const [modalState, setModalState] = useState<string>('DEFAULT');

    const move = async (col: number): Promise<void> => {
        if (game.state.playing && game.myTurn() && game.isAvailable(col)) {
            const newState = await game.getState(col);

            sendMessage({
                type: 'GAME_MESSAGE',
                data: newState
            });
        }
    }

    const newGame = async () => {
        setModalState('AWAIT_REPLY');

        sendMessage({
            type: 'NEW_GAME',
            data: {}
        });
    }

    const reply = async (type: string) => {
        setModalState('DEFAULT')

        sendMessage({
            type: type,
            data: {}
        })
    }

    const sendMessage = (message: Message): void => {
        session.channel.current?.send(JSON.stringify(message));
    }

    const onMessage = (e: MessageEvent) => {
        const { type, data } = JSON.parse(e.data);

        console.log(type, data);

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

            case 'NEW_GAME':
                setModalState('AWAIT_CHOICE');

                break;

            case 'ACCEPT':
                console.log('Rematch accepted');
                setModalState('DEFAULT');
                startGame();

                break;

            case 'DECLINE':
                //set to declined state
                console.log('Rematch declined');
                setModalState('DEFAULT');

                break;
        }
    }

    const startGame = () => {
        game.start({
            playingAs: 'p1'
        });

        sendMessage({
            type: 'START_GAME',
            data: {
                playingAs: 'p2'
            }
        });
    }

    useEffect(() => {
        if (session.channel.current) {
            session.channel.current.onmessage = onMessage; 
        }

        if (session.type.current === 'HOST') {
            startGame();
        }
    }, []);

    useEffect(() => {
        console.log(modalState);
    }, [modalState])

    const contextValue: GameContext = useMemo(() => ({
        game,
        move,
        newGame,
        reply,
        modalState
    }), [game, move, reply, newGame, modalState]);

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