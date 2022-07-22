import { createContext, useMemo, useContext, ReactNode, useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { GameOptions, GameState } from '@types';
import useEngine from '@hooks/useEngine';

import { useRecoilValue } from 'recoil';
import peerAtom from '@state/Session/Peer';

type Message = {
    type: string;
    data: any;
}

type GameContext = {
    move: (col: number) => void;
    newGame: () => void;
    reply: (answer: string) => void;
    state: GameState;
}

type GameContextProps = {
    children: ReactNode;
}

const GameContext = createContext<GameContext | undefined>(undefined);

function GameContextProvider({ children }: GameContextProps) {
    // used like mvc service classes
    // const session = useSession();
    const engine = useEngine();
    const connecting = useRef(false);

    const navigate = useNavigate();
    const peer = useRecoilValue(peerAtom);

    const [modalState, setModalState] = useState<string>('DEFAULT');

    // const create = useCallback(() => {
    //     try {
    //         if (!connecting.current) {
    //             session.create();
    //             connecting.current = true;
    //         }
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }, [session]);

    // const join = useCallback((id: string) => {
    //     try {
    //         if (!connecting.current) {
    //             session.join(id);
    //             connecting.current = true;
    //         }
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }, [session]);

    const move = useCallback((col: number): void => {
        try {
            engine.move(col);
        } catch (e) {
            console.error(e);
        }
    }, [engine]);

    const newGame = useCallback(() => {
        try {
            engine.newGame()
        } catch (e) {
            console.error(e);
        }
    }, [engine]);

    const reply = useCallback((answer: string) => {
        try {
            engine.reply(answer)
        } catch (e) {
            console.error(e);
        }
    }, [engine]);

    const leave = useCallback(() => {
        console.log('leave');
    }, []);

    useEffect(() => {
        if (peer.id) {
            navigate('/play');
        }
    }, [peer]);

    const contextValue: GameContext = useMemo(() => ({
        // create,
        // join,
        move,
        newGame,
        reply,
        state: engine.state
    }), [move, reply, newGame, engine.state]);

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
}

function useGameContext()  {
    const context = useContext(GameContext);

    if (context === undefined) {
        throw new Error("GameContext was used outside of it's provider");
    }

    return context;
}

export {
    GameContext,
    GameContextProvider,
    useGameContext,
};