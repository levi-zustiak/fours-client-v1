import styled from 'styled-components';
import { IPlayer } from '@types';

const style = ({ player }: IContainer) => (`
    background-color: ${player.token.primary};
    color: ${player.token.secondary};
`);

interface IContainer {
    player: IPlayer;
}

export const Container = styled.div<IContainer>`
    ${p => style(p)}
    border-radius: 8px;
`

export const Text = styled.p`
    margin: 0;
    padding: .5rem 1rem;
    border-radius: 8px;
    font-family: 'Fredoka One', sans-serif;
`