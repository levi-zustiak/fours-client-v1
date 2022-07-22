import { User } from './auth.types';

export type Coords = {
    col: number;
    row: number;
}

export type Players = {
    p1?: User;
    p2?: User;
}

export type Player = {
    id: number;
    position: string;
    backgroundColor: string;
    color: string;
    user?: User;
}

export type BoardValue = null | string;

export type Board = Array<Array<BoardValue>>;

export type GameState = {
    // [key: string]: any;
    // p1: Player;
    // p2: Player;
    currentPlayer: string;
    winner?: string;
    loser?: string;
    draw: boolean;
    gameOver: boolean;
    board: Board;
}

export type GameOptions = {
    // players: Players;
    playingAs: string;
    //Other game options
}