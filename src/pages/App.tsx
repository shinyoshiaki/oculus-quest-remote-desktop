import React, { useRef, useState, FC } from "react";

import SceneCreate, { SceneEventArgs } from "../domain/babylon/scene";
import { Vector3, HemisphericLight, FreeCamera } from "@babylonjs/core";
import useInput from "../hooks/useInput";
import { webrtcService } from "../services/webrtc";
import Desktop, { OnDesktopMountProps } from "../domain/babylon/desktop";
import VR, { OnMountProps } from "../domain/babylon/vr";
import Keyboard, { OnKeyboardMountProps } from "../domain/babylon/keyboard";

const App: FC = () => {
  const [room, setroom, clearroom] = useInput();
  const ref = useRef<any>();
  const [stream, setstream] = useState<MediaStream>();

  const onSceneMount = (e: SceneEventArgs) => {
    const { canvas, scene } = e;

    new HemisphericLight("sunLight", new Vector3(0, 1, 0), scene);

    const camera = new FreeCamera("camera", new Vector3(0, 1, -2), scene);
    camera.attachControl(canvas, true);
    (scene.activeCamera as any).beta += 0.8;
  };

  const onDesktopMount = (props: OnDesktopMountProps) => {
    const { mouseMoveEvent } = props;
    mouseMoveEvent.subscribe(pos => {
      if (webrtcService.peer)
        webrtcService.peer.send(JSON.stringify({ type: "move", payload: pos }));
    });
  };

  const connect = async () => {
    await webrtcService.join(
      "https://aqueous-earth-75182.herokuapp.com/",
      room,
      false
    );
    clearroom();
    if (webrtcService.peer)
      webrtcService.peer.onAddTrack.subscribe(ms => {
        setstream(ms);
        console.log(ms);
        ref.current.srcObject = ms;
      });
  };

  const onVRMount = (props: OnMountProps) => {
    const { cotrollerActionEvent } = props;
    cotrollerActionEvent.subscribe(() => {
      if (webrtcService.peer)
        webrtcService.peer.send(JSON.stringify({ type: "click" }));
    });
  };

  const onKeyboardMount = (props: OnKeyboardMountProps) => {
    const { keyboardActionEvent } = props;
    keyboardActionEvent.subscribe(({ key }) => {
      if (webrtcService.peer)
        webrtcService.peer.send(JSON.stringify({ type: "key", payload: key }));
    });
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <input onChange={setroom} value={room} />
        <button onClick={connect}>connect</button>
      </div>
      <video ref={ref} autoPlay={true} width={0} height={0} />
      <SceneCreate onSceneMount={onSceneMount} height={400} width={600}>
        <VR onMount={onVRMount}>
          <Keyboard onMount={onKeyboardMount} />
        </VR>
        {stream && (
          <Desktop
            stream={stream}
            ratio={{
              vertical: 2,
              horizontal: 2 * 1.7
            }}
            onMount={onDesktopMount}
          />
        )}
      </SceneCreate>
    </div>
  );
};

export default App;
