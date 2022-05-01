import { useCallback, useState } from 'react';

import { useGameSessionContext } from '@hooks/GameContextProvider';

import GameId from '@components/GameId';
import { Invite, Start } from '@components/Create';
import { Container } from './Create.styled'

const Create = () => {
    const [step, setStep] = useState(1);
    const { socketConnection } = useGameSessionContext();
    const gameId = socketConnection.gameId;

    const nextStep = () => {
        setStep((step) => ++step)
    }

    const prevStep = () => {
        setStep((step) => --step);
    }

    const getStep = useCallback(() => {
        switch (step) {
            case 1:
                return (
                    <Invite
                        nextStep={nextStep}
                    />
                )
            case 2:
                return (
                    <Start
                        prevStep={prevStep}
                    />
                )
            default:
                console.log('no steps');
        }
    }, [step]);

    return (
        <Container>
            {getStep()}
            {gameId && <GameId id={gameId} />}
        </Container>
    )
}

export default Create;