import { useCallback, useEffect } from "react";
import { useSpring } from "@react-spring/three";

import { useRecoilState } from "recoil";
import { useAssetContext } from "../providers/AssetContextProvider";
import placeholderAtom from "@state/Placeholder";

import GameObject from "../components/GameObject";
import { useGameContext } from "@providers/GameContextProvider";

function Placeholder() {
  const { tokenAsset } = useAssetContext();
  const { game } = useGameContext();
  const [{ col, row }, setPlaceholder] = useRecoilState(placeholderAtom);

  const texture = tokenAsset[game.state.currentPlayer.token];

  const x = tokenAsset.xOffset * (col - 3);
  const y = tokenAsset.yOffset * (row - 2.5);

  const { opacity } = useSpring({
    loop: { reverse: true },
    to: useCallback(async (next: any) => {
      await next({ opacity: 0.75 });
      await next({ opacity: 0 });
    }, []),
    from: { opacity: 0 },
    config: {
      tension: 180,
      friction: 28,
      precision: 0.01
    }
  });

  const getNextPosition = () => {
    if (game.isAvailable(col)) {
      setPlaceholder({
        col: col,
        row: game.getNextRow(col)
      });
    } else if (game.isAvailable(3)) {
      setPlaceholder({
        col: 3,
        row: game.getNextRow(3)
      });
    } else {
      let i, j;

      for (i = 4, j = 2; i < 7; i++, j--) {
        if (game.isAvailable(j)) {
          setPlaceholder({
            col: j,
            row: game.getNextRow(j)
          });
          break;
        } else if (game.isAvailable(i)) {
          setPlaceholder({
            col: i,
            row: game.getNextRow(i)
          });
          break;
        }
      }
    }
  };

  useEffect(() => {
    getNextPosition();
  }, [game.state]);

  return (
    <GameObject
      position={[x, y, -1]}
      geometry={tokenAsset.args}
      texture={texture}
      opacity={opacity}
      animate
    />
  );
}

export default Placeholder;
