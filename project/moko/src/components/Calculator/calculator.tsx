import React, { useEffect } from "react"

const buttons = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", '*'],
    ["1", "2", "3", '-'],
    ["0", '.', '=', '+'],
    [null, null, null, 'AC']
]

export const Calculator = () => {
    const [display, setDisplay] = React.useState<string>("0")
    const [acc, setAcc] = React.useState<null | string>(null)
    const [op, setOp] = React.useState<null | string>(null)

    function buttonClick(button: string) {
        if (button === 'AC') {
            setDisplay("0")
            setAcc(null)
            setOp(null)
            return
        }
        if ("0123456789.".indexOf(button) > -1) {
            if (display === "0") {
                setDisplay(button)
            } else {
                if (button === ".") {
                    if (display.indexOf(".") > -1) {
                        return
                    }
                }
                setDisplay((str) => str + button)
            }
            return
        }
        if ("+-*/".indexOf(button) > -1) {
            if (acc !== null) {
                const result = String(eval(`${acc} ${op} ${display}`))
                setAcc(result)
            } else {
                setAcc(display)
            }
            setDisplay("0")
            setOp(button)
            return
        }
        if (button === "=") {
            if (op === null) return
            const result = String(eval(`${acc} ${op} ${display}`))
            setDisplay(result)
        }
    }



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
