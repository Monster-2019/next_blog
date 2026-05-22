/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Monster Cone Blog - 前端与独立开发笔记',
  siteName: 'Monster Cone Blog',
  author: 'Monster Cone',
  headerTitle: 'MonsterCone',

  description:
    'Monster Cone 的个人技术博客，记录前端开发、Next.js、React、Vue、TypeScript、全栈实践、独立开发项目、效率工具和生活思考。',

  language: 'zh-cn',
  locale: 'zh-CN',
  theme: 'system',

  siteUrl: 'https://www.dxin.cc',
  siteRepo: 'https://github.com/Monster-2019/next_blog',

  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.jpg`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,

  email: 'dongxin2019@gmail.com',
  github: 'https://github.com/Monster-2019',

  stickyNav: false,

  analytics: {
    googleAnalytics: {
      googleAnalyticsId: 'G-9Y72XSKM74',
    },
  },

  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'zh-CN',
    },
  },

  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata
