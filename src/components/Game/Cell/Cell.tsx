import ICell from './ICell';
import { CellContainer, Token } from './Cell.styled';
import { useUnitContext } from '@hooks/UnitContextProvider';
import { useGameSessionContext } from '@hooks/GameContextProvider';

export function Cell(props: ICell) {
    const { value } = props;
    const { units } = useUnitContext();
    const { gameSession } = useGameSessionContext();

    const token = value === 1 ? gameSession.game.p1 : gameSession.game.p2;

    return (
        <CellContainer units={units}>
            {value && <Token token={token} units={units}>
            </Token>}
        </CellContainer>
    )
}

export default Cell;