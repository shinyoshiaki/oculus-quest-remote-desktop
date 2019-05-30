import React, { FC } from "react";
import Display from "../components/display";
import { create } from "../domain/webrtc/signaling";
import ShowIP from "../components/showip";
import { moveMouse, clickMouse } from "../server/robot";

const Cast: FC = () => {
  const onStream = async (stream: MediaStream) => {
    const peer = await create("quest", false);
    console.log({ stream });
    peer.addTrack(stream.getVideoTracks()[0], stream);
    peer.addTrack(stream.getAudioTracks()[0], stream);
    peer.onData.subscribe(msg => {
      console.log(msg);
      const data = JSON.parse(msg.data);
      switch (data.type) {
        case "move":
          moveMouse.execute(data.payload);
          break;
        case "click":
          clickMouse.execute();
          break;
      }
    });
  };

  return (
    <div>
      <p>cast</p>
      <ShowIP />
      <Display onStream={onStream} />
    </div>
  );
};

export default Cast;
