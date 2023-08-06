import React, { useEffect } from "react"


const buttons1 =[
    ['C','+/-','%','/'],
]
const buttons2 = [


    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    [null, '0', '.', '=']
]


export const Calculator = () =>{
    const [display, setDisplay] = React.useState<string>("0")
    const [acc, setAcc] = React.useState<null | string>(null)
    const [op, setOp] = React.useState<null | string>(null)






    return <div className="calc" >
    <div className="display">{display}</div>
   
    {
        buttons1.map((row, i) => {
            return <div className="buttons1" key={'d' + i}>
                {
                    row.map((button, j) => {
                        return <button key={'b' + j} onClick={() => {
                                (button)
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


                        if (button === null) {
                            return <button key={'b' + j} className="invisible">X</button>
                        } else {
                            return <button key={'b' + j} onClick={() => {
                                (button)
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

