import styled from 'styled-components';
import { IUnits } from '@types';

interface IBoard {
    units: IUnits;
}

export const BoardContainer = styled.div<IBoard>`
    aspect-ratio: 96 / 74;
    background-color: var(--board-color);
    border-radius: ${({ units }) => units.xl};
    display: flex;
    margin: 0 auto;
    padding: ${({ units }) => units.xl};
`;