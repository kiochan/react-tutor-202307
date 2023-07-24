export const settings = {
  site: {
    name: "猫娘最可爱",
  },
  pages: {
    home: {
      title: "猫娘最可爱",
      name: "主页",
    },
    images: {
      title: "猫娘色图",
      name: "色图",
    },
    details: {
      title: "详细信息",
      name: "详情",
    },
    reason: {
      title: "喜欢猫娘的原因",
      name: "原因",
    },
  },
};

export type PageId = keyof typeof settings.pages;
export const allPages = Object.keys(settings.pages) as PageId[];