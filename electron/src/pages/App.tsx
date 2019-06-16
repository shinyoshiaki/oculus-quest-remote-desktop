import React, { FC, useState } from "react";
import Display from "../components/display";
import { create } from "../domain/webrtc/signaling";
import { moveMouse, clickMouse } from "../server/robot";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const Cast: FC = () => {
  const [room] = useState(getRandomInt(1000000, 10000000).toString());

  const onStream = async (stream: MediaStream) => {
    const peer = await create(room, false);
    console.log({ stream });
    peer.addTrack(stream.getVideoTracks()[0], stream);
    if (stream.getAudioTracks()[0])
      peer.addTrack(stream.getAudioTracks()[0], stream);
    peer.onData.subscribe((msg: any) => {
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
      <p>pin code</p>
      <p>{room}</p>
      <Display onStream={onStream} />
    </div>
  );
};

export default Cast;
