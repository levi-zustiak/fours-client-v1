import { useTransition, SpringValue } from "@react-spring/three";
import { Player } from "@types";

import GameObject from "../components/GameObject";

import { useAssetContext } from "../providers/AssetContextProvider";

interface TokenProps {
  index: number;
  value: Player;
}

function Token(props: TokenProps) {
  const { index, value } = props;
  const { tokenAsset } = useAssetContext();

  const texture = tokenAsset[value.token];

  const final = tokenAsset.yOffset * (index - 2.5);

  const transition = useTransition(value, {
    from: { position: [0, tokenAsset.starting, 0] },
    enter: { position: [0, final, 0] },
    config: {
      mass: 1.6,
      friction: 10,
      tension: 150,
      bounce: 0.1
    },
    key: value.id
  });

  return transition(({ position }: { position: SpringValue<Array<number>> }) => (
    <GameObject
      position={position}
      geometry={tokenAsset.args}
      texture={texture}
      animate
    />
  ));
}

export default Token;
