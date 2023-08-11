import React, { useCallback, useEffect, useMemo, useState } from "react"
import { Calculator, Operator } from "./Calculator"

const buttons = [
    [null, "%", '-/+', 'AC'],
    [7, 8, 9, "/"],
    [4, 5, 6, '*'],
    [1, 2, 3, '-'],
    [0, '.', '=', '+'],
]

export const CalculatorComponent = () => {
    const calculator = useMemo(() => {
        return new Calculator()
    }, [])

    const buttonClick = useCallback((button: string | Number) => {
        console.log(button)
        if (typeof button === 'number') {
            calculator.pushNumber(button)
        } else {
            switch (button) {
                case 'AC': calculator.setOperator(Operator.clear); break
                case '=': calculator.setOperator(Operator.equal); break
                case '+': calculator.setOperator(Operator.add); break
                case '-': calculator.setOperator(Operator.minus); break
                case '*': calculator.setOperator(Operator.multiply); break
                case '/': calculator.setOperator(Operator.divide); break
                case '.': calculator.setOperator(Operator.point); break
                case '-/+': calculator.setOperator(Operator.negate); break
                case '%': calculator.setOperator(Operator.percent); break
            }
        }

    }, [calculator])

    const [display, setDisplay] = useState(calculator.getDisplay())
    useEffect(() => {
        calculator.onDisplayChange(setDisplay)
    }, [calculator, setDisplay])

    return <div className="calc">
        <div className="display">{display}</div>
        {
            buttons.map((row, i) => {
                return <div key={'d' + i}>
                    {
                        row.map((button, j) => {
                            if (button === null) {
                                return <button key={'b' + j} className="invisible">X</button>
                            } else {
                                return <button key={'b' + j} onClick={() => {
                                    buttonClick(button)
                                }}>{button}</button>
                            }
                        })
                    }
                </div>
            }
            )
        }
    </div>
}