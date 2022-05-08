import { useSessionContext } from '@providers/SessionContextProvider';

import { Container, Text } from './Timer.styled';

function Timer() {
    const { game } = useSessionContext();

    const player = game.state.currentPlayer ?? {};

    return (
        <Container player={player}>
            <Text>{game.time}</Text>
        </Container>
    );
}

export default Timer;