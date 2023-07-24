import React, { useEffect } from "react"
import { PageId, allPages, settings } from "../config"


export interface NavProps {
    pageId: PageId
    onPageChange: (page: PageId) => void
}

export const Nav = (props: NavProps) => {
    const { name, title, h1 } = settings.pages[props.pageId]

    useEffect(() => {
        document.title = title;
    }, [title])

    return <nav>
        <h1>{h1}</h1>
        <ul>
            {
                allPages
                    .filter((pageId) => pageId !== 'index')
                    .map((pageId) => {
                        const { name } = settings.pages[pageId]
                        return <li key={pageId}>
                            <a onClick={() => props.onPageChange(pageId)}>{name}</a>
                        </li>
                    })

            }
        </ul>
        <span>&gt;</span>
    </nav>

}