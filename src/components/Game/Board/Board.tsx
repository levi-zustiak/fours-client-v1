import IBoard from './IBoard';

import { BoardContainer } from './Board.styled';

import Column from '@components/Game/Column';
import { useUnitContext } from '@providers/UnitContextProvider';

export function Board(props: IBoard) {
    const { board } = props;
    const { units } = useUnitContext();

    return (
        <BoardContainer units={units}>
            {board.map((column, i) => (
                <Column key={i} index={i} column={column} />
            ))}
        </BoardContainer>
    )
}

export default Board;