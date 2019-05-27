import React, { FC, useState, useEffect } from "react";
import { getLocalDesktop } from "../../domain/media";

type Props = { onStream: (stream: MediaStream) => void };

let desktopRef: any = React.createRef();

const Display: FC<Props> = ({ onStream }) => {
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const stream = await getLocalDesktop();
    desktopRef.srcObject = stream;
    onStream(stream);
  };

  return (
    <div>
      <p>display</p>
      <video ref={v => (desktopRef = v)} autoPlay={true} />
    </div>
  );
};

export default Display;
