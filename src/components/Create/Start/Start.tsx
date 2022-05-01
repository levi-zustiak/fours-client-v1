import { useGameSessionContext } from '@hooks/GameContextProvider';

import IStart from './IStart';

import CloseButton from '@components/CloseButton';
import { Flex, Button } from '@styles/Global.styled';
import {
    Step,
    TextContainer,
    Title,
    Description
} from '@styles/Step.styled';

export default function Start(props: IStart) {
    const { prevStep } = props;

    const { gameSession } = useGameSessionContext();

    const startGame = () => {
        if (gameSession.connected) {
            gameSession.gameInit();
        }
    }

    const title = 'Title';
    const description = 'Description';
     
    return (
        <Step>
            <TextContainer>
                <Title>{title}</Title>
                <CloseButton />
                <Description>{description}</Description>
            </TextContainer>
            <Flex content={'start'}>
                <Button
                    onClick={startGame}
                    background={'yellow'}
                    color={'black'}
                >Start Game</Button>
                <Button
                    onClick={prevStep}
                    background={'lightgrey'}
                    color={'black'}
                >Back</Button>
            </Flex>
        </Step>
    );
}