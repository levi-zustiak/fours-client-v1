import { IToken } from "@types";

interface IBoard {
    board: Array<Array<IToken | null>>;
}

export default IBoard;