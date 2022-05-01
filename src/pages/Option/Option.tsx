import { useNavigate } from 'react-router-dom';
import CloseButton from '@components/CloseButton';
import { Container } from '@pages/Option/Option.styled';
import { Flex, Button } from '@styles/Global.styled';
import {
    Step,
    TextContainer,
    Title,
    Description,
} from '@styles/Step.styled';
import { useGameSessionContext } from '@hooks/GameContextProvider';
import { useRecoilValue } from 'recoil';
import userAtom from '@state/User';

export default function Option() {
    const { createSession } = useGameSessionContext();
    const navigate = useNavigate();

    const user = useRecoilValue(userAtom);

    const create = () => {
        createSession(user);
        navigate('/create');
    }

    const join = () => {
        navigate('/join');
    }

    return (
        <Container>
            <Step>
                <TextContainer>
                    <Title>Option</Title>
                    <CloseButton />
                    <Description>Choose whether to create a game or join another player.</Description>
                </TextContainer>
                <Flex gap="1rem">
                    <Button
                        onClick={create}
                        background={'yellow'}
                        color={'black'}
                        flex={1}
                    >Create</Button>
                    <Button
                        onClick={join}
                        background={'red'}
                        color={'white'}
                        flex={1}
                    >Join</Button>
                </Flex>
            </Step>
        </Container>
    );
}