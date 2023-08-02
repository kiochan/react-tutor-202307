import React, { useState,useEffect } from "react"
import { Nav } from "./Nav"
import { pages } from "../pages"
import { PageId, allPages } from "../config"

export const App = () => {
    let pageIdDefault: PageId = window.location.hash.replace(/^#/,'')  as PageId
    if( !allPages.includes (pageIdDefault)){
        pageIdDefault = allPages[0]
    }

    console .log(window.location.hash, pageIdDefault)


    const [pageId, setPageId] = useState<PageId>(pageIdDefault)

    useEffect(() => {
    window.location.hash = pageId
    },[pageId])




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



