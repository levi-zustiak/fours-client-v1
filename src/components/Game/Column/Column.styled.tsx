import styled from 'styled-components';
import { IUnits } from '@types';

interface IColumn {
    units: IUnits;
}

export const ColContainer = styled.div<IColumn>`
    display: flex;
    flex-direction: column-reverse;
    flex: 1;
    gap: ${({ units }) => units.s};
    align-items: center;
`