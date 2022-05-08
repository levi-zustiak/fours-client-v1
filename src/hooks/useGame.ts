import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { IPlayers, IGame, IToken, ICoords } from '@types';

import userAtom from '@state/User';

import { defaultState } from '@utils/Constants';

interface IMoveState {
    board: Array<Array<IToken | null>>;
    move: ICoords;
}

function useGame() {
    const [state, setState] = useState<IGame>(defaultState);
    const [time, setTime] = useState<number>(15);
    const user = useRecoilValue(userAtom);

    const init = (players: IPlayers) => {
        console.log('gameInit', players);
        const p1 = {
            ...state.p1,
            user: players.p1
        }

        const p2 = {
            ...state.p2,
            user: players.p2
        }

        console.log(p1, p2);

        setState({
            ...defaultState,
            p1: p1,
            p2: p2,
            currentPlayer: p1,
            playing: true,
        });
    };

    const turn = async (col: number) => {
        console.log('turn');
        const moveState: IMoveState = await move(col);
        const newState = await checkWin(moveState);

        console.log('turn', newState, state);

        return {
            ...state,
            ...newState,
        };
    }

    const isValidMove = (col: number) => {
        console.log('isValid');
        return state.board[col].includes(null);
    }

    const move = (col: number): IMoveState => {
        console.log(move);
        const board = copyBoard(state.board);
        const row = board[col].indexOf(null);

        board[col][row] = state.currentPlayer.token;
        const coords = { col: col, row: row };

        return {
            board: board,
            move: coords,
        };
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
                board: board,
                winner: winner,
                loser: loser,
                playing: false,
            }
        } else {
            const currentPlayer = await switchPlayers();
            return {
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

        console.log('switch', p1, p2)

        return currentPlayer.id === 1 ? {...p2} : {...p1};
    };

    const myTurn = (): boolean => {
        return user.id === state.currentPlayer.user?.id;
    }

    const copyBoard = (board: Array<Array<IToken | null>>) => {
        return [
            [...board[0]],
            [...board[1]],
            [...board[2]],
            [...board[3]],
            [...board[4]],
            [...board[5]],
            [...board[6]]
        ];
    };

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (time > 0) {
    //             setTime(time => --time);
    //         } else {
    //             setTime(15);
    //         }
    //     }, 1000);

    //     return () => clearInterval(interval)
    // }, [time]);

    return {
        state,
        setState,
        init,
        turn,
        myTurn,
        isValidMove,
        time
    }
}

export default useGame;