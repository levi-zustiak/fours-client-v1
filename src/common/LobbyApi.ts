import { User } from '@types';
import api from './api';

type ConnectDto = {
    type: string;
    user: any;
    gameId: any;
}

type JoinedDto = {
    user: User;
}

export class LobbyApi {

    constructor() {}

    public async connect(data: ConnectDto) {
        const q = await api.post('/connect', data);

        return q;
    }
}

export default LobbyApi;