import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';
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

interface LocationState {
    from: {
        pathname: string;
    }
}

function User() {
    const [value, setValue] = useState<string>('');
    const [user, setUser] = useRecoilState(userAtom);

    const navigate = useNavigate();
    const location = useLocation();

    const state = location.state as LocationState;

    const path= state?.from?.pathname || '/option';

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const id = window.crypto.randomUUID();
        setUser({
            ...user,
            id: id,
            name: value
        });
        navigate(path, { replace: true });
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