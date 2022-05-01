import styled from 'styled-components';

export const Icon = styled.svg`
    height: 50px;
    width: 50px;
    margin: 0 auto;
    fill: var(--red);
    filter: drop-shadow(0 0 5px var(--red));
    animation: test 2s linear infinite;
    transform-origin: bottom left;


    @keyframes test {
        50% {
            transform: translateY(-5px) rotate(-10deg);
        }
    }
`