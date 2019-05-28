import React from "react";
import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";
import BabylonScene, { SceneEventArgs } from "../components/scene";
import { History } from "history";
import createDesktop from "../domain/babylon/desktop";
import { join, create } from "../domain/webrtc/signaling";
import { Vector3 } from "babylonjs";

export default class PageWithScene extends React.Component<
  { history: History },
  { stream?: MediaStream }
> {
  constructor(props: any) {
    super(props);
    this.state = { stream: undefined };
  }

  connect = async () => {
    const peer = await join("quest", false);
    peer.onAddTrack.subscribe(stream => {
      this.setState({ stream });
    });
  };

  onSceneMount = async (e: SceneEventArgs) => {
    const { canvas, scene, engine } = e;

    // Lights and camera
    new BABYLON.HemisphericLight(
      "sunLight",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );

    const camera = new BABYLON.FreeCamera(
      "camera",
      new BABYLON.Vector3(0, 1, -5),
      scene
    );
    camera.attachControl(canvas, true);
    (scene.activeCamera as any).beta += 0.8;

    // Default Environment
    const environment = scene.createDefaultEnvironment({
      enableGroundShadow: true,
      groundYBias: 1
    });
    environment!.setMainColor(BABYLON.Color3.FromHexString("#74b9ff"));

    // Enable VR
    const vrHelper = scene.createDefaultVRExperience({
      createDeviceOrientationCamera: false
    });
    vrHelper.enableTeleportation({ floorMeshes: [environment!.ground!] });

    scene.onBeforeRenderObservable.add(() => {
      if (this.state.stream) {
        console.log("exist");
        createDesktop(e, this.state.stream);
        this.setState({ stream: undefined });
      }
    });

    {
      const desktop = BABYLON.MeshBuilder.CreatePlane(
        "desktop",
        { width: 2 * 1.7, height: 2 },
        scene
      );
      desktop.position = new BABYLON.Vector3(0, 1, 0);
      // Impact impostor
      var impact = BABYLON.Mesh.CreatePlane("impact", 1, scene);
      const mat = (impact.material = new BABYLON.StandardMaterial(
        "impactMat",
        scene
      ));
      impact.scaling = new Vector3(0.02, 0.02, 0.04);
      mat.diffuseTexture = new BABYLON.Texture("textures/impact.png", scene);
      mat.diffuseTexture.hasAlpha = true;
      impact.position = new BABYLON.Vector3(0, 0, -0.1);

      scene.onPointerDown = function(evt, pickResult) {
        // if the click hits the ground object, we change the impact position
        if (pickResult.hit) {
          const { x, y } = pickResult!.pickedPoint!;
          if (-1.7 < x && x < 1.7) impact.position.x = x;
          if (0 < y && y < 2) impact.position.y = y;
          console.log(impact.position);
        }
      };
    }

    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });
  };

  render() {
    return (
      <div>
        <div style={{ display: "flex" }}>
          <button
            onClick={() => {
              this.props.history.push("cast");
            }}
          >
            cast
          </button>
          <button onClick={this.connect}>connect</button>
        </div>
        <BabylonScene
          onSceneMount={this.onSceneMount}
          height={400}
          width={600}
        />
      </div>
    );
  }
}
