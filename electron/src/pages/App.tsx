import React, { FC, useState } from "react";
import Display from "../components/display";
import { create } from "../domain/webrtc/signaling";
import { moveMouse, clickMouse, keyTap } from "../server/robot";
import ScreenList from "../components/screenlist";
import { getScreen } from "../domain/screen/screen";
import Reload from "../components/reload";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const Cast: FC = () => {
  const [screenStream, setscreenStream] = useState<MediaStream>();
  const [room] = useState(getRandomInt(1000000, 10000000).toString());

  const onSelectScreen = async (id: string) => {
    const res = await getScreen(id);
    setscreenStream(res);
    onStream(res);
  };

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
        case "key":
          keyTap.execute(data.payload);
          break;
      }
    });
    peer.onDisconnect.once(() => {
      window.location.reload();
    });
  };

  return (
    <div>
      {screenStream ? (
        <div>
          <Reload>{"再選択"}</Reload>
          <p>pin code</p>
          <p>{room}</p>
          <Display strem={screenStream} />
        </div>
      ) : (
        <div>
          <p style={{ fontSize: 23 }}>シェアする画面を選択してください</p>
          <ScreenList onClick={onSelectScreen} />
        </div>
      )}
    </div>
  );
};

export default Cast;
