import { Context } from "../scene";
import Event from "rx.mini";
import React, { FC, Fragment, useContext, useEffect } from "react";
import {
  MeshBuilder,
  Vector3,
  StandardMaterial,
  VideoTexture,
  Mesh,
  Texture
} from "@babylonjs/core";

export type OnDesktopMountProps = {
  mouseMoveEvent: Event<{ x: number; y: number }>;
};

const Desktop: FC<{
  stream: MediaStream;
  onMount?: (props: OnDesktopMountProps) => void;
  ratio?: { vertical: number; horizontal: number };
}> = ({ stream, ratio }) => {
  const context = useContext(Context);

  useEffect(() => {
    (async () => {
      if (context) {
        const mouseMoveEvent = new Event<{ x: number; y: number }>();

        const { scene } = context;
        const vertical = ratio ? ratio.vertical : 2;
        const horizontal = ratio ? ratio.horizontal : 1.7 * 2;

        console.log({ stream });

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
          impact.scaling = new Vector3(0.02, 0.02, 0.04);
          mat.diffuseTexture = new Texture("textures/impact.png", scene as any);
          mat.diffuseTexture!.hasAlpha = true;
          impact.position = new Vector3(0, 0, -0.01);

          scene.onPointerDown = function(evt, pickResult) {
            if (pickResult.hit) {
              const { x, y } = pickResult!.pickedPoint!;
              if (-1.7 < x && x < 1.7) impact.position.x = x;
              if (0 < y && y < 2) impact.position.y = y;
              const y1 = y / vertical;
              mouseMoveEvent.execute({ x: (x + 1.7) / horizontal, y: 1 - y1 });
            }
          };
        }
      }
    })();
  }, [context]);

  return <Fragment />;
};

export default Desktop;
