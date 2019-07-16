import React, { FC, Fragment, useEffect, useContext } from "react";
import { Sound, Vector3 } from "@babylonjs/core";
import { SceneContext } from "../scene";
const Audio: FC<{ stream: MediaStream }> = ({ stream }) => {
  const context = useContext(SceneContext);

  useEffect(() => {
    (async () => {
      if (stream && context) {
        const { scene } = context;
        const music = new Sound("Violons", stream, scene, null, {
          autoplay: true,
          streaming: true,
          spatialSound: true
        });
        music.setDirectionalCone(90, 180, 0);
        music.setLocalDirectionToMesh(new Vector3(1, 0, 0));
      }
    })();
  }, [stream]);

  return <Fragment />;
};

export default Audio;
