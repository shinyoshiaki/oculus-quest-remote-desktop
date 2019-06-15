import { useState } from "react";

type Head<T extends any[], D = never> = T extends [infer X, ...any[]] ? X : D;

export function useApi<T, A>(promise: (obj: A) => Promise<T>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetch = async (p: Head<Parameters<typeof promise>>) => {
    setLoading(true);
    const res = p ? await promise(p as any) : await promise(undefined as any);
    if (!res) setError(true);

    setLoading(false);
    return res;
  };
  return { loading, fetch, error };
}
