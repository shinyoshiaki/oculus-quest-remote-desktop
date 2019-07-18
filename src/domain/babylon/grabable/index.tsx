import React, { FC, Fragment, useContext, useRef } from "react";
import { Mesh, AbstractMesh, Scene, StandardMaterial } from "@babylonjs/core";
import { SceneContext } from "../scene";
import { useAsyncEffect } from "../../../hooks/useAsyncEffect";
import { VRContext } from "../vr";

const Grabable: FC<{}> = ({}) => {
  const context = useContext(SceneContext);
  const vrContext = useContext(VRContext)!;

  const selectedMesh = useRef<AbstractMesh | null>();

  useAsyncEffect(async vrContext => {
    const VRHelper = vrContext.vrHelper;
    VRHelper.onControllerMeshLoaded.add(webVRController => {
      webVRController.onTriggerStateChangedObservable.add(stateObject => {
        if (stateObject.value > 0.01) {
          if (selectedMesh && selectedMesh.current) {
            webVRController.mesh!.addChild(selectedMesh.current);
          }
        } else {
          if (selectedMesh && selectedMesh.current) {
            webVRController.mesh!.removeChild(selectedMesh.current);
          }
        }
      });
    });
    VRHelper.onNewMeshSelected.add(mesh => {
      selectedMesh.current = mesh;
    });
    VRHelper.onSelectedMeshUnselected.add(() => {
      selectedMesh.current = null;
    });
  }, vrContext);

  useAsyncEffect(context => {
    const { scene } = context!;
    createCubes(scene);
  }, context);

  const createCubes = (scene: Scene) => {
    const cubes: Mesh[] = [];
    for (var i = 0; i < 4; i++) {
      cubes.push(Mesh.CreateBox("cube" + i, 2, scene));
      cubes[i].position.y = 1;
      cubes[i].material = new StandardMaterial("cubeMat", scene);
    }
    cubes[0].position.z = 8;
    cubes[1].position.x = 8;
    cubes[2].position.x = -8;
    cubes[3].position.z = -8;
  };

  return <Fragment />;
};

export default Grabable;
