import React, { Fragment } from "react"

export const ImagesPage = () => {

    const ids = [1, 2, 3]

    return <>
        {ids.map((n) =>
            <Fragment key={n} >
                <img src={`images/${n}.png`} />
                <br />
            </Fragment>
        )}
    </>
}