import ICell from './ICell';
import { CellContainer, Token } from './Cell.styled';
import { useUnitContext } from '@providers/UnitContextProvider';

export function Cell(props: ICell) {
    const { token } = props;
    const { units } = useUnitContext();

    return (
        <CellContainer units={units}>
            {token && <Token token={token} units={units}>
            </Token>}
        </CellContainer>
    )
}

export default Cell;