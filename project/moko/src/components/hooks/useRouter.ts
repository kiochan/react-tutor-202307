import { useState, useEffect, useCallback } from "react";
import { PageId, allPages } from "../../setting";

export function useRouter():[string, (newState:string) => void] {
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

