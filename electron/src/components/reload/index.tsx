import React, { FC } from "react";
import { Button } from "@material-ui/core";

const Reload: FC = ({ children }) => {
  return (
    <Button
      onClick={() => {
        window.location.reload();
      }}
    >
      {children || "reload"}
    </Button>
  );
};

export default Reload;
