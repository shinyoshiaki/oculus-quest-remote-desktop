import { SceneEventArgs } from "../../../components/scene";
import { EnvironmentHelper, MeshBuilder } from "babylonjs";
import Event from "rx.mini";

export default function createVR(
  e: SceneEventArgs,
  environment: EnvironmentHelper
) {
  const { canvas, scene, engine } = e;

  const event = new Event();

  const vrHelper = scene.createDefaultVRExperience({
    createDeviceOrientationCamera: false
  });
  vrHelper.enableTeleportation({ floorMeshes: [environment.ground!] });

  vrHelper.onControllerMeshLoaded.add(webVRController => {
    webVRController.onSecondaryButtonStateChangedObservable.add(
      (data, state) => {
        if (webVRController.hand === "right") {
          if (data.pressed) {
            event.execute();
          }
        }
      }
    );
  });

  return event;
}
