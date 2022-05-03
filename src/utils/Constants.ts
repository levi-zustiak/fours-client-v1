import { IGame } from '@types';

export const config: RTCConfiguration = {
    iceServers: [
        { 
            urls: 'stun:stun.l.google.com:19302' 
        },
        {
            urls: "turn:openrelay.metered.ca:80",
            username: "openrelayproject",
            credential: "openrelayproject",
        },
        // {
        //     urls: "turn:openrelay.metered.ca:443",
        //     username: "openrelayproject",
        //     credential: "openrelayproject",
        // },
        // {
        //     urls: "turn:openrelay.metered.ca:443?transport=tcp",
        //     username: "openrelayproject",
        //     credential: "openrelayproject",
        // }
    ]
};

export const defaultState: IGame = {
    p1: {
        player: {
            id: '',
            name: '',
        },
        token: 1,
        primary: 'var(--red)',
        secondary: 'white',
        border: 'var(--dark-red)',
    },
    p2: {
        player: {
            id: '',
            name: '',
        },
        token: 2,
        primary: 'var(--yellow)',
        secondary: 'black',
        border: 'var(--dark-yellow)',
    },
    currentPlayer: {
        player: {
            id: '',
            name: '',
        },
        token: 1,
        primary: 'var(--red)',
        secondary: 'white',
        border: 'var(--dark-red)'
    },
    winner: '',
    loser: '',
    draw: false,
    gameOver: false,
    message: '',
    board: [
        [null, null, null, null, null, null],
        [2, null, null, null, null, null],
        [null, null, null, null, null, null],
        [1, 2, null, null, null, null],
        [1, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null]
    ],
    move: { col: -1, row: -1},
    myTurn: false,
};