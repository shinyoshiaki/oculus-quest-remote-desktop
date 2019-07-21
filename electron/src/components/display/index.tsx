import React, { FC, useEffect, useRef } from "react";
import styled from "styled-components";
import { Card } from "@material-ui/core";

type Props = { strem: MediaStream };

const Display: FC<Props> = ({ strem }) => {
  const ref = useRef<any>();

  useEffect(() => {
    const video = ref.current;
    if (video) {
      video.srcObject = strem;
    }
  }, [ref]);

  return (
    <Card>
      <Text>display</Text>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <video
          ref={ref}
          autoPlay={true}
          muted={true}
          style={{ width: "70%", padding: 30 }}
        />
      </div>
    </Card>
  );
};

export default Display;

const Text = styled.p`
  width: 100%;
  font-size: 20px;
  text-align: center;
`;
