import React, { useCallback, useEffect, useState } from "react"
import { Nav } from "./Nav"
import { PageComponents } from "./Pages"
import { PageId, allPages } from "../setting"

function useRouter():[string, (newState:string) => void] {
    const original: string =  window.location.hash.replace(/^#/,'') 
    const [hash, setHash] = useState(original)


    useEffect(() =>{
        window.addEventListener("popstate",function(event){
            const hash= window.location.hash.replace(/^#/,'') 
            setHash(hash)
        },false);
    },[])

    return [
        hash,
        useCallback(
            function (newState:string){
            window.location.hash = newState
            setHash(newState)
            },[window.location.hash,setHash])
    ]
}

function returnHomeIfNotInPages(pageId:string):PageId{
    if(!allPages.includes(pageId as PageId)){
        return allPages[0]
    }
    return pageId as PageId
}

export const App = () => {
    const [hash, setHash] = useRouter()
    
    const pageId = returnHomeIfNotInPages(hash)

    useEffect(() =>{
        window.addEventListener("popstate",function(event){
            let pageIdDefault:PageId = window.location.hash.replace(/^#/,'') as PageId
            if (!allPages.includes(pageIdDefault)){
                pageIdDefault=allPages[0]
            }
            setHash(pageIdDefault)
        },false);
    },[])

    const PageComponent = PageComponents[pageId];

    return <>
        <Nav pageId={pageId} onPageChange={setHash}></Nav>
        <PageComponent />
    </>
}



