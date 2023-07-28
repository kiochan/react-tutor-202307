import React from "react"
import { Nav } from "./Nav"
import { PageComponents } from "./pages"
import { returnDefaultIfNotInPages } from "./utils/returnDefaultIfNotInPages"
import { useRouter } from "../hooks/useRouter"

export const App = () => {
    const [hash, setHash] = useRouter() // side effect 副作用

    const pageId = returnDefaultIfNotInPages(hash)

    const PageComponent = PageComponents[pageId]

    return <>
        <Nav pageId={pageId} onPageChange={setHash}></Nav>
        <PageComponent />
    </>
}
