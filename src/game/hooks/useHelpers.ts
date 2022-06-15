import { useRecoilValue } from "recoil";
import gameAtom from "../state/gameAtom";

function useHelpers() {
  const { board } = useRecoilValue(gameAtom);

  const isAvailable = (i: number) => {
    return board[i].includes(null);
  };

  const getNextRow = (col: number) => {
    return board[col].indexOf(null);
  };

  return {
    isAvailable,
    getNextRow
  };
}

export default useHelpers;
