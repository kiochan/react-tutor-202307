import React, { useState } from "react"
import { Nav } from "./Nav"
import { pages } from "../pages"
import { PageId } from "../config"

export const App = () => {
    const [pageId, setPageId] = useState<PageId>("index")
    const PageComponent = pages[pageId]

    return <>
        <Nav pageId={pageId} onPageChange={setPageId}></Nav>
        <PageComponent />
        {
            pageId !== "index"
                ? (
                    <a onClick={() => setPageId('index')}>
                        返回主页
                    </a>
                )
                : null
        }
    </>
}



