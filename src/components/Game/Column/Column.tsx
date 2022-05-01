import IColumn from './IColumn';
import { ColContainer } from './Column.styled';
import Cell from '@components/Game/Cell';

import { useGameSessionContext } from '@hooks/GameContextProvider';
import { useUnitContext } from '@hooks/UnitContextProvider';

export function Column(props: IColumn) {
    const { index, column } = props;
    const { gameSession } = useGameSessionContext();
    const { units } = useUnitContext();

    return (
        <ColContainer units={units} onClick={() => gameSession.move(index)}>
            {column.map((cell, i) => {
                return (<Cell key={i} value={cell} />)
            })}
        </ColContainer>
    )
}

export default Column;