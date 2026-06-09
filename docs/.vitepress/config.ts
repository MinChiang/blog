import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "MinChiang的博客",
  description: "专业讨论技术网站",
  ignoreDeadLinks: true,
  head: [["link", { rel: "icon", href: "/icon/favicon16.ico" }]],
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    logo: "/images/doge.png",
    nav: [
      { text: "首页", link: "/" },
      { text: "技术", link: "/technology/java_basis" },
      { text: "旅游", link: "/travel/shantou" },
      { text: "杂谈", link: "/chat/develop_experience" },
      { text: "娱乐", link: "/entertainment/switch" },
      { text: "关于", link: "/about/introduce" },
    ],
    sidebar: {
      "/technology/": [
        {
          text: "技术",
          collapsed: false,
          items: [
            { text: "Java基础", link: "/technology/java_basis" },
            { text: "JVM", link: "/technology/jvm" },
            { text: "测试", link: "/technology/test" },
            { text: "框架组件", link: "/technology/frame_components" },
            { text: "数据库", link: "/technology/database" },
            { text: "计算机基础", link: "/technology/computer" },
            { text: "数据结构", link: "/technology/data_structure" },
            { text: "算法", link: "/technology/algorithm" },
            { text: "领域驱动模型", link: "/technology/ddd" },
            { text: "设计模式", link: "/technology/design_pattern" },
            { text: "vim", link: "/technology/vim" },
            { text: "业务", link: "/technology/business" },
            { text: "工具", link: "/technology/tools" },
            { text: "其他", link: "/technology/other" },
            { text: "Python", link: "/technology/python" },
            { text: "Go", link: "/technology/go" },
            { text: "Csharp", link: "/technology/csharp" },
            { text: "输入法", link: "/technology/input" },
            { text: "环境搭建", link: "/technology/environment" },
            { text: "前端", link: "/technology/front_end" },
            { text: "面试", link: "/technology/interview" },
            { text: "Terraform", link: "/technology/terraform" },
            { text: "大数据", link: "/technology/bigdata" },
            { text: "网络", link: "/technology/network" },
          ],
        },
      ],
      "/travel/": [
        {
          text: "旅游",
          collapsed: false,
          items: [
            { text: "蜜月旅行", link: "/travel/honeymoon_trip" },
            { text: "汕头南澳", link: "/travel/shantou" },
            { text: "普宁", link: "/travel/puning" },
            { text: "潮州", link: "/travel/chaozhou" },
          ],
        },
      ],
      "/chat/": [
        {
          text: "杂谈",
          collapsed: false,
          items: [
            { text: "开发心得", link: "/chat/develop_experience" },
            { text: "座右铭", link: "/chat/motto" },
          ],
        },
      ],
      "/entertainment/": [
        {
          text: "娱乐",
          collapsed: false,
          items: [{ text: "switch游戏", link: "/entertainment/switch" }],
        },
      ],
      "/about/": [
        {
          text: "关于",
          collapsed: false,
          items: [
            { text: "自我介绍", link: "/about/introduce" },
            { text: "未来规划", link: "/about/future" },
            { text: "联系方式", link: "/about/contact" },
          ],
        },
      ],
    },
    outline: {
      level: [2, 3],
    },
  },
  srcExclude: ["**/draw/**"],
})
