import React, { useEffect, useState } from "react"
import { Nav } from "./Nav"
import { pageNamesArray } from "../config"
import { pages } from "../pages"
import { settings, allPages, PageId } from "../config"


export const App = () => {
    let pageIdDefault: PageId = window.location.hash.replace(/^#/, '') as PageId

    if (!allPages.includes(pageIdDefault)) {
        pageIdDefault = allPages[0]
    }

    const [pageIndex, setPageIndex] = useState<number>(allPages.indexOf(pageIdDefault))
    const pageId = pageNamesArray[pageIndex]

    useEffect(() => {
        const listener = function (e: PopStateEvent) {
            let pageIdDefault: PageId = window.location.hash.replace(/^#/, '') as PageId
            if (!allPages.includes(pageIdDefault as PageId)) {
                pageIdDefault = allPages[0]
            }
            setPageIndex(allPages.indexOf(pageIdDefault))
        }
        window.addEventListener("popstate", listener, false);

        return () => {
            window.removeEventListener("popstate", listener)
        }
    }, [])

    useEffect(() => {
        window.location.hash = pageId
    }, [pageId])

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
