import React, { FC, useContext, Fragment, useEffect } from "react";
import { Context } from "../scene";
import {
  AdvancedDynamicTexture,
  InputText,
  VirtualKeyboard,
  Control
} from "@babylonjs/gui";
import { MeshBuilder, Vector3 } from "@babylonjs/core";
import { OnMountProps } from "../vr";

const Keyboard: FC<{ props?: OnMountProps }> = ({ props }) => {
  const { vrPositionEvent, cotrollerActionEvent } = props!;
  const context = useContext(Context);

  useEffect(() => {
    if (context) {
      const { scene } = context;

      const plane = MeshBuilder.CreatePlane(
        "ui",
        { width: 1, height: 1 },
        scene as any
      );

      plane.position = new Vector3(0, 1, 0);

      cotrollerActionEvent.subscribe(async ({ hand }) => {
        if (hand === "left") {
          const { pos } = await vrPositionEvent.asPromise();
          plane.position = pos;
          plane.translate(new Vector3(0, 0.2, 0.5), 1);
        }
      });

      var advancedTexture = AdvancedDynamicTexture.CreateForMesh(
        plane,
        1024,
        1024
      );

      var input = new InputText();
      input.width = 0.2;
      input.maxWidth = 0.2;
      input.height = "40px";
      input.color = "white";
      input.background = "green";
      advancedTexture.addControl(input);

      var keyboard = VirtualKeyboard.CreateDefaultLayout();
      keyboard.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
      advancedTexture.addControl(keyboard);

      keyboard.connect(input);
    }
  }, [context]);

  return <Fragment />;
};

export default Keyboard;
