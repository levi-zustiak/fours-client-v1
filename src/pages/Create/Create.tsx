import { useCallback, useState } from 'react';

import GameStatus from '@components/GameStatus';
import { Invite } from '@components/Create';
import { Container } from './Create.styled';

const Create = () => {
    const [step, setStep] = useState(1);

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
                    null
                )
            default:
                console.log('no steps');
        }
    }, [step]);

    return (
        <Container>
            {getStep()}
            <GameStatus />
        </Container>
    )
}

export default Create;