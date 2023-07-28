import { PageId, allPages } from "../../settings";

/**
 * 如果pageId不在allPages中，返回allPages[0]
 * @param pageId 页面名
 * @returns 页面名 如果不存在则返回默认值
 */
export function returnDefaultIfNotInPages(pageId: string): PageId {
  if (!allPages.includes(pageId as PageId)) {
    return allPages[0];
  }
  return pageId as PageId;
}
