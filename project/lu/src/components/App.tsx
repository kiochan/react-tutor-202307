import React, { useState } from "react"
import { Nav } from "./Nav"
import { pages } from "../pages"
import { PageId } from "../config"

export const App = () => {
    const [pageId, setPageId] = useState<PageId>("page1")
    const PageComponent = pages[pageId]

    return <>
        <Nav pageId={pageId} onPageChange={setPageId}></Nav>
        <PageComponent />
        {
            pageId !== "page1"
                ? (<div className="link">
                    <ul>
                    <a onClick={() => setPageId('page1')}>上一页：</a>
                    <a onClick={() => setPageId('page1')}>返回主页</a>
                    <a onClick={() => setPageId('page1')}>下一页：照片展示</a>
                    </ul>
                </div>
                )
                :   <div className="link">
                        <a onClick={() => setPageId('page2')}>
                            下一页：高难启程
                        </a>
                    </div>
        }
    </>
}



