import React, { FC, useEffect, useState } from "react";
import { MeshBuilder, Scene, Vector4, Mesh, Vector3 } from "babylonjs";

const Plane: FC<{
  name: string;
  options?: Options;
  scene: Scene;
  onMount?: (e: Mesh) => void;
  position?: Vector3;
  rotation?: Vector3;
}> = ({ name, options, scene, onMount, children, position, rotation }) => {
  const _options = options || {};
  const _position = position || new Vector3(0, 0, 0);
  const _rotation = rotation || new Vector3(0, 0, 0);

  const [mesh, setmesh] = useState<Mesh>();

  useEffect(() => {
    const plane = MeshBuilder.CreatePlane(name, _options, scene);
    setmesh(plane);

    plane.position = _position;
    plane.rotation = _rotation;
    if (onMount) onMount(plane);
  }, []);

  useEffect(() => {
    if (mesh) mesh.position = position!;
  }, [position]);

  useEffect(() => {
    if (mesh) mesh.rotation = rotation!;
  }, [rotation]);

  return <React.Fragment>{children}</React.Fragment>;
};

type Options = {
  size?: number;
  width?: number;
  height?: number;
  sideOrientation?: number;
  frontUVs?: Vector4;
  backUVs?: Vector4;
  updatable?: boolean;
  sourcePlane?: any;
};

export default Plane;
