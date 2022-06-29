import { useGameContext } from "@providers/GameContextProvider";
import { ModalCard, Flex, Button } from "@styles/Global.styled";

function Choice() {
    const { reply } = useGameContext();

    const handleAccept = () => reply('ACCEPT');

    const handleDecline = () => reply('DECLINE');

    return (
        <ModalCard>
            <Flex direction="row" gap="1rem">
                <Button background="yellow" color="black" onClick={handleAccept}>Accept</Button>
                <Button background="red" color="white" onClick={handleDecline}>Decline</Button>
            </Flex>
        </ModalCard>
    )
}

export default Choice;