import { useRecoilValue } from 'recoil';
import userAtom from '@state/User';

import IModalContainer from './IModalContainer';
import Win from "../Win";
import Lose from "../Lose";

import { Container } from "@styles/Global.styled";

export function ModalContainer(props: IModalContainer) {
    const { game } = props;
    const user = useRecoilValue(userAtom);

    const winner = game.winner && game.winner === user.id && !game.draw;
    const loser = game.loser && game.loser === user.id && !game.draw;

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