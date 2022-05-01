import styled from 'styled-components';
import { IPlayer } from '@types';

const style = ({ player }: IContainer) => (`
    background-color: ${player.primary};
    color: ${player.secondary};
`);

interface IContainer {
    player: IPlayer
}

export const Container = styled.div<IContainer>`
    ${p => style(p)}
    border-radius: 8px;
`

export const Text = styled.p`
    margin: 0;
    padding: .75rem 1.5rem;
    font-family: 'Fredoka One', sans-serif;
`