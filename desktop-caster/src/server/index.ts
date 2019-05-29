import mouse from "./robot";
import signaling from "./signaling";

export default async function server() {
  mouse();
  signaling();
}
