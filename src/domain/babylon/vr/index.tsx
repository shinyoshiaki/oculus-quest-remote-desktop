import React, { FC, Fragment, useContext, useEffect } from "react";
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
}> = ({ onMount }) => {
  const context = useContext(Context);

  useEffect(() => {
    const cotrollerActionEvent = new Event<ControllerAction>();
    const vrPositionEvent = new Event<VrPosition>();

    if (context) {
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

      if (onMount) onMount({ cotrollerActionEvent, vrPositionEvent });
    }
  }, [context]);

  return <Fragment />;
};

export default VR;
