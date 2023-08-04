import React, { useEffect, useState } from "react"
import { Nav } from "./Nav"
import { PageComponents } from "./Pages"
import { PageId, allPages } from "../setting"

export const App = () => {
    let pageIdDefault: PageId =  window.location.hash.replace(/^#/,'') as PageId;
    if (!allPages.includes(pageIdDefault)) {
        pageIdDefault = allPages[0];
    }
    const [pageId, setpageId] = useState<PageId>(pageIdDefault)   

    useEffect(() =>{
        window.location.hash = pageId;
    },[pageId])
    
    const PageComponent = PageComponents[pageId]

    return <>
        <Nav pageId={pageId} onPageChange={setpageId}></Nav>
        <PageComponent />
    </>
}



