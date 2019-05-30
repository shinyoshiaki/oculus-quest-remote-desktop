import React from "react";
import * as BABYLON from "babylonjs";
import BabylonScene, { SceneEventArgs } from "../components/scene";
import { History } from "history";
import createDesktop from "../domain/babylon/desktop";
import { join } from "../domain/webrtc/signaling";
import createVR from "../domain/babylon/vr";
import WebRTC from "webrtc4me";

export default class PageWithScene extends React.Component<
  { history: History },
  { stream?: MediaStream; address: string }
> {
  constructor(props: any) {
    super(props);
    this.state = { stream: undefined, address: "" };
  }

  peer?: WebRTC;
  ref: any;

  connect = async () => {
    const peer = await join(
      "http://" + this.state.address + ":20000",
      "quest",
      false
    );
    this.peer = peer;
    this.setState({ address: "" });
    peer.onAddTrack.subscribe(stream => {
      console.log(stream);
      this.setState({ stream });
      this.ref.srcObject = stream;
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

    createVR(e, environment!).subscribe(() => {
      if (this.peer) {
        this.peer.send(JSON.stringify({ type: "click" }));
      }
    });

    scene.onBeforeRenderObservable.add(() => {
      if (this.state.stream) {
        createDesktop(e, this.state.stream).then(e =>
          e.subscribe(pos => {
            if (this.peer)
              this.peer.send(JSON.stringify({ type: "move", payload: pos }));
          })
        );
        this.setState({ stream: undefined });
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
          <input onChange={e => this.setState({ address: e.target.value })} />
          <button onClick={this.connect}>connect</button>
        </div>
        <BabylonScene
          onSceneMount={this.onSceneMount}
          height={400}
          width={600}
        />
        <video
          ref={ref => (this.ref = ref)}
          autoPlay={true}
          width={340}
          height={200}
        />
      </div>
    );
  }
}
