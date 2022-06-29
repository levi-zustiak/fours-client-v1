import { Container } from "@styles/Global.styled";
import { useGameContext } from '@providers/GameContextProvider';
import Waiting from "../Waiting";
import Choice from "../Choice";
import NewGame from "../NewGame";

export function ModalContainer() {
    const { game, modalState } = useGameContext();

    const gameOver = !game.state.playing;

    const getState = () => {
        switch (modalState) {
            case 'AWAIT_REPLY':
                return <Waiting />

            case 'AWAIT_CHOICE':
                return <Choice />

            default:
                return <NewGame />
        }
    }

    return (
        <>
            {gameOver && <Container>
                {getState()}
            </Container>}
        </>
    );
}

export default ModalContainer;