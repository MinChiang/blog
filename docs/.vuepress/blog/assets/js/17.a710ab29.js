(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{473:function(s,a,t){s.exports=t.p+"assets/img/更换pip下载包路径.489eabbd.jpg"},474:function(s,a,t){s.exports=t.p+"assets/img/pycharm启动参数调整.0e34c70e.jpg"},507:function(s,a,t){"use strict";t.r(a);var e=t(25),n=Object(e.a)({},(function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h2",{attrs:{id:"安装与环境搭建"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装与环境搭建"}},[s._v("#")]),s._v(" 安装与环境搭建")]),s._v(" "),e("ul",[e("li",[e("p",[s._v("先下载对应的安装包："),e("a",{attrs:{href:"https://www.python.org/downloads/windows/",target:"_blank",rel:"noopener noreferrer"}},[s._v("下载地址"),e("OutboundLink")],1)])]),s._v(" "),e("li",[e("p",[s._v("对应安装，然后在环境变量Path中添加安装路径")])]),s._v(" "),e("li",[e("p",[s._v("修改pip默认包的下载路径")]),s._v(" "),e("ul",[e("li",[e("p",[s._v("使用以下命令获取默认安装路径：")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("python -m site\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("展示若如下：")]),s._v(" "),e("p",[e("img",{attrs:{src:t(473),alt:"更换pip下载包路径"}})])]),s._v(" "),e("li",[e("p",[s._v("则需要更换pip的安装包路径")])]),s._v(" "),e("li",[e("p",[s._v("修改"),e("strong",[s._v("D:\\tools\\python\\python-3.7.0\\lib\\site.py")])]),s._v(" "),e("div",{staticClass:"language-textile line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-textile"}},[e("code",[e("span",{pre:!0,attrs:{class:"token phrase"}},[e("span",{pre:!0,attrs:{class:"token list"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("#")]),s._v(" USER_SITE = None")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token list"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("#")]),s._v(" USER_BASE = None")]),s._v('\nUSER_SITE = "D:\\\\tools\\\\python\\\\site-packages"\nUSER_BASE = "D:\\\\tools\\\\python\\\\Scripts"\n')])])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br")])])])])]),s._v(" "),e("li",[e("p",[s._v("更改pip镜像源")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("pip config "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" global.index-url https://pypi.tuna.tsinghua.edu.cn/simple\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("venv虚拟环境")]),s._v(" "),e("ul",[e("li",[e("p",[s._v("安装venv虚拟环境")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("python3 -m venv venv\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("激活虚拟环境")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" ."),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("venv"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("Scripts\nactivate\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("退出虚拟环境")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" ."),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("venv"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("Scripts\ndeactivate\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("删除venv虚拟环境：直接删除对应的venv文件夹即可")])])])]),s._v(" "),e("li",[e("p",[s._v("pipreqs使用")]),s._v(" "),e("ul",[e("li",[e("p",[s._v("安装pipreqs库")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("pip "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" pipreqs\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("生成对应的"),e("strong",[s._v("requirements.txt")]),s._v("文件")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("pipreqs ./ --encoding"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("utf8 --force\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("输出时会扫描对应用到的包，只有依赖的包才会进入requirements.txt文件中")])]),s._v(" "),e("li",[e("p",[s._v("如果需要从"),e("strong",[s._v("requirements.txt")]),s._v("中安装内容")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("pip "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" -r ."),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("requirements.txt\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])])])]),s._v(" "),e("li",[e("p",[s._v("pycharm启动参数调整")]),s._v(" "),e("ul",[e("li",[e("p",[s._v("如果是使用pythom -m xxx启动应用，则需要在Configuration中调整为Module name启动")])]),s._v(" "),e("li",[e("p",[s._v("windows下需要添加-X utf8启动，否则会出现读取文件失败的情况")])])]),s._v(" "),e("p",[e("img",{attrs:{src:t(474),alt:"pycharm启动参数调整"}})])])])])}),[],!1,null,null,null);a.default=n.exports}}]);