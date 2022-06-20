import { useAssetContext } from "../providers/AssetContextProvider";

import Column from "./Column";
import Placeholder from "./Placeholder";
import GameObject from "../components/GameObject";

import { useGameContext } from "@providers/GameContextProvider";

function Board() {
  const { boardAsset } = useAssetContext();
  const { game } = useGameContext();

  return (
    <GameObject
      position={[0, 0, 2]}
      geometry={boardAsset.args}
      texture={boardAsset.texture}
    >
      {game.state.board.map((column, i) => (
        <Column key={i} index={i} column={column} />
      ))}
      <Placeholder />
    </GameObject>
  );
}

export default Board;
