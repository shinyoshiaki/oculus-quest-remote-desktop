import { useState } from "react";

export default function useInput(): [string, (set: any) => void, () => void] {
  const [value, setvalue] = useState("");
  const input = (e: any) => {
    setvalue(e.target.value);
  };
  const clear = () => {
    setvalue("");
  };

  return [value, input, clear];
}
