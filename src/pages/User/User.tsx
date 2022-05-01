import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSetRecoilState } from 'recoil';
import userAtom from '@state/User';

import { Container } from './User.styled';
import CloseButton from '@components/CloseButton';
import { Flex, Button, Input } from '@styles/Global.styled';
import {
    Step,
    TextContainer,
    Title,
    Description,
    Form
} from '@styles/Step.styled';

function User() {
    const [value, setValue] = useState<string>('');
    const setUser = useSetRecoilState(userAtom);

    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Promisify these to make sure the user joined the session
        setUser(value);
        navigate('/option');
    }

    return (
        <Container>
            <Step>
                <TextContainer>
                    <Title>User</Title>
                    <CloseButton />
                    <Description>Enter a name so other players can identify you.</Description>
                </TextContainer>
                <Flex direction={'column'}>
                    <Form onSubmit={handleSubmit} autoComplete="off">
                        <Input value={value} placeholder="Name" onChange={(e) => setValue(e.target.value)} />
                        <Button
                            onClick={handleSubmit}
                            background={'red'}
                            color={'white'}
                        >
                            Submit
                        </Button>
                    </Form>
                </Flex>
            </Step>
        </Container>
    );
}

export default User;