import styled from 'styled-components';

export const Graphic = styled.div`
    background-image: url('/imgs/Background.png');
    background-size: cover;
    flex: 7;
    height: 100vh;
`

export const StepContainer = styled.div`
    flex: 1;
    height: 100vh;
    max-width: 960px;
    margin: 0 auto;
    box-shadow: var(--white-shadow);
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid red;
`

export const Step = styled.div`
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

//Step Form Styles
export const TextContainer = styled.div`
    display: grid;
    gap: 8px;
    grid-template-areas:
        'Title Close'
        'Description Description';
`

export const Title = styled.h1`
    margin: 0;
    font-size: var(--title);
    grid-area: Title;
`

export const Description = styled.p`
    margin: 0;
    font-size: var(--text);
    font-weight: 600;
    color: var(--darkgrey);
    grid-area: Description;
`

export const Text = styled.p`
    margin: 0;
    font-size: var(--text);
    font-weight: 600;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`