import React from "react";
import * as BABYLON from "babylonjs";
import BabylonScene, { SceneEventArgs } from "../components/scene";
import { History } from "history";
import createDesktop from "../domain/babylon/desktop";
import { join } from "../domain/webrtc/signaling";
import createVR from "../domain/babylon/vr";
import WebRTC from "webrtc4me";
import Plane from "../domain/babylon/components/plane";
import { Vector3 } from "babylonjs";

export default class PageWithScene extends React.Component<
  { history: History },
  {
    stream?: MediaStream;
    address: string;
    args?: SceneEventArgs;
    rotate: Vector3;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      stream: undefined,
      address: "",
      rotate: new Vector3(0, 0, 0)
    };
  }

  peer?: WebRTC;
  ref: any;

  connect = async () => {
    const peer = await join(
      "https://aqueous-earth-75182.herokuapp.com/",
      this.state.address,
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

    this.setState({ args: e });
  };

  render() {
    let { args, rotate } = this.state;
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
        {args && (
          <div>
            <Plane
              scene={args.scene}
              name="sex"

              position={this.state.rotate}
              onMount={mesh => {
                let i = 0;
                setInterval(() => {
                  this.setState({
                    ...this.state,
                    rotate: new Vector3(i++/10, 0, 0)
                  });
                  console.log(this.state.rotate, i);
                }, 1000);
              }}
            />
            <Plane
              scene={args.scene}
              name="sex1"
              position={new Vector3(1, 0, 0)}
            />
          </div>
        )}
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
