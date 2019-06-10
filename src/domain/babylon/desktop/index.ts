import { SceneEventArgs } from "../../../components/scene";
import * as BABYLON from "babylonjs";
import { Vector3 } from "babylonjs";
import Event from "rx.mini";

export default async function createDesktop(
  e: SceneEventArgs,
  stream: MediaStream,
  ratio?: { vertical: number; horizontal: number }
) {
  const { canvas, scene, engine } = e;

  const vertical = ratio ? ratio.vertical : 2;
  const horizontal = ratio ? ratio.horizontal : 1.7 * 2;

  console.log({ stream });

  const desktop = BABYLON.MeshBuilder.CreatePlane(
    "desktop",
    { width: horizontal, height: vertical },
    scene
  );
  desktop.position = new BABYLON.Vector3(0, vertical / 2, 0);
  desktop.rotation = new BABYLON.Vector3(0, 0, 0);

  const mat = new BABYLON.StandardMaterial("mat", scene);

  const videoTexture = await BABYLON.VideoTexture.CreateFromStreamAsync(
    scene,
    stream
  );

  videoTexture.uScale = 1;
  videoTexture.vScale = -1;

  mat.diffuseTexture = videoTexture;
  desktop.material = mat;

  scene.onPointerUp = () => {
    videoTexture.video.play();
  };

  const event = new Event<{ x: number; y: number }>();
  {
    const impact = BABYLON.Mesh.CreatePlane("impact", 1, scene);
    const mat = (impact.material = new BABYLON.StandardMaterial(
      "impactMat",
      scene
    ));
    impact.scaling = new Vector3(0.02, 0.02, 0.04);
    mat.diffuseTexture = new BABYLON.Texture("textures/impact.png", scene);
    mat.diffuseTexture.hasAlpha = true;
    impact.position = new BABYLON.Vector3(0, 0, -0.01);

    scene.onPointerDown = function(evt, pickResult) {
      if (pickResult.hit) {
        const { x, y } = pickResult!.pickedPoint!;
        if (-1.7 < x && x < 1.7) impact.position.x = x;
        if (0 < y && y < 2) impact.position.y = y;
        const y1 = y / vertical;
        event.execute({ x: (x + 1.7) / horizontal, y: 1 - y1 });
      }
    };
  }

  return event;
}
