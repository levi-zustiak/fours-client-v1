import ICell from './ICell';
import { CellContainer, Token, TokenStyle } from './Cell.styled';
import { useUnitContext } from '@hooks/UnitContextProvider';

export function Cell(props: ICell) {
    const { value } = props;
    const { units } = useUnitContext();

    return (
        <CellContainer units={units}>
            {value && <Token value={value} units={units}>
                <TokenStyle />
            </Token>}
        </CellContainer>
    )
}

export default Cell;