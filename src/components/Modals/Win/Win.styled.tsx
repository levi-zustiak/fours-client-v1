import styled from 'styled-components';

export const Icon = styled.svg`
    height: 50px;
    fill: var(--yellow);
    filter: drop-shadow(0 0 5px var(--yellow));
    animation: test 2.5s linear infinite;

    @keyframes test {
        50% {
            transform: rotateY(180deg) translateY(-5px);
        }
    }
`