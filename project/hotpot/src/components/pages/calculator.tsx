import React from "react";

const button = [
    [7, 8, 9, "/"],
    [4, 5, 6, '*'],
    [1, 2, 3, "-"],
    [0, ".", '=', '+'],
    [null, null, null, "AC"]
]

export const Calculator = () => {
    return <p className="calc">
        <span></span>
        {
            button.map((row, i) => {
                return <div key={i}>
                    {
                        row.map((button, j) => {
                            if (button === null) {
                                return null
                            } else {
                                return <button key={j}>{button}</button>
                            }
                        })
                    }
                </div>
            })
        }
    </p>
}
