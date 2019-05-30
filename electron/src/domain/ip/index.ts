export default function getPrivateIP(): Promise<string> {
  return new Promise((resolve, reject) => {
    const RTCPeerConnection =
      (window as any).RTCPeerConnection ||
      (window as any).webkitRTCPeerConnection ||
      (window as any).mozRTCPeerConnection;
    if (!RTCPeerConnection) {
      return reject(new Error("Web RTC is not supported"));
    }
    const c = new RTCPeerConnection({
      iceServers: []
    });
    c.createDataChannel("", {
      reliable: false
    });
    c.onicecandidate = ({ candidate }: RTCPeerConnectionIceEvent) => {
      candidate && resolve(candidate.candidate.split(" ")[4]);
    };
    c.createOffer(
      (e: RTCOfferOptions) => {
        c.setLocalDescription(e);
      },
      (e: Error) => {
        reject(e);
      }
    );
  });
}
