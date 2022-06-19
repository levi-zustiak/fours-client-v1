import { useSetRecoilState } from "recoil";

import placeholderAtom from "@state/Placeholder";
import { useAssetContext } from "../providers/AssetContextProvider";

import GameObject from "../components/GameObject";
import Token from "./Token";
import { useGameContext } from "@providers/GameContextProvider";
import { BoardValue } from "@types";

interface ColumnProps {
  index: number;
  column: Array<BoardValue>;
}

function Column(props: ColumnProps) {
  const { index, column } = props;
  const { columnAsset } = useAssetContext();
  const { game, move } = useGameContext();

  const setPlaceholder = useSetRecoilState(placeholderAtom);

  const x = columnAsset.xOffset * (index - 3);

  const handleClick = () => {
    move(index);
  };

  const handleHover = () => {
    if (game.isAvailable(index)) {
      setPlaceholder({
        col: index,
        row: game.getNextRow(index)
      });
    }
  };

  const eventHandlers = {
    onClick: handleClick,
    onPointerOver: handleHover
  };

  return (
    <GameObject
      position={[x, 0, -1]}
      eventHandlers={eventHandlers}
      geometry={columnAsset.args}
    >
      {column.map(
        (value, index) =>
          value && <Token key={index} index={index} value={value} />
      )}
    </GameObject>
  );
}

export default Column;
