import React, { useState } from "react"
import { Nav } from "./Nav"
import { PageComponents } from "./pages"
import { PageId } from "../setting"

export const App = () => {
    const [pageId, setpageId] = useState<PageId>("index")
    const PageComponent = PageComponents[pageId]

    return <>
        <Nav pageId={pageId} onPageChange={setpageId}></Nav>
        <PageComponent />
    </>
}



