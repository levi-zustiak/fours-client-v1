import { GameContainer, PlayContainer } from './Play.styled';

// import { InfoBar } from '@components/Game';
// import { ModalContainer } from '@components/Modals';

import { GameContextProvider } from '@providers/GameContextProvider';
// import { UnitContextProvider } from '@providers/UnitContextProvider';
import Game from '../../game';
import { useSessionContext } from '@providers/SessionContextProvider';

function Play() {
    const { session } = useSessionContext(); 

    return (
        <PlayContainer>
            <GameContainer>
                <GameContextProvider>
                    <Game />
                </GameContextProvider>
            </GameContainer>
                {/* <UnitContextProvider value={refState}>
                <InfoBar />
                {!game.state.playing && <ModalContainer game={game.state} />}
            </UnitContextProvider> */}
        </PlayContainer>
    )
}

export default Play