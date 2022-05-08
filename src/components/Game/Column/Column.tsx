import IColumn from './IColumn';
import { ColContainer } from './Column.styled';
import Cell from '@components/Game/Cell';

import { useSessionContext } from '@providers/SessionContextProvider';
import { useUnitContext } from '@providers/UnitContextProvider';

export function Column(props: IColumn) {
    const { index, column } = props;
    const { move } = useSessionContext();
    const { units } = useUnitContext();

    return (
        <ColContainer units={units} onClick={() => move(index)}>
            {column.map((cell, i) => {
                return (<Cell key={i} token={cell} />)
            })}
        </ColContainer>
    )
}

export default Column;