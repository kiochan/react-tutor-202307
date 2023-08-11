import { PageId } from "../../setting";
import { Calculatorpage } from "./calculater";
import { FunTimePage } from "./funtime";
import { HomePage } from "./home";
import { InforPage } from "./infor";
import { interestpage } from "./interest";
import { Photopage } from "./photo";


export const PageComponents: Record<PageId, () => JSX.Element> = {
    index: HomePage,
    funtime: FunTimePage,
    infor: InforPage,
    interest: interestpage,
    photo: Photopage,
    calculator:Calculatorpage
}