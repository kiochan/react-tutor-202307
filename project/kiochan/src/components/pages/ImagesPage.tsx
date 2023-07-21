import React from "react"

export const ImagesPage = () => {

    const ids = [1, 2, 3]

    return <>
        {ids.map((n) =>
            <>
                <img key={n} src={`images/${n}.png`} />
                <br key={String(n) + 'br'} />
            </>
        )}
    </>
}