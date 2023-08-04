import { PageId, allPages } from "../../setting"

export function returnHomeIfNotInPages(pageId:string):PageId{
    if(!allPages.includes(pageId as PageId)){
        return allPages[0]
    }
    return pageId as PageId
}
