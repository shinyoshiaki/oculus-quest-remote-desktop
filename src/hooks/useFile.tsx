import { useState } from "react";

export default function useFile(): [
  File,
  (setfile: any) => void,
  (onSetFile: (a: File) => void) => void
] {
  const [value, setvalue] = useState();
  let cb: any;
  const setfile = (e: any) => {
    const file = e.target.files[0];
    setvalue(file);
    if (cb) cb(file);
  };

  const onSetFile = (_cb: (a: File) => void) => (cb = _cb);
  return [value, setfile, onSetFile];
}
