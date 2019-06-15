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

export type OnKeyboardMountProps = {
  keyboardActionEvent: Event<KeyboardAction>;
};

const Keyboard: FC<{
  onMount?: (props: OnKeyboardMountProps) => void;
}> = () => {
  const context = useContext(SceneContext);
  const vrContext = useContext(VRContext);

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

      plane.position = new Vector3(0, 1, 0);

      cotrollerActionEvent.subscribe(async ({ hand }) => {
        if (hand === "left") {
          const { pos, qua } = await vrPositionEvent.asPromise();
          plane.position = pos;
          plane.rotationQuaternion = qua;
          plane.translate(new Vector3(0, 0, 0.6), 1);
        }
      });

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

      input.onTextChangedObservable.add(e => {
        keyboardActionEvent.execute(keyboardAction(e.currentKey));
      });
    }
  }, [context]);

  return <Fragment />;
};

export default Keyboard;
