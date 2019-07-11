import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";

export default function useSelectorRef<T>(selector: (state: any) => T) {
  const select = useSelector(selector);
  const ref = useRef<T>(select);

  useEffect(() => {
    ref.current = select;
  }, [select]);
  return ref;
}
