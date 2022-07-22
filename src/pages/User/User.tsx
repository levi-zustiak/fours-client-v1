import { ChangeEvent, FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSetRecoilState } from 'recoil';
import userAtom from '@state/User';

import InputCard from '@components/InputCard';
import { Container } from './User.styled';

type LocationState = {
    from: {
        pathname: string;
    }
}

function User() {
    const [value, setValue] = useState<string>('');
    const setUser = useSetRecoilState(userAtom);

    const navigate = useNavigate();
    const location = useLocation();

    const state = location.state as LocationState;

    const path= state?.from?.pathname || '/option';

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const id = window.crypto.randomUUID();
        setUser({
            id,
            name: value
        });
        navigate(path, { replace: true });
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)

    const inputProps = {
        text: {
            heading: 'User',
            subHeading: 'Enter a name so other players can identify you.',
            placeholder: 'Name',
            buttonText: 'Submit'
        },
        colors: {
            buttonBackground: 'red',
            buttonColor: 'white'
        },
        value,
        handleChange,
        handleSubmit
    };

    return (
        <Container>
            <InputCard {...inputProps}/>
        </Container>
    );
}

export default User;