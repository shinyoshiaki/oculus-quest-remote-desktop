import React, { FC } from "react";
import Display from "../components/display";
import { join, create } from "../domain/webrtc/signaling";

const Cast: FC = () => {
  const onStream = async (stream: MediaStream) => {
    const peer = await create("quest", false);
    peer.addTrack(stream.getVideoTracks()[0], stream);
  };

  return (
    <div>
      <p>cast</p>
      <Display onStream={onStream} />
    </div>
  );
};

export default Cast;
