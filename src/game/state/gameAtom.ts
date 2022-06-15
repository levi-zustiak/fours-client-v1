import { atom } from "recoil";

interface IGameAtom {
  board: Array<Array<null | { key: string; value: boolean; }>>;
  turn: boolean;
}

const defaultState: IGameAtom = {
  board: [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null]
  ],
  turn: true
};

const gameAtom = atom({
  key: "GAME",
  default: defaultState
});

export default gameAtom;
