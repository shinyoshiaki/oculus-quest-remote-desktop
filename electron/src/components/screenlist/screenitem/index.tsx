import React, { FC } from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import { ScreenSource } from "../../../domain/screen/screenlist";

const ScreenItem: FC<{ screen: ScreenSource }> = ({ screen }) => {
  return (
    <Container>
      <Title>{screen.name}</Title>
      <img src={screen.thumbnail.toDataURL()} style={{ height: "70%" }} />
    </Container>
  );
};

export default ScreenItem;

const Container = styled(Card)`
  text-align: center;
  padding: 20px;
  margin: 10px;
  width: 400px;
  height: 300px;
`;

const Title = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
