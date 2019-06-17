import React, { useRef, useState, FC, useEffect } from "react";

import SceneCreate, { SceneEventArgs } from "../components/babylon/scene";
import { Vector3, HemisphericLight, FreeCamera } from "@babylonjs/core";
import useInput from "../hooks/useInput";
import { webrtcService } from "../services/webrtc";
import Desktop, { OnDesktopMountProps } from "../components/babylon/desktop";
import VR, { OnMountProps } from "../components/babylon/vr";
import Keyboard, { OnKeyboardMountProps } from "../components/babylon/keyboard";
import { useSelector } from "react-redux";
import { ReduxState } from "../redux";
import useSelectorRef from "../hooks/useSelectorRef";
import VRContainer from "../containers/vr";
import KeyboardContainer from "../containers/keyboard";

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

  const keyboardOpenRef = useSelectorRef(
    (store: ReduxState) => store.devices.keyboardOpen
  );

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
        setstream(ms);
        console.log(ms);
        ref.current.srcObject = ms;
      });
  };



  return (
    <div>
      <div style={{ display: "flex" }}>
        <input onChange={setroom} value={room} />
        <button onClick={connect}>connect</button>
      </div>

      <SceneCreate onSceneMount={onSceneMount} height={400} width={600}>
        <VRContainer>
          <KeyboardContainer/>
        </VRContainer>
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
      <video ref={ref} autoPlay={true} width={100} height={100} />
    </div>
  );
};

export default App;
