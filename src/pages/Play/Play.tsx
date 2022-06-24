import { Container, BoardContainer } from './Play.styled';

// import { InfoBar } from '@components/Game';
// import { ModalContainer } from '@components/Modals';

import { GameContextProvider } from '@providers/GameContextProvider';
// import { UnitContextProvider } from '@providers/UnitContextProvider';
import Game from '../../game';
import { useSessionContext } from '@providers/SessionContextProvider';
import { InfoBar } from '@components/Game';
import { useRecoilValue } from 'recoil';
import userAtom from '@state/User';

function Play() {
    const { session } = useSessionContext();
    const user = useRecoilValue(userAtom);

    return (
        <Container>
            <GameContextProvider>
                <InfoBar type="peer" player={session.peer.current}/>
                <BoardContainer>
                    <Game />
                </BoardContainer>
                <InfoBar type="host" player={user}/>
            </GameContextProvider>
        </Container>
    )
}

export default Play