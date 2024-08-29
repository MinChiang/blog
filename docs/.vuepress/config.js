module.exports = {
  title: "MinChiang的博客",
  description: "专业讨论技术网站",
  head: [["link", { rel: "icon", href: "/icon/favicon16.ico" }]],
  dest: "./blog",
  markdown: {
    lineNumbers: true,
    extendMarkdown: (md) => {
      md.use(require("markdown-it-disable-url-encode"));
    },
  },
  themeConfig: {
    logo: "/images/doge.png",
    sidebarDepth: 2,
    displayAllHeaders: false,
    smoothScroll: true,
    activeHeaderLinks: true,
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
            { title: "测试", path: "test" },
            { title: "框架组件", path: "frame_components" },
            { title: "数据库", path: "database" },
            { title: "计算机基础", path: "computer" },
            { title: "数据结构", path: "data_structure" },
            { title: "算法", path: "algorithm" },
            { title: "领域驱动模型", path: "ddd" },
            { title: "设计模式", path: "design_pattern" },
            { title: "vim", path: "vim" },
            { title: "业务", path: "business" },
            { title: "工具", path: "tools" },
            { title: "其他", path: "other" },
            { title: "Python", path: "python" },
            { title: "Go", path: "go" },
            { title: "Csharp", path: "csharp" },
            { title: "输入法", path: "input" },
            { title: "环境搭建", path: "enviroment" },
            { title: "前端", path: "front_end" },
            { title: "面试", path: "interview" },
            { title: "Terraform", path: "terraform" },
            { title: "大数据", path: "bigdata" },
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
