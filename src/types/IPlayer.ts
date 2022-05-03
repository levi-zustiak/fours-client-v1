import { IUser } from '@types';

interface IPlayer {
    player: IUser;
    token: number;
    primary: string; 
    secondary: string;
    border: string;
}

export default IPlayer;