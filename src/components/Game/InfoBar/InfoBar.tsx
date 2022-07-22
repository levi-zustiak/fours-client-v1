import { Container } from './InfoBar.styled';

import PlayerCard from './components/PlayerCard';
import { User } from '@types';
import { useGameContext } from '@providers/GameContextProvider';

type InfoBarProps = {
    type: string;
    player?: User;
}

function InfoBar(props: InfoBarProps) {
    const { type, player } = props;
    // const { playingAs } = useGameContext();
    // const position = type === 'host' ? game.playingAs : game.opponent

    return (
        <Container>
            {/* {position && <PlayerCard position={position} player={player}/>} */}
        </Container>
    );
}

export default InfoBar;