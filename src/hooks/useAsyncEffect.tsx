import { useEffect } from "react";

export function useAsyncEffect<T>(effect: (dep: T) => void, dep: T) {
  useEffect(() => {
    (async () => {
      if (dep) effect(dep!);
    })();
  }, [dep]);
}
