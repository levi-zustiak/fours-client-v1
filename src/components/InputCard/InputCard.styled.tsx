import styled from 'styled-components';

export const Container = styled.div`
    width: 382px;
    // max-width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 4rem;
    background-color: white;
    padding: 2rem;
    border-radius: 2rem;
`

export const TextContainer = styled.div`
    display: grid;
    gap: 8px;
    grid-template-areas:
        'Title Close'
        'Description Description';
`

export const Heading = styled.h1`
    margin: 0;
    font-size: var(--title);
    grid-area: Title;
`

export const SubHeading = styled.p`
    margin: 0;
    font-size: var(--text);
    font-weight: 600;
    color: var(--darkgrey);
    grid-area: Description;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`