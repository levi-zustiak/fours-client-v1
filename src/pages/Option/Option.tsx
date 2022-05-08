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

export default function Option() {
    const navigate = useNavigate();

    const create = () => {
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