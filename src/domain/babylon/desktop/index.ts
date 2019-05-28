import { SceneEventArgs } from "../../../components/scene";
import * as BABYLON from "babylonjs";

export default async function createDesktop(
  e: SceneEventArgs,
  stream: MediaStream
) {
  const { canvas, scene, engine } = e;

  console.log({ stream });

  const desktop = BABYLON.MeshBuilder.CreatePlane(
    "desktop",
    { width: 2 * 1.7, height: 2 },
    scene
  );
  desktop.position = new BABYLON.Vector3(0, 1, 0);
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
}
