import styled from 'styled-components';
import { Player } from '@types';

const style = ({ player }: Container) => (`
    background-color: ${player.color};
    color: ${player.color};
`);

type Container = {
    player: Player
}

export const Container = styled.div<Container>`
    ${p => style(p)}
    border-radius: 8px;
`

export const Text = styled.p`
    margin: 0;
    padding: .75rem 1.5rem;
    font-family: 'Fredoka One', sans-serif;
`