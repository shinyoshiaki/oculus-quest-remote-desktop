import React, {
  FC,
  useContext,
  useEffect,
  useState,
  createContext
} from "react";
import { SceneContext } from "../scene";
import { Color3 } from "@babylonjs/core";
import Event from "rx.mini";
import { ControllerAction, VrPosition } from "./model";

export type OnMountProps = {
  cotrollerActionEvent: Event<ControllerAction>;
  vrPositionEvent: Event<VrPosition>;
};

export const VRContext = createContext<OnMountProps | undefined>(undefined);

const VR: FC<{
  onMount?: (props: OnMountProps) => void;
}> = ({ onMount, children }) => {
  const context = useContext(SceneContext);

  const [vrcontext, setvrcontext] = useState<OnMountProps | undefined>();

  useEffect(() => {
    if (context) {
      const cotrollerActionEvent = new Event<ControllerAction>();
      const vrPositionEvent = new Event<VrPosition>();

      const { scene } = context;

      const environment = scene.createDefaultEnvironment({
        groundYBias: 1
      })!;
      environment!.setMainColor(Color3.FromHexString("#74b9ff"));

      const vrHelper = scene.createDefaultVRExperience({
        createDeviceOrientationCamera: false
      });
      vrHelper.enableTeleportation({ floorMeshes: [environment.ground!] });

      vrHelper.onControllerMeshLoaded.add(webVRController => {
        webVRController.onSecondaryButtonStateChangedObservable.add(
          (data, _) => {
            const hand = webVRController.hand;
            if (hand === "right" || hand === "left") {
              if (data.pressed) {
                if (cotrollerActionEvent)
                  cotrollerActionEvent.execute({ hand });
              }
            }
          }
        );
      });
      scene.onBeforeRenderObservable.add(() => {
        const pos = vrHelper.webVRCamera.devicePosition.clone();
        const qua = vrHelper.webVRCamera.deviceRotationQuaternion.clone();
        vrPositionEvent.execute({ pos, qua });
      });

      const props = { cotrollerActionEvent, vrPositionEvent };
      if (onMount) onMount(props);

      setvrcontext(props);
    }
  }, [context]);

  return (
    <VRContext.Provider value={vrcontext}>
      {vrcontext && children}
    </VRContext.Provider>
  );
};

export default VR;
