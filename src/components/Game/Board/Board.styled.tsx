import styled from 'styled-components';
import { IUnits } from '@types';

interface IBoard {
    units: IUnits;
}

export const BoardContainer = styled.div<IBoard>`
    aspect-ratio: 96 / 74;
    background-color: var(--board-color);
    box-shadow: var(--blue-shadow);
    border-radius: ${({ units }) => units.xl};
    display: flex;
    margin: 0 auto;
    padding: ${({ units }) => units.xl};
`;