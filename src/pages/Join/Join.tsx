import { useState, FormEvent, ChangeEvent } from 'react';

import InputCard from '@components/InputCard';
import { Container } from './Join.styled';
import GameStatus from '@components/GameStatus';
import { useSessionContext } from '@providers/SessionContextProvider';
import { useRecoilValue } from 'recoil';
import userAtom from '@state/User';

const Join = () => {
    const [value, setValue] = useState<string>('');
    const svc = useSessionContext();
    const user = useRecoilValue(userAtom);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        if (value) {
            svc.send({ type: 'JOIN', data: { gameId: value, user } })
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

    const inputProps = {
        text: {
            heading: 'Join',
            subHeading: 'Enter a game id to join an existing game.',
            placeholder: 'Id',
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
            <InputCard {...inputProps} />
            <GameStatus />
        </Container>
    );
}

export default Join;