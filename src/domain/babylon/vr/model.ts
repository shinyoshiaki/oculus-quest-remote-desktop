import { Vector3, Quaternion } from "@babylonjs/core";

export const controllerAction = (hand: "right" | "left") => ({ hand });

export type ControllerAction = ReturnType<typeof controllerAction>;

export const vrPosition = (pos: Vector3, qua: Quaternion) => ({ pos, qua });

export type VrPosition = ReturnType<typeof vrPosition>;
