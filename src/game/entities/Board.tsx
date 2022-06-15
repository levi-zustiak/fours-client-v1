import { useRecoilValue } from "recoil";

import { useAssetContext } from "../providers/AssetContextProvider";

import Column from "./Column";
import Placeholder from "./Placeholder";
import GameObject from "../components/GameObject";

import gameAtom from "../state/gameAtom";

import { useSessionContext } from "@providers/SessionContextProvider";

function Board() {
  const { game } = useSessionContext();
  const { board } = useRecoilValue(gameAtom);
  const { boardAsset } = useAssetContext();

  console.log(game);

  return (
    <GameObject
      position={[0, 0, 2]}
      geometry={boardAsset.args}
      texture={boardAsset.texture}
    >
      {board.map((column, i) => (
        <Column key={i} index={i} column={column} />
      ))}
      <Placeholder />
    </GameObject>
  );
}

export default Board;
