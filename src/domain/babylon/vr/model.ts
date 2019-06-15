import { Vector3 } from "@babylonjs/core";

export const controllerAction = (hand: "right" | "left") => ({ hand });

export type ControllerAction = ReturnType<typeof controllerAction>;

export const vrPosition = (pos: Vector3) => ({ pos });

export type VrPosition = ReturnType<typeof vrPosition>;
