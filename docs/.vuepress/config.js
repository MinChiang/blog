module.exports = {
  title: "技术博客",
  description: "专业讨论技术网站",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    logo: 'logo.png',
    sidebarDepth: 2,
    nav: [
      { text: "首页", link: "/" },
      { text: "技术", link: "/technology/" },
      { text: "杂谈", link: "/chat/" },
      { text: "关于我", link: "/about/" }
    ],
    sidebar: {
      '/technology/': [
        '',
        'java_basis',
        'jvm',
        'frame_components',
        'database',
        'computer',
        'data_structure',
        'algorithm',
        'bigdata',
        'other'
      ],
      '/chat/': [
        ''
      ],
      '/about/': [
        ''
      ],
      '/': [
        ''
      ]
    }
  },
};
