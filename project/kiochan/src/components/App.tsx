import React from "react"
import { Nav } from "./Nav"
import { PageComponents } from "./pages"
import { returnDefaultIfNotInPages } from "./utils/returnDefaultIfNotInPages"
import { useRouter } from "../hooks/useRouter"
import { PageId } from "../settings"

interface AppProps {
    defaultPageId?: string
}

export const App = (props: AppProps) => {
    const [path, setPath] = useRouter(props.defaultPageId) // side effect 副作用

    const pageId = returnDefaultIfNotInPages(path)

    const PageComponent = PageComponents[pageId]

    return <>
        <Nav pageId={pageId} onPageChange={setPath as (pageId: PageId) => void}></Nav>
        <PageComponent />
    </>
}
