import React, { useRef, useState, useEffect } from 'react';

import { PlayContainer } from './Play.styled';

import { Board, InfoBar } from '@components/Game';
import { ModalContainer } from '@components/Modals';

import { useGameSessionContext } from '@hooks/GameContextProvider';
import { UnitContextProvider } from '@hooks/UnitContextProvider';

function Play() {
    const { gameSession } = useGameSessionContext();

    const container = useRef<HTMLDivElement | null>(null);
    const [refState, setRefState] = useState<HTMLDivElement>();

    useEffect(() => {
        if (!container.current) return;

        setRefState(container.current);
    }, [container]);
    
    return (
        <PlayContainer ref={container}>
                <UnitContextProvider value={refState}>
                <Board board={gameSession.game.board} />
                <InfoBar />
                {gameSession.game?.gameOver && <ModalContainer game={gameSession.game} />}
            </UnitContextProvider>
        </PlayContainer>
    )
}

export default Play