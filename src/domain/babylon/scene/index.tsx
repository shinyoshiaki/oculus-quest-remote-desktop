import { Engine, Scene, EngineOptions } from "@babylonjs/core";
import React, { FC, useEffect, useRef, createContext, useState } from "react";

export const SceneContext = createContext<SceneEventArgs | undefined>(
  undefined
);

export type SceneEventArgs = {
  engine: Engine;
  scene: Scene;
  canvas: HTMLCanvasElement;
};

export type Props = {
  engineOptions?: EngineOptions;
  adaptToDeviceRatio?: boolean;
  onSceneMount?: (args: SceneEventArgs) => void;
  width?: number;
  height?: number;
};

const SceneCreate: FC<Props> = ({
  width,
  height,
  engineOptions,
  adaptToDeviceRatio,
  onSceneMount,
  children
}) => {
  const [context, setcontext] = useState<SceneEventArgs | undefined>();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const engine = new Engine(
        canvas,
        true,
        engineOptions,
        adaptToDeviceRatio
      );

      const scene = new Scene(engine);

      if (onSceneMount) {
        const ready = {
          scene,
          engine,
          canvas
        };
        onSceneMount(ready);
        setcontext(ready);
        engine.runRenderLoop(() => {
          scene.render();
        });
      }
    }
  }, [canvasRef]);

  return (
    <div>
      <SceneContext.Provider value={context}>
        <canvas width={width} height={height} ref={canvasRef} />
        {context && children}
      </SceneContext.Provider>
    </div>
  );
};

export default SceneCreate;
