import React from "react"

const buttons1 = [
    ['AC', '+/-', '%', '/'],
]

const buttons2 = [
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
]

const buttons3 = [
    ['0', '.', '=']
]

export const Calculator = () => {


    const [display, setDisplay] = React.useState<string>("0")
    const [acc, setAcc] = React.useState<null | string>(null)
    const [op, setOp] = React.useState<null | string>(null)
    const [result, setResult] = React.useState<null | string>(null)

    function toDecimal(x: number) {
        const num = x.toFixed(4)
        return String(num)
    }

    function ButtonSetting(button: string) {
        if (button === 'AC') {
            setDisplay("0")
            setAcc(null)
            setOp(null)
            return
        }

        if (button === '+/-') {
            setDisplay(eval(`${display} ${'*'} ${'-1'}`))

            return
        }

        if (button === '%') {
            setDisplay(String(toDecimal(eval(`${display} ${'*'} ${'0.01'}`))))
            return
        }

        if ("0123456789.".indexOf(button) > -1) {

            if (result !== null) {
                setResult(null)
                return setDisplay(button)

            }


            if (display === "0") {
                if (button === '.') {
                    setDisplay('0.')
                } else {
                    setDisplay(button)
                }

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
                const result = toDecimal(eval(`${acc} ${op} ${display}`))
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
            console.log((`${acc} ${op} ${display}`))
            setDisplay(toDecimal(eval(`${acc} ${op} ${display}`)))
            setResult(display)
            setAcc(null)
            setOp(null)
        }




    }

    return <div className="calc">

        <div className="display">{display}</div>

        {
            buttons1.map((row, i) => {
                return <div className="buttons1" key={'d' + i}>
                    {
                        row.map((button, j) => {
                            return <button key={'b' + j} onClick={() => {
                                ButtonSetting(button)
                            }}>{button}
                            </button>
                        })
                    }
                </div>
            }
            )
        }

        {
            buttons2.map((row, i) => {
                return <div className="buttons2" key={'d' + i}>
                    {
                        row.map((button, j) => {
                            return <button key={'b' + j} onClick={() => {
                                ButtonSetting(button)
                            }}>{button}
                            </button>
                        })
                    }
                </div>
            }
            )
        }



        {
            buttons3.map((row, i) => {
                return <div className="buttons3" key={'d' + i}>
                    {
                        row.map((button, j) => {

                            return <button key={'b' + j} onClick={() => {
                                ButtonSetting(button)
                            }}>{button}</button>

                        })
                    }
                </div>
            }
            )
        }
    </div>
}

