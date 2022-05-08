import styled from 'styled-components';
import { IUnits } from '@types';

interface IContainer {
    units: IUnits;
}

export const CellContainer = styled.div<IContainer>`
    flex: 1;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    border: ${({ units }) => units.m} solid var(--board-border);
    background-color: white;
    box-shadow: inset 0 4px 15px rgba(53, 167, 255, 0.5);
`

const style = ({ token, units }: IToken) => (
    `background-color: ${token.primary};`
);

interface IToken {
    token: {
        primary: string;
        secondary: string;
    };
    units: IUnits;
}

export const Token = styled.div<IToken>`
    height: 100%;
    width: 100%;
    border-radius: 50%;
    transition: all 250ms ease-in-out;
    ${p => style(p)};
`