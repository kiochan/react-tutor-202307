import React from "react"
import { Nav } from "./Nav"
import { PageComponents } from "./Pages"
import { PageId, allPages } from "../setting"
import { useRouter } from "./hooks/useRouter"
import { returnHomeIfNotInPages } from "./utils/aa"


export const App = () => {
    const [hash, setHash] = useRouter()
    const pageId = returnHomeIfNotInPages(hash)


    const PageComponent = PageComponents[pageId];

    return <>
        <Nav pageId={pageId} onPageChange={setHash}></Nav>
        <PageComponent />
    </>
}




