import { useSessionContext } from '@providers/SessionContextProvider';

import IPlayerCard from './IPlayerCard';

import { Container, Text } from './PlayerCard.styled';

function PlayerCard(props: IPlayerCard) {
    const { position } = props;
    const { game } = useSessionContext();

    const player = game.state[position] ?? {};

    return (
        <Container player={player}>
            <Text>{player.user.name}</Text>
        </Container>
    );
}

export default PlayerCard;