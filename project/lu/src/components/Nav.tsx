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
        <ul>
            {
                
                allPages
                    .map((pageId) => {
                        const { name } = settings.pages[pageId]
                        if (props.pageId === pageId){
                            return <h1>{name}</h1>

                        }else{
                            return <li key={pageId}>
                            <a onClick={() => props.onPageChange(pageId)}>{name}</a>
                        </li>

                        }
                        
                    })

            }
        </ul>
    </nav>

}