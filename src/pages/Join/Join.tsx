import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { useRecoilState, useRecoilValue } from 'recoil';

import { Ready } from '@components/Join';
import { Container } from './Join.styled';
import userAtom from '@state/User';
import { useSessionContext } from '@providers/SessionContextProvider';
import sessionAtom from '@state/Session';
import { ISession } from '@types';
import GameId from '@components/GameId';

const Join = () => {
    const [step, setStep] = useState(1);
    const { socketConnection, peerConnection } = useSessionContext();
    const user = useRecoilValue(userAtom);
    const [session, setSession] = useRecoilState<ISession>(sessionAtom);
    const { id } = useParams();

    const nextStep = () => {
        setStep((step) => ++step)
    }

    const prevStep = () => {
        setStep((step) => --step);
    }

    useEffect(() => {
        setSession({
            ...session,
            gameId: id,
        })
    }, [id])

    useEffect(() => {
        if (session.gameId) {
            socketConnection.join(session.gameId, user);
            peerConnection.setListeners();
        }

        return () => {
            peerConnection.removeListeners();
        }
    }, [session.gameId]);

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
            {session.gameId && <GameId id={session.gameId} />}
        </Container>
    );
}

export default Join;