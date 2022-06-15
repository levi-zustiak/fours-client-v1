import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import Board from "./entities/Board";
import Loading from "./components/Loading";
import { AssetContextProvider } from "./providers/AssetContextProvider";
import { useContextBridge } from "@react-three/drei";
import { SessionContext } from "@providers/SessionContextProvider";
import { RecoilRoot } from "recoil";

function Game() {
  const ContextBridge = useContextBridge(SessionContext);
  const fov = 64;

  return (
    <Canvas camera={{
      position: [0, 0, 32],
      zoom: fov,
      near: 0,
      far: fov
    }} flat={true} orthographic>
      <ContextBridge>
        <RecoilRoot>
        <Suspense fallback={<Loading />}>
          <AssetContextProvider>
            <Board />
          </AssetContextProvider>
        </Suspense>
        </RecoilRoot>
      </ContextBridge>
    </Canvas>
  );
}

export default Game;
