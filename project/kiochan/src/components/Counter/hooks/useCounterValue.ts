import { useCallback, useState } from "react";

export const useCounterValue = (initValue: number = 0) => {
  // 状态 （副作用）
  const [value, setValue] = useState<number>(initValue);

  // 使用了一个回调函数，这个回调函数会根据 value 的值来计算新的值
  const addOne = useCallback(() => {
    setValue((value) => value + 1);
  }, [value]);

  return [value, addOne] as const;
};
