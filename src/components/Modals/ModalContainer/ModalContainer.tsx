import { useRecoilValue } from 'recoil';
import userAtom from '@state/User';

import IModalContainer from './IModalContainer';
import Win from "../Win";
import Lose from "../Lose";

import { Container } from "@styles/Global.styled";

export function ModalContainer(props: IModalContainer) {
    const { game } = props;
    const user = useRecoilValue(userAtom);


    const winner = game.winner === user && !game.draw;
    const loser = game.loser === user && !game.draw;

    return (
        <Container>
            {winner && <Win />}
            {loser && <Lose />}
            {/* <Draw /> */}
            {/* <Invite /> */}
        </Container>
    );
}

export default ModalContainer;