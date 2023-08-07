import React, { useEffect } from "react"
import { PageId, allPages, settings } from "../settings"

export interface NavProps {
    pageId: PageId
    onPageChange: (page: PageId) => void
}

export const Nav = (props: NavProps) => {
    const { name, title } = settings.pages[props.pageId]

    // react hook
    // 每次当 props.title 变化时，都会执行这个函数
    useEffect(() => {
        document.title = title
    }, [title])

    return <nav>
        <h1>{name}</h1>
        <ul>
            {
                allPages
                    .filter((pageId) => pageId !== '404')
                    .map((pageId) => {
                        const { name } = settings.pages[pageId]
                        if (props.pageId === pageId) {
                            return <li key={pageId}>
                                <strong>
                                    <a onClick={() => props.onPageChange(pageId)}>{name}</a>
                                </strong>
                            </li>
                        } else {

                            return <li key={pageId}>
                                <a onClick={() => props.onPageChange(pageId)}>{name}</a>
                            </li>
                        }
                    })
            }
        </ul>
    </nav>
}
