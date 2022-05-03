import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { IPlayers, IGame, IPlayer } from '@types';

import userAtom from '@state/User';

import { defaultState } from '@utils/Constants';

function useGame() {
    const [game, setGame] = useState(defaultState);
    const [time, setTime] = useState(15);
    const user = useRecoilValue(userAtom);

    const createGame = (players: IPlayers) => {
        const p1: IPlayer = {
            ...defaultState.p1,
            player: players.p1,
        };

        const p2: IPlayer = {
            ...defaultState.p2,
            player: players.p2,
        };
        
        setGame({
            ...defaultState,
            p1: p1,
            p2: p2,
            currentPlayer: p1,
        });
    };

    const turn = async (col: number) => {
        const tempState = { ...game };

        await move(col, tempState);
        await checkWin(tempState);

        return tempState;
    }

    const move = (col: number, tempState: IGame): void => {
        const board = copyBoard(game.board);
        const row = board[col].indexOf(null);

        if (row === -1) throw new Error('Row is full :(');

        board[col][row] = game.currentPlayer?.token;

        tempState.board = board;
        tempState.move = { col: col, row: row };
    };

    const checkWin = (tempState: IGame) => {
        if (
            checkVertical(tempState) ||
            checkHorizontal(tempState) ||
            checkRightDiagonal(tempState) ||
            checkLeftDiagonal(tempState) ||
            checkDraw(tempState)
        ) {
            tempState.winner = tempState.currentPlayer.player.name;
            tempState.loser = tempState.currentPlayer.player.name === tempState.p1.player.name ? tempState.p2.player.name : tempState.p1.player.name;
            tempState.gameOver = true;
        } else {
            switchPlayers(tempState);
        }
    }

    const checkVertical = (tempState: IGame): boolean => {
        const { col, row } = tempState.move;
    
        if (row < 3) return false;
        
        else if (tempState.board[col][row-1] === tempState.currentPlayer.token &&
            tempState.board[col][row-2] === tempState.currentPlayer.token &&
            tempState.board[col][row-3] === tempState.currentPlayer.token
            ) {
                return true;
            }
        return false;
    }
    
    const checkHorizontal = (tempState: IGame): boolean => {
        const { row } = tempState.move;
    
        for (let i = 0; i < 4; i++) {
            if (tempState.board[i][row] === tempState.currentPlayer.token &&
                tempState.board[i+1][row] === tempState.currentPlayer.token &&
                tempState.board[i+2][row] === tempState.currentPlayer.token &&
                tempState.board[i+3][row] === tempState.currentPlayer.token
                ) {
                    return true;
                }
        }
        return false;
    }
    
    const checkRightDiagonal = (tempState: IGame): boolean => {
        for (let c = 0; c < 4; c++) {
            for (let r = 0; r < 4; r++) {
                if (tempState.board[c][r] === tempState.currentPlayer.token &&
                    tempState.board[c+1][r+1] === tempState.currentPlayer.token &&
                    tempState.board[c+2][r+2] === tempState.currentPlayer.token &&
                    tempState.board[c+3][r+3] === tempState.currentPlayer.token
                 ) {
                    return true;
                }
            }
        }
        return false;
    }
    
    const checkLeftDiagonal = (tempState: IGame): boolean => {
        for (let c = 3; c < 7; c++) {
            for (let r = 0; r < 4; r++) {
                if (tempState.board[c][r] === tempState.currentPlayer.token &&
                    tempState.board[c-1][r+1] === tempState.currentPlayer.token &&
                    tempState.board[c-2][r+2] === tempState.currentPlayer.token &&
                    tempState.board[c-3][r+3] === tempState.currentPlayer.token
                 ) {
                    return true;
                }
            }
        }
        return false;
    }

    const checkDraw = (tempState: IGame): boolean => {
        if (!tempState.board.flat().some(x => x === null)) {
            tempState.draw = true;
            return true;
        }
        return false;
    }

    const switchPlayers = (tempState: IGame) => {
        tempState.currentPlayer = tempState.currentPlayer.player.id === tempState.p1.player.id ? {...tempState.p2} : {...tempState.p1};
    };

    const checkTurn = () => {
        const myTurn = user.name === game.currentPlayer.player.name ? true : false;

        setGame({
            ...game,
            myTurn: myTurn,
        });
    }

    const copyBoard = (board: Array<Array<null | number>>) => {
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

    useEffect(() => {
        if (game.currentPlayer) {
            checkTurn();
        }
    }, [game.currentPlayer]);

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
        time,
        game,
        setGame,
        createGame,
        turn,
    }
}

export default useGame;