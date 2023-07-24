export const settings = {
  pages: {
    index: {
      title: "我觉得这里是火锅标题",
      h1: "火锅是什么？",
      name: "返回主页",
    },
    page2: {
      title: "震撼！火锅如此之香的原因大揭秘！",
      h1: "冲击性真相",
      name: "恁香？",
    },
    hotpot: {
      title: "火锅在这里塞满了很多锅图",
      h1: "龙娘不色图",
      name: "锅图",
    },
    table: {
      title: "这里是讨论火锅相关的表格",
      h1: "风味火锅",
      name: "锅类",
    },
    love: {
      title: "美味火锅大集合",
      h1: "火锅风味",
      name: "爽锅",
    },
  },
};

export type PageId = keyof typeof settings.pages;
export const allPages = Object.keys(settings.pages) as PageId[];
