import { SceneContext } from "../scene";
import Event from "rx.mini";
import React, { FC, Fragment, useContext } from "react";
import {
  MeshBuilder,
  Vector3,
  StandardMaterial,
  VideoTexture,
  Mesh,
  Texture
} from "@babylonjs/core";
import useActive from "../../../hooks/useActive";

export type OnDesktopMountProps = {
  mouseMoveEvent: Event<{ x: number; y: number }>;
};

const Desktop: FC<{
  stream: MediaStream;
  onMount?: (props: OnDesktopMountProps) => void;
  ratio?: { vertical: number; horizontal: number };
}> = ({ stream, ratio, onMount }) => {
  const context = useContext(SceneContext);

  useActive(async context => {
    const mouseMoveEvent = new Event<{ x: number; y: number }>();

    const { scene } = context;
    const vertical = ratio ? ratio.vertical : 2;
    const horizontal = ratio ? ratio.horizontal : 1.7 * 2;

    const desktop = MeshBuilder.CreatePlane(
      "desktop",
      { width: horizontal, height: vertical },
      scene as any
    );
    desktop.position = new Vector3(0, vertical / 2, 0);
    desktop.rotation = new Vector3(0, 0, 0);

    const mat = new StandardMaterial("mat", scene as any);

    const videoTexture = await VideoTexture.CreateFromStreamAsync(
      scene as any,
      stream
    );

    videoTexture.uScale = 1;
    videoTexture.vScale = -1;

    mat.diffuseTexture = videoTexture;
    desktop.material = mat;

    scene.onPointerUp = () => {
      videoTexture.video.play();
    };

    {
      const impact = Mesh.CreatePlane("impact", 1, scene as any);
      const mat = (impact.material = new StandardMaterial(
        "impactMat",
        scene as any
      ));
      impact.scaling = new Vector3(0.03, 0.03, 0.03);
      mat.diffuseTexture = new Texture("textures/impact.png", scene as any);
      mat.diffuseTexture!.hasAlpha = true;
      impact.position = new Vector3(0, 0, -0.01);

      scene.onPointerDown = (_, pickResult) => {
        if (pickResult.hit && pickResult.pickedMesh!.name === "desktop") {
          const { x, y, z } = pickResult.pickedPoint!;
          impact.position.x = x;
          impact.position.y = y;
          impact.position.z = z;
          const y1 = y / vertical;
          mouseMoveEvent.execute({ x: (x + 1.7) / horizontal, y: 1 - y1 });
        }
      };
    }

    if (onMount) onMount({ mouseMoveEvent });
  }, context);

  return <Fragment />;
};

export default Desktop;
