import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";

export default function useSelectorRef<T>(selector: (state: any) => T) {
  const ref = useRef<T>();
  const select = useSelector(selector);
  useEffect(() => {
    ref.current = select;
  }, [select]);
  return ref;
}
