import { IPlayer } from '@types';

interface IGame {
    [key: string]: any;
    p1: IPlayer;
    p2: IPlayer;
    currentPlayer: IPlayer;
    winner?: string;
    loser?: string;
    draw: boolean;
    playing: boolean;
    board: Array<Array<IPlayer | null>>;
}

export default IGame;