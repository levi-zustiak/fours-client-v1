import { useCallback, useEffect } from "react";
import { useSpring } from "@react-spring/three";

import { useRecoilState, useRecoilValue } from "recoil";
import { useAssetContext } from "../providers/AssetContextProvider";
import useHelpers from "../hooks/useHelpers";
import gameAtom from "../state/gameAtom";
import placeholderAtom from "../state/placeholderAtom";

import GameObject from "../components/GameObject";

function Placeholder() {
  const { tokenAsset } = useAssetContext();
  const { getNextRow, isAvailable } = useHelpers();
  const { board, turn } = useRecoilValue(gameAtom);
  const [{ col, row }, setPlaceholder] = useRecoilState(placeholderAtom);

  const texture = turn ? tokenAsset.redTexture : tokenAsset.yellowTexture;

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
    if (isAvailable(col)) {
      setPlaceholder({
        col: col,
        row: getNextRow(col)
      });
    } else if (isAvailable(3)) {
      setPlaceholder({
        col: 3,
        row: getNextRow(3)
      });
    } else {
      let i, j;

      for (i = 4, j = 2; i < 7; i++, j--) {
        if (isAvailable(j)) {
          setPlaceholder({
            col: j,
            row: getNextRow(j)
          });
          break;
        } else if (isAvailable(i)) {
          setPlaceholder({
            col: i,
            row: getNextRow(i)
          });
          break;
        }
      }
    }
  };

  useEffect(() => {
    getNextPosition();
  }, [board]);

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
