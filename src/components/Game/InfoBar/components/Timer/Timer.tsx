import { useGameSessionContext } from '@hooks/GameContextProvider';

import { Container, Text } from './Timer.styled';

function Timer() {
    const { gameSession } = useGameSessionContext();

    const player = gameSession.game.currentPlayer ?? {};

    return (
        <Container player={player}>
            <Text>{gameSession.time}</Text>
        </Container>
    );
}

export default Timer;