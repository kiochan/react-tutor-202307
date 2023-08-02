import React, { Component } from "react";
import { Counter } from "./Counter";


// 输入 (props)
export interface CounterCCProps {
    initialCount?: number;
}

// 输入 (props)
export interface CounterCCStates {
    value: number;
}

// Class组件
export class CounterCC extends Component<CounterCCProps, CounterCCStates> {

    // 初始化 （构造函数）
    constructor(props: CounterCCProps) {
        super(props);
        this.state = {
            value: props.initialCount ?? 0
        }
    }

    // 方法
    protected addOneToValue = () => {
        this.setState((state) => ({
            ...state,
            value: state.value + 1
        }))
    }

    // 渲染
    render() {
        return <Counter name={"类组件"} value={this.state.value} onClick={this.addOneToValue} />
    }
}