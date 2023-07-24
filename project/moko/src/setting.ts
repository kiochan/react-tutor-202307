export const settings = {
  site: {
    name: "妹红的主页",
  },
  pages: {
    index: {
      title: "这是妹红的主页",
      name: "主页",
    },
    photo: {
      title: "妹红的照片",
      name: "照片",
    },
    funtime: {
      title: "妹红的勾搭页面",
      name: "勾搭",
    },
    infor: {
      title: "妹红的详细说明",
      name: "说明",
    },
    interest: {
      title: "妹红的爱好",
      name: "兴趣",
    },
  },
};

export type PageId = keyof typeof settings.pages;
export const allPages = Object.keys(settings.pages) as PageId[];
