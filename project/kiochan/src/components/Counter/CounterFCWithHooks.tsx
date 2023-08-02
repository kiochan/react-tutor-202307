import React from "react";
import { CounterFCProps } from "./CounterFC";
import { useCounterValue } from "./hooks/useCounterValue";


export const CounterFCWithHooks = (props: CounterFCProps) => {
    const [value1, addOneFor1] = useCounterValue(props.initialCount)
    const [value2, addOneFor2] = useCounterValue(props.initialCount)

    // 渲染输出
    return <div className="counter">
        函数组件 with hooks
        <span>{value1}</span>
        <span>{value2}</span>
        <br />
        <button onClick={addOneFor1}>add one for 1</button>
        <button onClick={addOneFor2}>add one for 2</button>
    </div>
}