import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';

import InputCard from '@components/InputCard';
import { Container } from './Join.styled';
import { useSessionContext } from '@providers/SessionContextProvider';
import GameStatus from '@components/GameStatus';

const Join = () => {
    const { session } = useSessionContext();
    const params = useParams();
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        if (params?.id && !session.connecting.current) {
            session.join(params?.id);
        }
    }, [params]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        if (value) {
            session.join(value);
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