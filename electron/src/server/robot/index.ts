import robotjs from "robotjs";
import Event from "rx.mini";
console.log(window);
const load = (window as any).require;
const robot: typeof robotjs = load("robotjs");

const moveMouse = new Event<{ x: number; y: number }>();
const clickMouse = new Event();

export { moveMouse, clickMouse };

export default function remote() {
  const screenSize = robot.getScreenSize();
  const height = screenSize.height;
  const width = screenSize.width;

  moveMouse.subscribe(p => {
    robot.moveMouse(width * p.x, height * p.y);
  });

  clickMouse.subscribe(() => {
    console.log("left");
    robot.mouseClick("left");
  });
}
