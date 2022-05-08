import { useRef, useState, useEffect } from 'react';

import { PlayContainer } from './Play.styled';

import { Board, InfoBar } from '@components/Game';
import { ModalContainer } from '@components/Modals';

import { useSessionContext } from '@providers/SessionContextProvider';
import { UnitContextProvider } from '@providers/UnitContextProvider';

function Play() {
    const { game } = useSessionContext();

    const container = useRef<HTMLDivElement | null>(null);
    const [refState, setRefState] = useState<HTMLDivElement>();

    useEffect(() => {
        if (container.current) {
            setRefState(container.current);
        }
    }, [container]);

    return (
        <PlayContainer ref={container}>
                <UnitContextProvider value={refState}>
                <Board board={game.state.board} />
                <InfoBar />
                {!game.state.playing && <ModalContainer game={game.state} />}
            </UnitContextProvider>
        </PlayContainer>
    )
}

export default Play