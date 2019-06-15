import React, { FC, useEffect } from "react";
import { getScreen } from "../../domain/media";

type Props = { onStream: (stream: MediaStream) => void };

let desktopRef: any = React.createRef();

const Display: FC<Props> = ({ onStream }) => {
  useEffect(() => {
    const init = async () => {
      const stream = await getScreen();
      desktopRef.srcObject = stream;
      onStream(stream);
    };
    init();
  }, []);

  return (
    <div>
      <p>display</p>
      <video ref={v => (desktopRef = v)} autoPlay={true} muted={true} />
    </div>
  );
};

export default Display;
