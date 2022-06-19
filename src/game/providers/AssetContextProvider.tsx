import { createContext, ReactNode, useContext, useMemo } from "react";
import { TextureLoader, Texture } from "three";
import { useLoader, useThree } from "@react-three/fiber";

import BoardSprite from "../assets/Board.png";
import RedTokenSprite from "../assets/Red_token.png";
import YellowTokenSprite from "../assets/Yellow_token.png";

type Args = [width: number, height: number];

interface BoardAsset {
  texture: Texture,
  args: Args
}

interface ColumnAsset {
  args: Args,
  xOffset: number
}

interface TokenAsset {
  [key: string]: any;
  redTexture: Texture,
  yellowTexture: Texture,
  args: Args,
  xOffset: number,
  yOffset: number,
  starting: number
}

interface AssetContext {
  boardAsset: BoardAsset;
  columnAsset: ColumnAsset;
  tokenAsset: TokenAsset;
}

const AssetContext = createContext<AssetContext | undefined>(undefined);

function AssetContextProvider({children}: {children: ReactNode}) {
  const { viewport } = useThree();

  const heightFactor = 6.428571428571429; // boardHeight: 720 / cellHeight: 112
  const tokenFactor = 10.909090909090908; // boardWidth: 960 / tokenWidth: 88

  const tokenSize = viewport.width / tokenFactor;

  const xOffset = viewport.width / 7.5; // column width
  const yOffset = viewport.height / heightFactor;

  const [
    boardTexture,
    redTokenTexture,
    yellowTokenTexture
  ] = useLoader(TextureLoader, [
    BoardSprite,
    RedTokenSprite,
    YellowTokenSprite
  ]);

  const boardAsset = {
    texture: boardTexture,
    args: [viewport.width, viewport.height] as Args
  };

  const columnAsset = {
    args: [viewport.width / 7.5, viewport.height] as Args,
    xOffset: xOffset
  };

  const tokenAsset = {
    redTexture: redTokenTexture,
    yellowTexture: yellowTokenTexture,
    args: [tokenSize, tokenSize] as Args,
    xOffset: xOffset,
    yOffset: yOffset,
    starting: viewport.height / 2
  }

  const assets = useMemo(() => ({
    boardAsset,
    columnAsset,
    tokenAsset
  }), [boardAsset, columnAsset, tokenAsset])

  return (
    <AssetContext.Provider value={assets}>
      {children}
    </AssetContext.Provider>
  )
}

function useAssetContext() {
  const context = useContext(AssetContext);

  if (context === undefined) {
    throw new Error("AssetContext was used outside of it's provider");
  }

  return context;
}

export {
  AssetContext,
  AssetContextProvider,
  useAssetContext,
}
