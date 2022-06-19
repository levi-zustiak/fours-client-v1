import { Container } from './InfoBar.styled';

import PlayerCard from './components/PlayerCard';

function InfoBar() {
    return (
        <Container>
            <PlayerCard position={'p1'} />
            <PlayerCard position={'p2'} />
        </Container>
    );
}

export default InfoBar;