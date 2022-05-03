import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { useRecoilState, useRecoilValue } from 'recoil';
import gameIdAtom from '@state/GameId';

import { Ready } from '@components/Join';
import { Container } from './Join.styled';
import userAtom from '@state/User';
import { useGameSessionContext } from '@hooks/GameContextProvider';

const Join = () => {
    const [step, setStep] = useState(1);
    const [gameId, setGameId] = useRecoilState(gameIdAtom);
    const { joinSession } = useGameSessionContext();
    const user = useRecoilValue(userAtom);
    const { id } = useParams();

    const nextStep = () => {
        setStep((step) => ++step)
    }

    const prevStep = () => {
        setStep((step) => --step);
    }

    useEffect(() => {
        setGameId(id);
    }, [gameId])

    // useEffect(() => {
    //     if (user && gameId) {
    //         joinSession(user, gameId);
    //     }
    // })

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
        </Container>
    );
}

export default Join;