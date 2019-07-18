import React, { FC, Fragment, useEffect, useContext } from "react";
import { Scene, Camera } from "@babylonjs/core";
import { SceneContext } from "../scene";

const Iframe: FC<{ camera?: Camera }> = ({ camera }) => {
  const context = useContext(SceneContext)!;

  useEffect(() => {
    if (!camera) return;
    createPage(context.scene, camera);
  }, [camera]);

  return (
    <Fragment>
      <div id="canvasZone" />
    </Fragment>
  );
};

function createPage(
  scene: Scene,
  camera: Camera,
  url = "https://doc.babylonjs.com/"
) {
  scene.registerBeforeRender(function() {
    let cp = camera.position;
    let dx =
      (Math.atan(Math.sqrt(cp.x * cp.x + cp.z * cp.z) / cp.y) * 180) / Math.PI;
    let dy = 0;
    let sign = 1;
    let baseSize = 180;
    if (dx > 0) {
      sign = -1;
    }
    let dz = (sign * Math.atan(cp.x / cp.z) * 180) / Math.PI;
    let size =
      (baseSize * camera.fov) /
      Math.sqrt(
        Math.pow(cp.x, 2.0) + Math.pow(cp.y, 2.0) + Math.pow(cp.z, 2.0)
      );
    attachHtml(
      "PageWeb",
      baseSize * size,
      baseSize * size,
      0,
      0,
      "800px",
      { rx: dx, ry: dy, rz: dz },
      '<iframe src="' + url + '" width="100%" height="100%"></iframe>'
    );
  });
}

function attachHtml(
  id: string,
  W: number,
  H: number,
  L: number,
  T: number,
  p: string,
  ts: any,
  content: string
) {
  let deg = 180 / Math.PI;
  let el = document.createElement("div");
  let exist = false;
  if (document.getElementById("spDiv" + id)) {
    exist = true;
    el = document.getElementById("spDiv" + id) as any;
  }

  let zone = document.getElementById("canvasZone") as any;
  let w = zone.offsetWidth.valueOf() * 1;
  let h = zone.offsetHeight.valueOf() * 1;

  el.setAttribute(
    "style",
    "transform: scale(1.0) scaleZ(1.0) rotateX(" +
      ts.rx +
      "deg) rotateY(" +
      ts.ry +
      "deg) rotateZ(" +
      ts.rz +
      "deg);transform-origin: 50% 50%;perspective: " +
      p +
      ";-webkit-transform: scale(1.0) scaleZ(1.0) rotateX(" +
      ts.rx +
      "deg) rotateY(" +
      ts.ry +
      "deg)  rotateZ(" +
      ts.rz +
      "deg);-webkit-transform-origin: 50% 50%;-moz-transform: scale(1.0) scaleZ(1.0) rotateX(" +
      ts.rx +
      "deg)  rotateY(" +
      ts.ry +
      "deg) rotateZ(" +
      ts.rz +
      "deg);-moz-transform-origin: 50% 50%;-o-transform: scale(1.0) scaleZ(1.0) rotateX(" +
      ts.rx +
      "deg)  rotateY(" +
      ts.ry +
      "deg) rotateZ(" +
      ts.rz +
      "deg);-o-transform-origin: 50% 50%;-ms-transform: scale(1.0) scaleZ(1.0) rotateX(" +
      ts.rx +
      "deg)  rotateY(" +
      ts.ry +
      "deg) rotateZ(" +
      ts.rz +
      "deg);-ms-transform-origin:50% 50%;transform: scale(1.0) scaleZ(1.0) rotateX(" +
      ts.rx +
      "deg)  rotateY(" +
      ts.ry +
      "deg)  rotateZ(" +
      ts.rz +
      "deg);transform-origin: 50% 50%;position:absolute;top:" +
      (h / 2 - H / 2 + T) +
      "px;left:" +
      (w / 2 - W / 2 + L) +
      "px;z-index:100;background-color:#ffffff;width:" +
      W +
      "px;height:" +
      H +
      "px;opacity:1.;"
  );
  el.id = "spDiv" + id;
  zone.setAttribute(
    "style",
    "-o-perspective: " +
      p +
      ";-o-perspective-origin: 50% 50%;-webkit-perspective: " +
      p +
      ";-webkit-perspective-origin: 50% 50%;-moz-perspective: " +
      p +
      ";-moz-perspective-origin: 50% 50%;-ms-perspective: " +
      p +
      ";-ms-perspective-origin: 50% 50%;perspective: " +
      p +
      ";perspective-origin: 50% 50%;position:relative"
  );

  if (!exist) {
    el.innerHTML = content;
    zone.appendChild(el);
  }
}

export default Iframe;
