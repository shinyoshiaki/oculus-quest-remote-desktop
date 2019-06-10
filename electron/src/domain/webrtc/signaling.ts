import client from "socket.io-client";
import WebRTC from "../../lib/webrtc";

const url = "https://aqueous-earth-75182.herokuapp.com/";

const socket = client.connect(url);

export function create(roomId: string, trickle: boolean) {
  return new Promise<WebRTC>(resolve => {
    const rtc = new WebRTC({ nodeId: "answer", trickle });
    socket.emit("create", { roomId });
    socket.on("sdp", (data: { sdp: string }) => {
      console.log({ data });
      rtc.setSdp(data.sdp);
    });

    const onSignal = rtc.onSignal.subscribe((sdp: any) => {
      console.log({ sdp, roomId });
      socket.emit("sdp", { sdp, roomId });
    });
    rtc.onConnect.once(() => {
      console.log("connect");
      onSignal.unSubscribe();
      resolve(rtc);
    });
  });
}

export function join(roomId: string, trickle: boolean) {
  return new Promise<WebRTC>(resolve => {
    const rtc = new WebRTC({ nodeId: "offer", trickle });
    socket.emit("join", { roomId });
    socket.on("join", () => {
      rtc.makeOffer();
    });
    socket.on("sdp", (data: { sdp: string }) => {
      console.log({ data });
      rtc.setSdp(data.sdp);
    });

    const onSignal = rtc.onSignal.subscribe((sdp: any) => {
      console.log({ sdp, roomId });
      socket.emit("sdp", { sdp, roomId });
    });
    rtc.onConnect.once(() => {
      console.log("connect");
      resolve(rtc);
      onSignal.unSubscribe();
    });
  });
}
