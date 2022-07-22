import { GameState, Player } from '@types';

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

const p1: Player = {
    id: 1,
    position: 'p1',
    backgroundColor: 'var(--red)',
    color: 'var(--white)'
}

const p2: Player = {
    id: 2,
    position: 'p2',
    backgroundColor: 'var(--yellow)',
    color: 'var(--black)',
}