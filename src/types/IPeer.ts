import IUser from './IUser';

interface IPeer {
    socketId: string;
    user: IUser;
}

export default IPeer;