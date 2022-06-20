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
    color: string;
    user?: User;
}

export type BoardValue = null | Player;

export type GameState = {
    [key: string]: any;
    p1: Player;
    p2: Player;
    currentPlayer: Player;
    winner?: string;
    loser?: string;
    draw: boolean;
    playing: boolean;
    board: Array<Array<Player | null>>;
}

export type GameOptions = {
    players: Players;
    //Other game options
}