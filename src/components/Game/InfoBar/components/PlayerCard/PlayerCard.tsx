import { useGameContext } from '@providers/GameContextProvider';
import { useSessionContext } from '@providers/SessionContextProvider';
import { useSpring } from 'react-spring';
import { User } from '@types';
import { useEffect, useState } from 'react';

import { Container, Text } from './PlayerCard.styled';

type PlayerCardProps = {
    position: string;
    player?: User;
}

type Colors = {
    backgroundColor: string;
    color: string;
}

type Theme = {
    [key: string]: any;
    p1: Colors;
    p2: Colors;
}

const theme: Theme = {
    p1: {
        backgroundColor: 'var(--red)',
        color: 'white'
    },
    p2: {
        backgroundColor: 'var(--yellow)',
        color: 'var(--black)'
    }
}

function PlayerCard(props: PlayerCardProps) {
    const { position, player } = props;

    const { game } = useGameContext();
    const [active, setActive] = useState<boolean>(false);

    const spring = useSpring({
        opacity: active ? 1 : 0.25,
        config: {
            mass: 3,
            tension: 300
        }
    });

    useEffect(() => {
        setActive(position === game.state.currentPlayer);
    }, [game.state])

    const containerProps = {
        backgroundColor: theme[position].backgroundColor,
        color: theme[position].color,
    }

    return (
        <Container style={spring} {...containerProps}>
            <Text>{player?.name}</Text>
        </Container>
    );
}

export default PlayerCard;