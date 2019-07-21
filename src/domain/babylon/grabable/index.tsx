import React, { FC, Fragment, useContext, useRef } from "react";
import { AbstractMesh, OculusTouchController } from "@babylonjs/core";
import { VRContext } from "../vr";
import useActive from "../../../hooks/useActive";

const Grabable: FC = () => {
  const vrContext = useContext(VRContext);

  const stateRef = useRef(
    new (class {
      selectedMesh?: AbstractMesh;
    })()
  );

  useActive(vrContext => {
    const state = stateRef.current;
    let { selectedMesh } = state;

    const VRHelper = vrContext.vrHelper;

    VRHelper.onControllerMeshLoaded.add(webVRController => {
      (webVRController as OculusTouchController).onSecondaryTriggerStateChangedObservable.add(
        stateObject => {
          if (selectedMesh && selectedMesh.name.split(":")[0] === "grab") {
            if (stateObject.value > 0.01) {
              webVRController.mesh!.addChild(selectedMesh);
            } else {
              webVRController.mesh!.removeChild(selectedMesh);
            }
          }
        }
      );
    });
    VRHelper.onNewMeshSelected.add(mesh => {
      selectedMesh = mesh;
    });
    VRHelper.onSelectedMeshUnselected.add(() => {
      selectedMesh = undefined;
    });

    stateRef.current = state;
  }, vrContext);

  return <Fragment />;
};

export default Grabable;
