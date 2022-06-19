import { useEffect } from 'react';
import { useSessionContext } from '@providers/SessionContextProvider';

import CloseButton from '@components/CloseButton';
import { Flex, Button } from '@styles/Global.styled';
import {
    Step,
    TextContainer,
    Title,
    Description
} from '@styles/Step.styled';
import { useRecoilValue } from 'recoil';
import userAtom from '@state/User';

export default function Invite() {
    const user = useRecoilValue(userAtom);

    const { session } = useSessionContext();

    const copyInvite = () => {
        const invite = `${process.env.REACT_APP_CLIENT_URL}/join/${session.gameId?.current}`;
        navigator.clipboard.writeText(invite);
    }

    useEffect(() => {
        if (!session.connecting.current) {
            session.create();
        }
    }, []);

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