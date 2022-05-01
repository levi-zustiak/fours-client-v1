import { useGameSessionContext } from '@hooks/GameContextProvider';

import IPlayerCard from './IPlayerCard';

import { Container, Text } from './PlayerCard.styled';

function PlayerCard(props: IPlayerCard) {
    const { position } = props;
    const { gameSession } = useGameSessionContext();

    const player = gameSession.game[position] ?? {};

    return (
        <Container player={player}>
            <Text>{player.name}</Text>
        </Container>
    );
}

export default PlayerCard;