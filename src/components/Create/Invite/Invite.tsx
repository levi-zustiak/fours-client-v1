import { useEffect } from 'react';
import { useGameSessionContext } from '@hooks/GameContextProvider';

import IInvite from './IInvite';

import CloseButton from '@components/CloseButton';
import { Flex, Button } from '@styles/Global.styled';
import {
    Step,
    TextContainer,
    Title,
    Description
} from '@styles/Step.styled';

export default function Invite(props: IInvite) {
    const { nextStep } = props;

    const { socketConnection, gameSession } = useGameSessionContext();

    const copyInvite = () => {
        const invite = `${process.env.REACT_APP_CLIENT_URL}/join/${socketConnection.gameId}`;
        navigator.clipboard.writeText(invite);
    }

    useEffect(() => {
        if (gameSession.connected) {
            console.log('connected');
            nextStep();
        }
    }, [gameSession]);

    const back = () => {
        //close socket connection
        // router.back();
    }

    return (
        <Step>
            <TextContainer>
                <Title>Invite</Title>
                <CloseButton />
                <Description>Copy the invite and send it to another player to join your game.</Description>
            </TextContainer>
            <Flex content={'start'}>
                <Button
                    onClick={copyInvite}
                    background={'red'}
                    color={'white'}
                    >Copy Invite</Button>
                <Button
                    onClick={back}
                    background={'lightgrey'}
                    color={'black'}
                    >Back</Button>
            </Flex>
        </Step>
    );
}