import React, { Component } from "react";
import { CounterCC, CounterCCProps, CounterCCStates } from "./CounterCC";


export interface CounterCC2Props extends CounterCCProps { }

export interface CounterCC2States extends CounterCCStates {
    value2: number;
}

export class CounterCC2 extends CounterCC implements Component<CounterCC2Props, CounterCC2States> {
    state!: CounterCC2States
    setState!: React.Component<CounterCCProps, CounterCC2States>["setState"];

    // 初始化 （构造函数）
    constructor(props: CounterCC2Props) {
        super(props);
        this.state = {
            ...this.state,
            value2: props.initialCount ?? 0
        };
    }
    // 方法
    protected addOneToValue2 = () => {
        this.setState((state) => ({
            ...state,
            value2: state.value2 + 1
        }));
    }
    // 渲染
    render() {
        return <div className="counter">
            类组件2
            <span>{this.state.value}</span>
            <span>{this.state.value2}</span>
            <br />
            <button onClick={this.addOneToValue}>add one for 1</button>
            <button onClick={this.addOneToValue2}>add one for 2</button>
        </div>;
    }
}