import { useState } from "react";

export function useObject<T>(obj: T) {
  const [state, setObj] = useState({ ...obj });

  type func = (prev: T) => Partial<T>;
  type obj = Partial<T>;

  const setState = <U extends func | obj>(change: U) => {
    setObj(prev => {
      if (typeof JSON.stringify(change) === "string") {
        return { ...prev, ...change };
      } else {
        return { ...prev, ...(change as func)(prev) };
      }
    });
  };

  return { ...state, setState };
}
