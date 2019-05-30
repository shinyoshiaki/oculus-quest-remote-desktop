import React, { FC } from "react";
import Display from "../components/display";
import { create } from "../domain/webrtc/signaling";
import { moveMouse, clickMouse } from "../server/robot";
import { useState } from "react";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const Cast: FC = () => {
  const [room, setroom] = useState(getRandomInt(0, 1000000).toString());

  const onStream = async (stream: MediaStream) => {
    const peer = await create(room, false);
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
      <p>pin code</p>
      <p>{room}</p>
      <Display onStream={onStream} />
    </div>
  );
};

export default Cast;
