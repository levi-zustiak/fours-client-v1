import { IPlayer, ICoords } from '@types';

interface IGame {
    p1: IPlayer;
    p2: IPlayer;
    currentPlayer: IPlayer;
    winner: string;
    loser: string;
    draw: boolean;
    gameOver: boolean;
    message: string;
    board: Array<Array<null | number>>;
    move: ICoords;
    myTurn: boolean;
}

export default IGame;