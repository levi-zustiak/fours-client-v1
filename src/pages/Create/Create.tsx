import GameStatus from '@components/GameStatus';
import { Container } from './Create.styled';

import CloseButton from '@components/CloseButton';
import { Flex, Button } from '@styles/Global.styled';
import {
    Step,
    TextContainer,
    Title,
    Description
} from '@styles/Step.styled';
import { useSessionContext } from '@providers/SessionContextProvider';
import { useActor, useSelector } from '@xstate/react';

const Create = () => {
    const svc = useSessionContext();
    const [state] = useActor(svc);
    const gameId = useSelector(svc, (state: any) => state.context.gameId)

    console.log(state);

    const copyInvite = () => {
        const invite = `${process.env.REACT_APP_CLIENT_URL}/join/${gameId}`;
        navigator.clipboard.writeText(invite);
    }

    const back = () => {
        null
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