import { useGameSessionContext } from "@hooks/GameContextProvider";

import IReady from './IReady';

import CloseButton from '@components/CloseButton';
import { Flex, Button } from '@styles/Global.styled';
import {
    Step,
    TextContainer,
    Title,
    Description
} from '@styles/Step.styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '@state/User';
import gameIdAtom from '@state/GameId';

export default function Ready(props: IReady) {
    const { prevStep } = props;

    const user = useRecoilValue(userAtom);
    const [gameId, ] = useRecoilState(gameIdAtom);
    const { joinSession } = useGameSessionContext();

    const ready = () => {
        console.log('ready', user, gameId)
        joinSession(user, gameId);
    }

    const back = () => {
        // router.push('/option')
    }

    const title = 'Ready?';
    const description = 'Let your opponent know you’re ready to start the game.';
 
    return (
        <Step>
            <TextContainer>
                <Title>{title}</Title>
                <CloseButton />
                <Description>{description}</Description>
            </TextContainer>
            <Flex content={'start'}>
                <Button
                    onClick={ready}
                    background={'red'}
                    color={'white'}
                >Ready</Button>
                <Button
                    onClick={back}
                    background={'lightgrey'}
                    color={'black'}
                >Back</Button>
            </Flex>
        </Step>
    );
}