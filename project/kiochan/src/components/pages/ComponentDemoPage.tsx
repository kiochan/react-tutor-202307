import React from "react"
import { CounterFC } from "../Counter/CounterFC"
import { CounterCC } from "../Counter/CounterCC"
import { CounterFCWithHooks } from "../Counter/CounterFCWithHooks"
import { CounterCC2 } from "../Counter/CounterCC2"

export const ComponentDemoPage = () => {
    return <>
        <CounterFC></CounterFC>
        <CounterCC></CounterCC>
        <CounterFCWithHooks></CounterFCWithHooks>
        <CounterCC2></CounterCC2>
    </>
}