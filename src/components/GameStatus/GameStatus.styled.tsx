import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    left: 1.5rem;
    bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 8px;
`

interface IStatus {
    status?: boolean;
}

export const StatusIndicator = styled.div<IStatus>`
    border-radius: 50%;
    background-color: ${p => p.status ? 'var(--green)' : 'var(--mediumgrey)'};
    height: 12px;
    width: 12px;
`

export const Id = styled.h3`
    margin: 0;
    line-height: 0;
`