import React from "react"
import { Nav } from "./Nav"
import { pageNamesArray } from "../config"
import { pages } from "../pages"
import { settings } from "../config"
import { usePageIndex } from "../hooks/usePageIndex"


export const App = () => {
    const [pageIndex, setPageIndex] = usePageIndex()

    const pageId = pageNamesArray[pageIndex];

    const indexBefore = (pageIndex - 1 + pageNamesArray.length) % pageNamesArray.length
    const indexAfter = (pageIndex + 1) % pageNamesArray.length

    const pageBefore = settings.pages[pageNamesArray[indexBefore]]
    const pageAfter = settings.pages[pageNamesArray[indexAfter]]

    const PageComponent = pages[pageId]

    return <>
        <Nav pageId={pageId} onPageChange={
            (pageId) => setPageIndex(pageNamesArray.indexOf(pageId))
        }></Nav>
        <PageComponent />
        <div className="link">
            <ul>
                <li>
                    <a onClick={() => setPageIndex(indexBefore)}>
                        上一页：{pageBefore.name}
                    </a>
                </li>
                <li>
                    <a onClick={() => setPageIndex(0)}>返回主页</a>
                </li>
                <li>
                    <a onClick={() => setPageIndex(indexAfter)}>
                        下一页：{pageAfter.name}
                    </a>
                </li>
            </ul>
        </div>
    </>
}
