import { IGame, IPlayer } from '@types';

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

const p1: IPlayer = {
    id: 1,
    token: 'redTexture',
    color: '#FF5964',
}

const p2: IPlayer = {
    id: 2,
    token: 'yellowTexture',
    color: '#FBEC8A',
}

export const defaultState: IGame = {
    p1: p1,
    p2: p2,
    currentPlayer: p1,
    winner: '',
    loser: '',
    draw: false,
    playing: false,
    board: [
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null]
    ]
};