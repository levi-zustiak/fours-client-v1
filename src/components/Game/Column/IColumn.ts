import { IToken } from "@types";

interface IColumn {
    index: number;
    column: Array<IToken | null>;
}

export default IColumn;