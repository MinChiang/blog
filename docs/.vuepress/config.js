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
      { text: "旅游", link: "/travel/shantou" },
      { text: "杂谈", link: "/chat/develop_experience" },
      { text: "娱乐", link: "/entertainment/switch" },
      { text: "关于", link: "/about/now" },
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
            { title: "编程思想", path: "thinking" },
            { title: "大数据", path: "bigdata" },
            { title: "业务", path: "business" },
            { title: "Python", path: "python" },
            { title: "工具", path: "tools" },
            { title: "其他", path: "other" },
          ],
        },
      ],
      "/travel/": [
        {
          title: "旅游",
          collapsable: false,
          children: [
            { title: "汕头南澳", path: "shantou" },
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
      "/entertainment/": [
        {
          title: "娱乐",
          collapsable: false,
          children: [
            { title: "switch游戏", path: "switch" },
          ],
        },
      ],
      "/about/": [
        {
          title: "关于",
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
