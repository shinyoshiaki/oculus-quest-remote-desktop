import React, { FC, useEffect, useRef } from "react";
import { getScreen } from "../../domain/media";

type Props = { onStream: (stream: MediaStream) => void };

const Display: FC<Props> = ({ onStream }) => {
  const ref = useRef<any>();

  useEffect(() => {
    (async () => {
      console.log("display");
      const stream = await getScreen();
      console.log(stream);
      ref.current.srcObject = stream;
      onStream(stream);
    })();
  }, []);

  return (
    <div>
      <p>display</p>
      <video ref={ref} autoPlay={true} muted={true} />
    </div>
  );
};

export default Display;
