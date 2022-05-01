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

const style = ({ value, units }: IToken) => {
    const tokenColor = value === 1 ? 'var(--red)' : 'var(--yellow)';
    return `border: ${units.m} solid ${tokenColor};
    background-color: ${tokenColor};
    div {
        background-color: ${tokenColor};
        height: 100%;
        width: 100%;
        border-radius: 50%;
        box-shadow: 0 ${units.xs} ${units.s} rgba(0,0,0,.25);
    }`
};

interface IToken {
    value: number;
    units: IUnits;
}

export const Token = styled.div<IToken>`
    height: 100%;
    width: 100%;
    border-radius: 50%;
    padding: ${({ units }) => units.s};
    box-shadow: inset 0 4px 8px rgba(0,0,0,.33);
    transition: all 250ms ease-in-out;
    ${p => style(p)};
`

export const TokenStyle = styled.div`
    height: 100%;
    width: 100%;
    border-radius: 50%;
`