import { FC } from "react";
import Keyboard, { OnKeyboardMountProps } from "../../components/babylon/keyboard";
import { webrtcService } from "../../services/webrtc";

const KeyboardContainer:FC=()=>{

const onKeyboardMount = (props: OnKeyboardMountProps) => {
    const { keyboardActionEvent } = props;
    keyboardActionEvent.subscribe(({ key }) => {
      if (webrtcService.peer)
        webrtcService.peer.send(JSON.stringify({ type: "key", payload: key }));
    });
  };

    return <Keyboard onMount={onKeyboardMount} />
}

export default KeyboardContainer