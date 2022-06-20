import { useEffect } from 'react';

import GameStatus from '@components/GameStatus';
import { Container } from './Create.styled';
import { useSessionContext } from '@providers/SessionContextProvider';

import CloseButton from '@components/CloseButton';
import { Flex, Button } from '@styles/Global.styled';
import {
    Step,
    TextContainer,
    Title,
    Description
} from '@styles/Step.styled';

const Create = () => {
    const { session } = useSessionContext();

    const copyInvite = () => {
        const invite = `${process.env.REACT_APP_CLIENT_URL}/join/${session.gameId}`;
        navigator.clipboard.writeText(invite);
    }

    useEffect(() => {
        if (!session.connecting.current) {
            session.create();
        }
    }, []);

    const back = () => {
        //router.to(option) ?
    }

    return (
        <Container>
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
        </Container>
    )
}

export default Create;