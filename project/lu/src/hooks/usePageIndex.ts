import { useEffect, useState } from "react";
import { PageId, allPages, pageNamesArray } from "../config";

export const usePageIndex = () => {
  let pageIdDefault: PageId = window.location.hash.replace(/^#/, "") as PageId;

  if (!allPages.includes(pageIdDefault)) {
    pageIdDefault = allPages[0];
  }

  const [pageIndex, setPageIndex] = useState<number>(
    allPages.indexOf(pageIdDefault)
  );

  useEffect(() => {
    const listener = function (e: PopStateEvent) {
      let pageIdDefault: PageId = window.location.hash.replace(
        /^#/,
        ""
      ) as PageId;
      if (!allPages.includes(pageIdDefault as PageId)) {
        pageIdDefault = allPages[0];
      }
      setPageIndex(allPages.indexOf(pageIdDefault));
    };
    window.addEventListener("popstate", listener, false);

    return () => {
      window.removeEventListener("popstate", listener);
    };
  }, []);

  const pageId = pageNamesArray[pageIndex];

  useEffect(() => {
    window.location.hash = pageId;
  }, [pageId]);

  return [pageIndex, setPageIndex] as const;
};
