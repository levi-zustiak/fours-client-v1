import { useEffect, useState } from 'react';
import { GameState } from '@types';

import { useRecoilState, useRecoilValue } from 'recoil';
import gameIdAtom from '@state/Session/GameId';
import stateAtom from '@state/Game/State';

export type Message = {
    type: string;
    data: any;
}

function useEngine() {
    const [state, setState] = useRecoilState<GameState>(stateAtom);
    const [playingAs, setPlayingAs] = useState<string>('');
    const [opponent, setOpponent] = useState<string>('');
    const gameId = useRecoilValue(gameIdAtom);

    // const start = (opts: GameOptions) => {
    //     setPlayingAs(opts.playingAs)
    //     setOpponent(opts.playingAs === 'p1' ? 'p2' : 'p1')

    //     setState({
    //         ...defaultState,
    //         playing: true,
    //     })
    // };

    const move = (col: number): void => {
        //if playing and myTurn and isAvailable
        message('MOVE', { col });
    }

    const newGame = () => {
        message('NEW_GAME');
    }

    const reply = (answer: string) => {
        message('REPLY', { answer });
    }

    const message = (type: string, data: unknown = {}) => {
        console.log('sending message');
        // socket.emit('sendMessage', { type, data });
    }

    const handleMessage = ({ type, data }: Message) => {
        console.log(type, data);
        switch (type) {
            //not sure if this one is needed
            case 'START':
                setState(data.state);

                setPlayingAs(data.playingAs)
                break;

            case 'STATE':
                setState(data);
                break;

            case 'NEW_GAME':
                break;
        }
    }

    useEffect(() => {
        console.log('engine mount');
        // socket.on('message', handleMessage)

        return () => {
            // socket.off('message');
        }
    }, []);

    // useEffect(() => {
    //     console.log(state);
    // }, [state]);

    return {
        state,
        move,
        newGame,
        reply,
        playingAs
    }
}

export default useEngine;