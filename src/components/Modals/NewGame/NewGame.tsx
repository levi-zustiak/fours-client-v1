import { useGameContext } from "@providers/GameContextProvider";
import { ModalCard, Flex, Button } from "@styles/Global.styled";

function NewGame() {
    const { newGame } = useGameContext();

    const leave = () => {
        console.log('leave');
    }

    return (
        <ModalCard>
            <Flex direction="row" gap="1rem">
                <Button background="yellow" color="black" onClick={newGame}>New Game</Button>
                <Button background="red" color="white" onClick={leave}>Leave</Button>
            </Flex>
        </ModalCard>
    )
}

export default NewGame;