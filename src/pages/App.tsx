import React, { useRef, useState, FC, Fragment } from "react";

import SceneCreate, { SceneEventArgs } from "../domain/babylon/scene";
import { Vector3, HemisphericLight, FreeCamera } from "@babylonjs/core";
import useInput from "../hooks/useInput";
import { webrtcService } from "../services/webrtc";
import Desktop, { OnDesktopMountProps } from "../domain/babylon/desktop";
import VR, { OnMountProps } from "../domain/babylon/vr";
import Keyboard, { OnKeyboardMountProps } from "../domain/babylon/keyboard";
import { ReduxState } from "../redux";
import useSelectorRef from "../hooks/useSelectorRef";
import Audio from "../domain/babylon/audio";
import Grabable from "../domain/babylon/grabable";

const App: FC = () => {
  const [room, setroom, clearroom] = useInput();
  const [stream, setstream] = useState<MediaStream>();
  const keyboardOpenRef = useSelectorRef(
    (store: ReduxState) => store.devices.keyboardOpen
  );

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
      console.log("ref", keyboardOpenRef.current);
      if (webrtcService.peer && !keyboardOpenRef.current)
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
        console.log({ ms });
        setstream(ms);
      });
  };

  const onVRMount = (props: OnMountProps) => {
    const { cotrollerActionEvent } = props;
    cotrollerActionEvent.subscribe(({ hand }) => {
      if (webrtcService.peer && hand === "right" && !keyboardOpenRef.current)
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

      <SceneCreate onSceneMount={onSceneMount} height={400} width={600}>
        <VR onMount={onVRMount}>
          <Keyboard onMount={onKeyboardMount} />
          <Grabable />
        </VR>
        {stream && (
          <Fragment>
            <Desktop
              stream={stream}
              ratio={{
                vertical: 2,
                horizontal: 2 * 1.7
              }}
              onMount={onDesktopMount}
            />
            <Audio stream={stream} />
          </Fragment>
        )}
      </SceneCreate>
    </div>
  );
};

export default App;
