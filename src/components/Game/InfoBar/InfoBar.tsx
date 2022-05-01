import { Container } from './InfoBar.styled';

import PlayerCard from './components/PlayerCard';
import Timer from './components/Timer';

function InfoBar() {
    return (
        <Container>
            <PlayerCard position={'p1'} />
            <Timer />
            <PlayerCard position={'p2'} />
        </Container>
    );
}

export default InfoBar;