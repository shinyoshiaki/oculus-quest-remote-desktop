import React, { FC, useContext, Fragment, useEffect } from "react";
import { SceneContext } from "../scene";
import {
  AdvancedDynamicTexture,
  InputText,
  VirtualKeyboard,
  Control
} from "@babylonjs/gui";
import { MeshBuilder, Vector3 } from "@babylonjs/core";
import { VRContext } from "../vr";
import Event from "rx.mini";
import { keyboardAction, KeyboardAction } from "./model";
import { useDispatch } from "react-redux";
import { keyboardSwitch } from "../../../redux/devices";

export type OnKeyboardMountProps = {
  keyboardActionEvent: Event<KeyboardAction>;
};

const Keyboard: FC<{
  onMount?: (props: OnKeyboardMountProps) => void;
}> = ({ onMount }) => {
  const context = useContext(SceneContext);
  const vrContext = useContext(VRContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (context && vrContext) {
      const keyboardActionEvent = new Event<KeyboardAction>();

      const { scene } = context;
      const { cotrollerActionEvent, vrPositionEvent } = vrContext;

      const plane = MeshBuilder.CreatePlane(
        "ui",
        { width: 1, height: 1 },
        scene as any
      );
      plane.isVisible = false;

      const advancedTexture = AdvancedDynamicTexture.CreateForMesh(
        plane,
        1024,
        1024
      );

      const input = new InputText();
      input.width = 0.2;
      input.maxWidth = 0.2;
      input.height = "40px";
      input.color = "white";
      input.background = "green";
      advancedTexture.addControl(input);

      const keyboard = VirtualKeyboard.CreateDefaultLayout();
      keyboard.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
      advancedTexture.addControl(keyboard);

      keyboard.connect(input);

      let textBuffer = input.text;
      input.onTextChangedObservable.add(e => {
        console.log({ e }, input.text);

        if (input.text === textBuffer.slice(0, -1)) {
          console.log("back");
          keyboardActionEvent.execute(keyboardAction("backspace"));
        } else {
          keyboardActionEvent.execute(keyboardAction(e.currentKey));
        }
        textBuffer = input.text;
      });

      input.onBlurObservable.add(() => {
        keyboardActionEvent.execute(keyboardAction("enter"));
        input.text = "";
      });

      cotrollerActionEvent.subscribe(async ({ hand }) => {
        if (hand === "left") {
          plane.isVisible = !plane.isVisible;
          dispatch(keyboardSwitch(plane.isVisible));
          const { pos, qua } = await vrPositionEvent.asPromise();
          plane.position = pos;
          plane.rotationQuaternion = qua;
          plane.translate(new Vector3(0, 0, 0.6), 1);
        }
      });

      if (onMount) onMount({ keyboardActionEvent });
    }
  }, [context]);

  return <Fragment />;
};

export default Keyboard;
