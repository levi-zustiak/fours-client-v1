import { memo, useMemo, ReactNode } from "react";
import { a, SpringValue } from "@react-spring/three";
import { Texture } from 'three';

type Position = [x: number, y: number, z: number];

interface GameObjectProps {
  position: SpringValue<Array<number>> | Position;
  geometry: [width: number, height: number];
  texture?: Texture;
  children?: ReactNode;
  opacity?: SpringValue<number>;
  animate?: boolean;
  eventHandlers?: {
    onClick: () => void,
    onPointerOver: () => void
  },
}

const GameObject = (props: GameObjectProps) => {
  const {
    animate,
    position,
    geometry,
    opacity,
    texture,
    eventHandlers,
    children
  } = props;

  const materialProps = useMemo(
    () => ({
      map: texture,
      transparent: true
    }),
    [texture]
  );

  return animate ? (
    <a.mesh position={position as Position} {...eventHandlers}>
      <planeBufferGeometry args={geometry} />
      {/* @ts-ignore */}
      <a.meshBasicMaterial attach="material" opacity={opacity} {...materialProps} />
    </a.mesh>
  ) : (
    <mesh position={position as Position} {...eventHandlers}>
      <planeBufferGeometry args={geometry} />
      <meshBasicMaterial attach="material" {...materialProps} />
      {children}
    </mesh>
  );
};

export default memo(GameObject);