import styled from "styled-components";

export const Container = styled.div`
    background-color: white;
    border-radius: 15px;
    padding: 2.5rem 3rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const Heading = styled.h1`
    margin: 0;
`

export const Animation = styled.div`
    display: flex;
    justify-content: center;
    gap: 6px;

    & > div {
        background-color: var(--red);
        border-radius: 50%;
        height: 1rem;
        width: 1rem;

        &:nth-child(2) {
            background-color: var(--yellow);
        }
    } 
`