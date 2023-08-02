import React, { useCallback, useEffect, useState } from "react";
import { Counter } from "./Counter";

// 输入
export interface CounterFCProps {
    initialCount?: number;
}

export const CounterFC = (props: CounterFCProps) => {
    // 状态 （副作用）
    const [value, setValue] = useState<number>(props.initialCount ?? 0)

    // 使用了一个回调函数，这个回调函数会根据 value 的值来计算新的值
    const addOneToValue = useCallback(() => {
        setValue((value) => (value + 1))
    }, [value])

    useEffect(() => {
        console.log("组件被创建")
        return () => {
            console.log("组件被清楚")
        }
    }, [])

    useEffect(() => {
        console.log("value changed to ", value)
    }, [value])

    // 渲染输出
    return <Counter name="函数组件" value={value} onClick={addOneToValue} />
}