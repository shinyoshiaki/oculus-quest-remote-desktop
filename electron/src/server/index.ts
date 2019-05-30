import mouse from "./robot";
import signaling from "./signaling";

export default async function server() {
  mouse();
  console.log((window as any).require("crypto"));
  signaling();
}
