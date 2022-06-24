import styled from 'styled-components';
import { animated } from 'react-spring';

type Props = {
    backgroundColor: string;
    color: string;
}

export const Container = styled(animated.div)<Props>`
    border-radius: 8px;
    ${p => `
        background-color: ${p.backgroundColor};
        color: ${p.color}
    `}
`

export const Text = styled.p`
    margin: 0;
    padding: .75rem 1.25rem;
    font-family: 'Fredoka One', sans-serif;
`