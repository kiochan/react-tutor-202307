import React, { useState } from "react"
import { Nav } from "./Nav"
import { PageComponents } from "./pages"
import { PageId } from "../settings"

export const App = () => {
    const [pageId, setPageId] = useState<PageId>("home")

    const PageComponent = PageComponents[pageId]

    return <>
        <Nav pageId={pageId} onPageChange={setPageId}></Nav>
        <PageComponent />
    </>
}
