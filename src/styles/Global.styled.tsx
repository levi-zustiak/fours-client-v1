import styled from 'styled-components';

export const PageContainer = styled.div`
    height: 100vh;
    width: 100vw;
`

interface IFlex {
    direction?: string;
    content?: string;
    gap?: string;
}

export const Flex = styled.div<IFlex>`
    display: flex;
    flex-direction: ${p => p.direction ?? 'row'};
    justify-content: ${p => p.content ?? 'initial'};
    gap: ${p => p.gap ?? '0'};
`

export const Container = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    z-index: 10;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.5);
`

export const ModalCard = styled.div`
    width: 300px;
    background-color: white;
    border-radius: 15px;
    padding: 1rem;
    text-align: center;
    display: flex;
    flex-direction: column;
`

interface IButton {
    background?: string;
    color?: string;
    flex?: number;
    disabled?: boolean;
}

export const Button = styled.button<IButton>`
    background-color: ${p => `var(--${p.background})`};
    color: ${p => p.color};
    flex: ${p => p.flex ?? 'initial'};
    padding: 1rem 1.5rem;
    border-radius: 12px;
    border: none;
    font-weight: 700;
    font-size: 16px;
    box-shadow: ${p => `var(--${p.color}-shadow)`};
`

export const Input = styled.input`
    height: 60px;
    border-radius: 12px;
    border: none;
    background-color: var(--lightgrey);
    font-size: 1rem;
    font-weight: 600;
    padding-left: 1rem;
    margin-bottom: 1rem;

    &:focus {
        border-color: var(--black);
    }

    &::placeholder {
        color: var(--light-text);
    }
`