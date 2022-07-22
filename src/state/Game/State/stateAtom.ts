import { atom } from "recoil";
import EAtoms from "@state/EAtoms";
import { GameState } from "@types";

const defaultState: GameState = {
    currentPlayer: 'p1',
    winner: '',
    loser: '',
    draw: false,
    gameOver: false,
    board: [
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        ['p1', 'p1', 'p1', null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null]
    ]
} 

const stateAtom = atom<GameState>({
  key: EAtoms.GAMESTATE,
  default: defaultState
});

export default stateAtom;
