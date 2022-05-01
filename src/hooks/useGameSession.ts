import { useMemo, useCallback, useState } from 'react';
import { IPlayers } from '@types';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { ISession } from '@types';

import { createPeerConnectionContext } from '@models/PeerConnectionSession';
import useGame from '@hooks/useGame';

import errorAtom from '@state/Error';
import { Socket } from 'socket.io-client';

export const useGameSession = (socket: Socket) => {
    const [connected, setConnected] = useState<boolean>(false);
    const setError = useSetRecoilState(errorAtom);
    const navigate = useNavigate();

    //peerConnection logic
    const peerConnection = useMemo(() => createPeerConnectionContext(socket), []);

    const init = useCallback(async (session: ISession): Promise<void> => {
        peerConnection.init(
            session.gameId,
            session.user,
            session.peer,
            onData,
            handleConnectionOpen,
            handleConnectionClose,
        )

        return Promise.resolve();
    }, []);

    const handleConnectionOpen = () => {
        console.log('connected');
        setConnected(true);
    }

    const handleConnectionClose = () => {
        console.log('disconnected');
        setConnected(false);
    }

    //Game logic
    const { game, time, setGame, turn, createGame } = useGame();

    const move = async (move: number): Promise<void> => {
        try {
            if (!game.gameOver && game.myTurn) {
                const tempState = await turn(move);

                peerConnection.sendData({
                    type: 'move',
                    data: tempState,
                });

                setGame({
                    ...game,
                    ...tempState,
                });
            }
        } catch (e: any) {
            setError(e.message);
        }
    }

    const onData = (e: any) => {
        const { type, data } = JSON.parse(e.data);

        switch (type) {
            case 'init':
                createGame(data);
                navigate('/play');
                break;

            case 'newGame':
                createGame(data);
                break;

            case 'move':
                setGame({ ...data });
                break;
        }
    }

    const newGame = () => {
        const players: IPlayers = {
            p1: peerConnection.user,
            p2: peerConnection.peer.user,
        };

        createGame(players);

        peerConnection.sendData({
            type: 'newGame',
            data: players,
        });
    }

    const gameInit = () => {
        const players: IPlayers = {
            p1: peerConnection.user,
            p2: peerConnection.peer.user,
        };

        createGame(players);

        peerConnection.sendData({
            type: 'init',
            data: players,
        });

        navigate('/play');
    }

    return {
        peerConnection,
        init,
        connected,
        game,
        gameInit,
        newGame,
        move,
        time,
    };
};

export default useGameSession;