import { PageId } from "../../settings";
import { DetailsPage } from "./DetailsPage";
import { HomePage } from "./HomePage";
import { ImagesPage } from "./ImagesPage";
import { ReasonPage } from "./ReasonPage";

export const PageComponents: Record<PageId, () => JSX.Element> = {
    home: HomePage,
    images: ImagesPage,
    details: DetailsPage,
    reason: ReasonPage,
}