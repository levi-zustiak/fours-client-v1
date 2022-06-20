import { useSessionContext } from '@providers/SessionContextProvider';

import { Container, Text } from './PlayerCard.styled';

type PlayerCardProps = {
    position: string;
}

function PlayerCard(props: PlayerCardProps) {
    const { position } = props;

    return (
        // <Container player={player}>
        //     <Text>{player.user.name}</Text>
        // </Container>
        null
    );
}

export default PlayerCard;