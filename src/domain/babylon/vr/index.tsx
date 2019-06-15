import React, {
  FC,
  Fragment,
  useContext,
  useEffect,
  Children,
  cloneElement,
  useState
} from "react";
import { Context } from "../scene";
import { Color3 } from "@babylonjs/core";
import Event from "rx.mini";
import { ControllerAction, VrPosition } from "./model";

export type OnMountProps = {
  cotrollerActionEvent: Event<ControllerAction>;
  vrPositionEvent: Event<VrPosition>;
};

const VR: FC<{
  onMount?: (props: OnMountProps) => void;
}> = ({ onMount, children }) => {
  const context = useContext(Context);
  const [childrenMod, setchildrenMod] = useState<any>();

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
        vrPositionEvent.execute({ pos });
      });

      const props = { cotrollerActionEvent, vrPositionEvent };
      if (onMount) onMount(props);

      setchildrenMod(
        Children.map(children, child => {
          return cloneElement(child as any, { props });
        })
      );
    }
  }, [context]);

  return <Fragment>{childrenMod && childrenMod}</Fragment>;
};

export default VR;
