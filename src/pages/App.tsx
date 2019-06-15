import React, { useRef, useState } from "react";

import SceneCreate, { SceneEventArgs } from "../domain/babylon/scene";
import { Vector3, HemisphericLight, FreeCamera } from "@babylonjs/core";
import useInput from "../hooks/useInput";
import { webrtcService } from "../services/webrtc";
import Desktop from "../domain/babylon/desktop";
import Event from "rx.mini";
import VR from "../domain/babylon/vr";

const App: React.FC = () => {
  const [room, setroom, clearroom] = useInput();
  const ref = useRef<any>(null);
  const [stream, setstream] = useState<MediaStream>();
  const [mouseMoveEvent] = useState(new Event<{ x: number; y: number }>());
  const [mouseClickEvent] = useState(new Event());

  const onSceneMount = (e: SceneEventArgs) => {
    const { canvas, scene, engine } = e;

    new HemisphericLight("sunLight", new Vector3(0, 1, 0), scene);

    const camera = new FreeCamera("camera", new Vector3(0, 1, -2), scene);
    camera.attachControl(canvas, true);
    (scene.activeCamera as any).beta += 0.8;

    mouseMoveEvent.subscribe(pos =>
      webrtcService.peer.send(JSON.stringify({ type: "move", payload: pos }))
    );

    mouseClickEvent.subscribe(() =>
      webrtcService.peer.send(JSON.stringify({ type: "click" }))
    );

    engine.runRenderLoop(() => {
      scene.render();
    });
  };

  const connect = async () => {
    await webrtcService.join(
      "https://aqueous-earth-75182.herokuapp.com/",
      room,
      false
    );
    clearroom();
    webrtcService.peer.onAddTrack.subscribe(ms => {
      setstream(ms);
      ref.current = ms;
    });
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <input onChange={setroom} value={room} />
        <button onClick={connect}>connect</button>
      </div>
      <SceneCreate onSceneMount={onSceneMount} height={400} width={600}>
        <VR event={mouseClickEvent} />
        {stream && (
          <Desktop
            stream={stream}
            ratio={{
              vertical: 2,
              horizontal: 2 * 1.7
            }}
            mouseMoveEvent={mouseMoveEvent}
          />
        )}
      </SceneCreate>
      <video ref={ref} autoPlay={true} width={340} height={200} />
    </div>
  );
};

export default App;
