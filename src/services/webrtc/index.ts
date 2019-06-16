import client from "socket.io-client";
import WebRTC from "webrtc4me";

class WebRTCService {
  private rtc?: WebRTC;

  get peer() {
    return this.rtc;
  }

  create(url: string, roomId: string, trickle: boolean) {
    const socket = client.connect(url);
    return new Promise<WebRTC>(resolve => {
      const rtc = new WebRTC({ nodeId: "answer", trickle });
      socket.emit("create", { roomId });
      socket.on("sdp", (data: { sdp: string }) => {
        console.log({ data });
        rtc.setSdp(data.sdp);
      });

      const onSignal = rtc.onSignal.subscribe(sdp => {
        console.log({ sdp, roomId });
        socket.emit("sdp", { sdp, roomId });
      });
      rtc.onConnect.once(() => {
        console.log("connect");
        onSignal.unSubscribe();
        resolve(rtc);
      });
      this.rtc = rtc;
    });
  }

  join(url: string, roomId: string, trickle: boolean) {
    const socket = client.connect(url);
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

      const onSignal = rtc.onSignal.subscribe(sdp => {
        console.log({ sdp, roomId });
        socket.emit("sdp", { sdp, roomId });
      });
      rtc.onConnect.once(() => {
        console.log("connect");
        resolve(rtc);
        onSignal.unSubscribe();
      });
      this.rtc = rtc;
    });
  }
}

const webrtcService = new WebRTCService();

export { webrtcService };
