import { useCallback, useEffect, useState } from 'react';

import GameId from '@components/GameId';
import { Invite, Start } from '@components/Create';
import { Container } from './Create.styled'
import { useRecoilValue } from 'recoil';
import sessionAtom from '@state/Session';
import { ISession } from '@types';
import { useSessionContext } from '@providers/SessionContextProvider';

const Create = () => {
    const [step, setStep] = useState(1);
    const session = useRecoilValue<ISession>(sessionAtom);
    const { peerConnection } = useSessionContext();

    const nextStep = () => {
        setStep((step) => ++step)
    }

    const prevStep = () => {
        setStep((step) => --step);
    }

    useEffect(() => {
        peerConnection.setListeners();

        return () => {
            peerConnection.removeListeners();
        }
    }, []);

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
            {session.gameId && <GameId id={session.gameId} />}
        </Container>
    )
}

export default Create;