import React from "react";

export interface CounterProps {
    name: string;
    value: number;
    onClick: () => void;
}

export const Counter = (props: CounterProps) => {
    return <div className="counter">
        {props.name}
        <span>{props.value}</span>
        <button onClick={props.onClick}>add one</button>
    </div>
}