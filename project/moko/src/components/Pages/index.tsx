import { PageId } from "../../setting";
import { funtimepage } from "./funtimepage";
import { HomePage } from "./home";
import { inforpage } from "./inforpage";
import { interestpage } from "./interestpage";
import { photopage } from "./photopage";


export const PageComponents: Record<PageId, () => JSX.Element> = {
    index:HomePage,
    funtime:funtimepage,
    infor:inforpage,
    interest: interestpage,
    photo:photopage 
}