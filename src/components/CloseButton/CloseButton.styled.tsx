import styled from 'styled-components';

export const Container = styled.div`
    display: inline-block;
    border-radius: 8px;
    padding: .5rem;
    line-height: 0;
    background-color: var(--lightgrey);
    grid-area: Close;
    justify-self: end;
    align-self: center;
`

export const Icon = styled.svg`
    height: 1rem;
    width: 1rem;
    fill: black;
`