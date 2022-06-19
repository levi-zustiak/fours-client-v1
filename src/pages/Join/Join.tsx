import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { Ready } from '@components/Join';
import { Container } from './Join.styled';
import { useSessionContext } from '@providers/SessionContextProvider';
import GameStatus from '@components/GameStatus';
import { useRecoilValue } from 'recoil';
import userAtom from '@state/User';

const Join = () => {
    const [step, setStep] = useState(1);
    const { session } = useSessionContext();
    const params = useParams();
    const user = useRecoilValue(userAtom);

    const nextStep = () => {
        setStep((step) => ++step)
    }

    const prevStep = () => {
        setStep((step) => --step);
    }

    useEffect(() => {
        if (params?.id && !session.connecting.current) {
            session.join(params?.id);
        }
    }, [params]);

    const getStep = useCallback(() => {
        switch (step) {
            case 1:
                return (
                    <Ready
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
            <GameStatus />
        </Container>
    );
}

export default Join;