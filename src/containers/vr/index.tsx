import { FC } from "react";
import VR, { OnMountProps } from "../../components/babylon/vr";
import { webrtcService } from "../../services/webrtc";
import useSelectorRef from "../../hooks/useSelectorRef";
import { ReduxState } from "../../redux";

const VRContainer:FC=()=>{

const keyboardOpenRef = useSelectorRef(
    (store: ReduxState) => store.devices.keyboardOpen
  );

const onVRMount = (props: OnMountProps) => {
    const { cotrollerActionEvent } = props;
    cotrollerActionEvent.subscribe(({ hand }) => {
      if (webrtcService.peer && hand === "right" && !keyboardOpenRef.current)
        webrtcService.peer.send(JSON.stringify({ type: "click" }));
    });
  };


    return <VR onMount={onVRMount}/>
}

export default VRContainer;