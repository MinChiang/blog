module.exports = {
  title: "MinChiang的博客",
  description: "专业讨论技术网站",
  head: [["link", { rel: "icon", href: "/icon/favicon16.ico" }]],
  markdown: {
    lineNumbers: true,
    extendMarkdown: (md) => {
      md.use(require("markdown-it-disable-url-encode"));
    },
  },
  themeConfig: {
    logo: "/images/logo.png",
    sidebarDepth: 2,
    displayAllHeaders: true,
    smoothScroll: true,
    nav: [
      { text: "首页", link: "/" },
      { text: "技术", link: "/technology/java_basis" },
      { text: "杂谈", link: "/chat/develop_experience" },
      { text: "关于我", link: "/about/now" },
    ],
    sidebar: {
      "/technology/": [
        {
          title: "技术",
          collapsable: false,
          children: [
            { title: "Java基础", path: "java_basis" },
            { title: "JVM", path: "jvm" },
            { title: "框架组件", path: "frame_components" },
            { title: "数据库", path: "database" },
            { title: "计算机基础", path: "computer" },
            { title: "数据结构", path: "data_structure" },
            { title: "算法", path: "algorithm" },
            { title: "大数据", path: "bigdata" },
            { title: "其他", path: "other" },
          ],
        },
      ],
      "/chat/": [
        {
          title: "杂谈",
          collapsable: false,
          children: [
            { title: "开发心得", path: "develop_experience" },
            { title: "座右铭", path: "motto" },
          ],
        },
      ],
      "/about/": [
        {
          title: "关于我",
          collapsable: false,
          children: [
            { title: "现在", path: "now" },
            { title: "将来", path: "future" },
            { title: "联系方式", path: "contact" },
          ],
        },
      ],
    },
  },
  plugins: [
    [
      "@vuepress/medium-zoom",
    ],
    [
      "@vuepress/back-to-top"
    ],
    [
      "@vuepress/active-header-links"
    ]
  ],
};
