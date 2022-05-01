import IGameId from './IGameId';

import { Id } from './GameId.styled';

export default function GameId(props: IGameId) {
    const { id } = props;

    return (
        <Id>Game Id: {id}</Id>
    );
}