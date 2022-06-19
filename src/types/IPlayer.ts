import IUser from './IUser';

interface IPlayer {
    id: number;
    token: string;
    color: string;
    user?: IUser;
}

export default IPlayer;