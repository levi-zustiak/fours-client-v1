import { useSessionContext } from '@providers/SessionContextProvider';

import IPlayerCard from './IPlayerCard';

import { Container, Text } from './PlayerCard.styled';

function PlayerCard(props: IPlayerCard) {
    const { position } = props;

    return (
        // <Container player={player}>
        //     <Text>{player.user.name}</Text>
        // </Container>
        null
    );
}

export default PlayerCard;