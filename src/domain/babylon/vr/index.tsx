import React, { FC, Fragment, useContext, useEffect } from "react";
import { Context } from "../scene";
import { Color3 } from "@babylonjs/core";
import Event from "rx.mini";

const VR: FC<{ event?: Event<any> }> = ({ event }) => {
  const context = useContext(Context);

  useEffect(() => {
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
            if (webVRController.hand === "right") {
              if (data.pressed) {
                if (event) event.execute();
              }
            }
          }
        );
      });
    }
  }, [context]);

  return <Fragment />;
};

export default VR;
