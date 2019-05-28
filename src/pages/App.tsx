import React from "react";
import * as BABYLON from "babylonjs";
import BabylonScene, { SceneEventArgs } from "../components/scene";
import { History } from "history";
import createDesktop from "../domain/babylon/desktop";
import { join, create } from "../domain/webrtc/signaling";
import createVR from "../domain/babylon/vr";

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

    const environment = scene.createDefaultEnvironment({
      enableGroundShadow: true,
      groundYBias: 1
    });
    environment!.setMainColor(BABYLON.Color3.FromHexString("#74b9ff"));

    createVR(e, environment!).subscribe(() => {});

    scene.onBeforeRenderObservable.add(() => {
      if (this.state.stream) {
        this.setState({ stream: undefined });
        createDesktop(e, this.state.stream).then(e => e.subscribe(pos => {}));
      }
    });

    engine.runRenderLoop(() => {
      if (scene) scene.render();
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
