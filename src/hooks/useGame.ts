import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { IPlayers, IGame, IToken, ICoords, IPlayer } from '@types';

import userAtom from '@state/User';

import { defaultState } from '@utils/Constants';

interface IMoveState {
    board: Array<Array<IPlayer | null>>;
    move: ICoords;
}

interface IMessage {
    type: string;
    data: any;
}

export type GameOptions = {
    players: IPlayers;
}

function useGame() {
    const [state, setState] = useState<IGame>(defaultState);
    const user = useRecoilValue(userAtom);

    const start = (opts: GameOptions) => {
        const p1 = {
            ...state.p1,
            user: opts.players.p1
        }

        const p2 = {
            ...state.p2,
            user: opts.players.p2
        }

        setState({
            ...defaultState,
            p1: p1,
            p2: p2,
            currentPlayer: p1,
            playing: true,
        });
    };

    const isAvailable = (col: number): boolean => {
        return state.board[col].includes(null);
    }

    const getNextRow = (col: number): number => {
        return state.board[col].indexOf(null);
    }

    const getState = async (col: number): Promise<IGame> => {
        const board = copyBoard(state.board);
        const row = board[col].indexOf(null);

        board[col][row] = state.currentPlayer;
        const coords = { col: col, row: row };

        const moveState = {
            board: board,
            move: coords,
        };

        const newState: IGame = await checkWin(moveState);

        setState(newState);

        return newState;
    };

    const checkWin = async (moveState: IMoveState) => {
        const { board } = moveState;
        if (
            checkVertical(moveState) ||
            checkHorizontal(moveState) ||
            checkRightDiagonal(moveState) ||
            checkLeftDiagonal(moveState) ||
            checkDraw(moveState)
        ) {
            const { p1, p2, currentPlayer } = state;
            const winner = currentPlayer.user?.id;
            const loser = currentPlayer.id === 1 ? p2.user?.id : p1.user?.id
            return {
                ...state,
                board: board,
                winner: winner,
                loser: loser,
                playing: false,
            }
        } else {
            const currentPlayer = await switchPlayers();
            return {
                ...state,
                board: board,
                currentPlayer: currentPlayer,
            }
        }
    }

    const checkVertical = ({ board, move }: IMoveState): boolean => {
        const { currentPlayer } = state;
        const { col, row } = move;
    
        if (row < 3) return false;
        
        else if (board[col][row-1]?.id === currentPlayer.id &&
            board[col][row-2]?.id === currentPlayer.id &&
            board[col][row-3]?.id === currentPlayer.id
            ) {
                return true;
            }
        return false;
    }
    
    const checkHorizontal = ({ board, move }: IMoveState): boolean => {
        const { currentPlayer } = state;
        const { row } = move;
    
        for (let i = 0; i < 4; i++) {
            if (board[i][row]?.id === currentPlayer.id &&
                board[i+1][row]?.id === currentPlayer.id &&
                board[i+2][row]?.id === currentPlayer.id &&
                board[i+3][row]?.id === currentPlayer.id
                ) {
                    return true;
                }
        }
        return false;
    }
    
    const checkRightDiagonal = ({ board }: IMoveState): boolean => {
        const { currentPlayer } = state;

        for (let c = 0; c < 4; c++) {
            for (let r = 0; r < 4; r++) {
                if (board[c][r]?.id === currentPlayer.id &&
                    board[c+1][r+1]?.id === currentPlayer.id &&
                    board[c+2][r+2]?.id === currentPlayer.id &&
                    board[c+3][r+3]?.id === currentPlayer.id
                 ) {
                    return true;
                }
            }
        }
        return false;
    }
    
    const checkLeftDiagonal = ({ board }: IMoveState): boolean => {
        const { currentPlayer } = state;

        for (let c = 3; c < 7; c++) {
            for (let r = 0; r < 4; r++) {
                if (board[c][r]?.id === currentPlayer.id &&
                    board[c-1][r+1]?.id === currentPlayer.id &&
                    board[c-2][r+2]?.id === currentPlayer.id &&
                    board[c-3][r+3]?.id === currentPlayer.id
                 ) {
                    return true;
                }
            }
        }
        return false;
    }

    const checkDraw = ({ board }: IMoveState): boolean => {
        if (!board.flat().some(x => x === null)) {
            return true;
        }
        return false;
    }

    const switchPlayers = () => {
        const { p1, p2, currentPlayer } = state;

        return currentPlayer.id === 1 ? {...p2} : {...p1};
    };

    const myTurn = (): boolean => {
        return user.id === state.currentPlayer.user?.id;
    }

    const copyBoard = (board: Array<Array<IPlayer | null>>) => {
        return board.map(column => [...column]);
    };

    return {
        state,
        setState,
        getState,
        start,
        myTurn,
        isAvailable,
        getNextRow
    }
}

export default useGame;