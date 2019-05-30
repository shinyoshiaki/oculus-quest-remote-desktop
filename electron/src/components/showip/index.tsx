import React, { FC, useState, useEffect } from "react";
import getPrivateIP from "../../domain/ip";

const ShowIP: FC = () => {
  const [ip, setip] = useState("");

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const res = await getPrivateIP();
    setip(res);
  };

  return (
    <div>
      <p>{ip}</p>
    </div>
  );
};

export default ShowIP;
