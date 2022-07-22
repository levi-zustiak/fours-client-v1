import { Container } from "@styles/Global.styled";
import { useGameContext } from '@providers/GameContextProvider';
import Waiting from "../Waiting";
import Choice from "../Choice";
import NewGame from "../NewGame";
import { useState } from "react";

export function ModalContainer() {
    // const {  } = useGameContext();
    const [modalState, setModalState] = useState('DEFAULT');

    // const gameOver = !game.state.playing;
    const gameOver = false;

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