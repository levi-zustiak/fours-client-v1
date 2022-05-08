import { IPlayer, IToken } from '@types';

interface IGame {
    p1: IPlayer;
    p2: IPlayer;
    currentPlayer: IPlayer;
    winner?: string;
    loser?: string;
    draw: boolean;
    playing: boolean;
    board: Array<Array<IToken | null>>;
}

export default IGame;