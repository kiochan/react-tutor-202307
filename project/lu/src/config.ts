export const settings = {  pages: {
    Home: {
      title: "一个高难人的自言自语",
      h1: "个人主页",
      name: "个人主页",
    },
    SelfIntroduction: {
      title: "一个高难人的自言自语——高难启程",
      h1: "高难启程",
      name: "高难启程",
    },
    Photo: {
      title: "一个高难人的自言自语——照片展示",
      h1: "照片展示",
      name: "照片展示",
    },
    Hobbies: {
      title: "一个高难人的自言自语——兴趣爱好",
      h1: "兴趣爱好",
      name: "兴趣爱好",
    },
    ContactInf: {
      title: "一个高难人的自言自语——如何勾搭",
      h1: "如何勾搭",
      name: "如何勾搭",
    },
  },
};

export type PageId = keyof typeof settings.pages;
export const pageNamesArray = Object.keys(settings.pages) as PageId[];
export const allPages = pageNamesArray;
