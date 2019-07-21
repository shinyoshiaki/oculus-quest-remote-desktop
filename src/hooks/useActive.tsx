import { useEffect } from "react";
import { T } from "ts-toolbelt";


export default function useActive<U extends any[]>(
  fun: (...bind: T.NonNullable<U>) => void,
  ...bind: U
) {
  console.log([...bind])
  useEffect(() => {
    const unexist = bind.filter(v => v === undefined || null);
    if (unexist.length === 0) fun(...(bind as any));
  }, [...bind]);
}
