import { useEffect, useState } from 'react';
import { GameState, GameOptions, BoardValue, Coords } from '@types';

import { defaultState } from '@utils/Constants';

type MoveState = {
    board: Array<Array<BoardValue>>;
    move: Coords;
}

function useGame() {
    const [state, setState] = useState<GameState>(defaultState);
    const [playingAs, setPlayingAs] = useState<string>('');
    const [opponent, setOpponent] = useState<string>('');

    const start = (opts: GameOptions) => {
        setPlayingAs(opts.playingAs)
        setOpponent(opts.playingAs === 'p1' ? 'p2' : 'p1')

        setState({
            ...defaultState,
            playing: true,
        })
    };

    const getState = async (col: number): Promise<GameState> => {
        const board = copyBoard(state.board);
        const row = board[col].indexOf(null);

        board[col][row] = state.currentPlayer;
        const coords = { col: col, row: row };

        const moveState = {
            board: board,
            move: coords,
        };

        const newState: GameState = await checkWin(moveState);

        setState(newState);

        return newState;
    };

    const checkWin = async (moveState: MoveState) => {
        const { board } = moveState;
        if (
            checkVertical(moveState) ||
            checkHorizontal(moveState) ||
            checkRightDiagonal(moveState) ||
            checkLeftDiagonal(moveState) ||
            checkDraw(moveState)
        ) {
            const { currentPlayer } = state;
            const winner = currentPlayer;
            const loser = currentPlayer === 'p1' ? 'p2' : 'p1'; 
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

    const checkVertical = ({ board, move }: MoveState): boolean => {
        const { col, row } = move;

        const minRow = min(row);

        if (row < 3) return false;

        return checkArray(board[col].slice(minRow, row + 1));
    }
    
    const checkHorizontal = ({ board, move }: MoveState): boolean => {
        const { col, row } = move;
        const minCol = min(col);
        const maxCol = max(col, 6)+1;
    
        for (let i = minCol, j = minCol + 4; j <= maxCol; i++, j++) {
            if (checkArray(board.slice(i, j).map((col) => col[row]))) {
                return true
            }
        }
        return false;
    }
    
    const checkRightDiagonal = ({ board }: MoveState): boolean => {
        for (let c = 0; c <= 3; c++) {
            for (let r = 0; r < 4; r++) {
                const segment = [board[c][r], board[c+1][r+1], board[c+2][r+2], board[c+3][r+3]];

                if (checkArray(segment)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    const checkLeftDiagonal = ({ board }: MoveState): boolean => {
        for (let c = 3; c <= 6; c++) {
            for (let r = 0; r < 4; r++) {
                const segment = [board[c][r], board[c-1][r+1], board[c-2][r+2], board[c-3][r+3]];

                if (checkArray(segment)) {
                    return true;
                }
            }
        }
        return false;
    }

    const checkDraw = ({ board }: MoveState): boolean => {
        return !board.flat().some(x => x === null)
    }

    const switchPlayers = () => {
        return state.currentPlayer === 'p1' ? 'p2' : 'p1';
    };

    const copyBoard = (board: Array<Array<BoardValue>>) => {
        return board.map(column => [...column]);
    };

    const checkArray = (arr: Array<BoardValue>) => {
        return arr.every((value) => value === arr[0] && value !== null)
    }

    const isAvailable = (col: number): boolean => {
        return state.board[col].includes(null);
    }

    const getNextRow = (col: number): number => {
        return state.board[col].indexOf(null);
    }

    const min = (num: number) => Math.max(num - 3, 0);
    const max = (num: number, max: number) => Math.min(num + 3, max) + 1;

    const myTurn = (): boolean => {
        return playingAs === state.currentPlayer;
    }

    useEffect(() => {
        console.log(state);
    }, [state]);

    return {
        state,
        setState,
        getState,
        start,
        myTurn,
        isAvailable,
        getNextRow,
        playingAs,
        opponent
    }
}

export default useGame;