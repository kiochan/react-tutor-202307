import React, { useEffect } from "react"
import { PageId, allPages, settings } from "../setting"


export interface NavProps {
    pageId: PageId
    onPageChange: (page: PageId) => void
}

export const Nav = (props:NavProps) => {
    const { name, title } = settings.pages[props.pageId]

    useEffect(()=>{
        document.title = name;
    },[title])

    return <nav>
    <h1>{name}</h1>
    <ul>
        {
            allPages
                .map((pageId) => {
                    const { name } = settings.pages[pageId]
                    if (props.pageId === pageId) {
                        return <li>
                            <strong>
                                <a onClick={() => props.onPageChange(pageId)}>{name}</a>
                            </strong>
                        </li>
                    } else {

                        return <li>
                            <a onClick={() => props.onPageChange(pageId)}>{name}</a>
                        </li>
                    }
                })
        }
    </ul>
</nav>
    
}