import { Container, BoardContainer } from './Play.styled';

// import { InfoBar } from '@components/Game';
// import { ModalContainer } from '@components/Modals';
// import { UnitContextProvider } from '@providers/UnitContextProvider';
import Game from '../../game';
import { InfoBar } from '@components/Game';
import { useRecoilValue } from 'recoil';
import { ModalContainer } from '@components/Modals';
import userAtom from '@state/User';
import peerAtom from '@state/Session/Peer';

function Play() {
    const user = useRecoilValue(userAtom);
    const peer = useRecoilValue(peerAtom);

    return (
        <Container>
            <InfoBar type="peer" player={peer}/>
            <BoardContainer>
                <Game />
            </BoardContainer>
            <InfoBar type="host" player={user}/>
            <ModalContainer/>
        </Container>
    )
}

export default Play