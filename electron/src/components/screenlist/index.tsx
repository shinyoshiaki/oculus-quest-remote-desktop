import React, { FC, useEffect, useState } from "react";
import getScreenList, { ScreenSource } from "../../domain/screen/screenlist";
import styled from "styled-components";
import ScreenItem from "./screenitem";

const ScreenList: FC<{ onClick: (id: string) => void }> = ({ onClick }) => {
  const [screenSources, setscreenSources] = useState<ScreenSource[]>([]);
  useEffect(() => {
    (async () => {
      const res = await getScreenList();
      setscreenSources(res);
    })();
  }, []);

  return (
    <Flex>
      {screenSources.map(item => (
        <div key={item.id} onClick={() => onClick(item.id)}>
          <ScreenItem screen={item} />
        </div>
      ))}
    </Flex>
  );
};

export default ScreenList;

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
