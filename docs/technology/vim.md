## 基本使用与安装

- 下载：[NeoVim下载地址](https://github.com/neovim/neovim/releases)
- 配置：把[Nvim配置](https://github.com/MinChiang/nvim)，通过git克隆到C:\Users\YY\AppData\Local下
- 打开NeoVim-qt.ext即可

## 一些建议和使用方法

[快捷键用法](https://vim.rtorr.com/lang/zh_cn)

![](../images/vi-vim-cheat-sheet.gif)

## 使用技巧

### 快速替换提取

```txt
attribution full link time: 【productId: 27419, hdid: f26a899f90b2dbeba68efc6c5737332a, clickId: 1049474983753142272, attributionId: 8648579, clickTime: 1670255927000, hiidoTime: 1670255928000, clickHandleTime: 1670255934429, installTime: 1670256010000, installClientTime: 1670256010000, installHandleTime: 1670256010362, attributionTime: 1670256010413, sendToKafkaTime: 1670256010461, retryAttributionCount: 0】
attribution full link time: 【productId: 25889, hdid: 91a6c8e629e85e06324014458bf9cd5d, clickId: 1049474129096581120, attributionId: 8648580, clickTime: 1670255723000, hiidoTime: 1670255724000, clickHandleTime: 1670255730663, installTime: 1670256013000, installClientTime: 1670256013000, installHandleTime: 1670256013775, attributionTime: 1670256013801, sendToKafkaTime: 1670256013838, retryAttributionCount: 0】
```

Java打印的日志格式如上，如何提取为excel的格式呢？

1. %s/.*【productId: //g
2. %s/】//g
3. %s/, \w\+: /\t/g

处理后效果如下，直接黏贴到Excel处理，加上header标题即可

```txt
27419	f26a899f90b2dbeba68efc6c5737332a	1049474983753142272	8648579	1670255927000	1670255928000	1670255934429	1670256010000	1670256010000	1670256010362	1670256010413	1670256010461	0
25889	91a6c8e629e85e06324014458bf9cd5d	1049474129096581120	8648580	1670255723000	1670255724000	1670255730663	1670256013000	1670256013000	1670256013775	1670256013801	1670256013838	0
```



### 快速给某些地方添加内容

由于之前设计的问题，`CardFigureEnum`这个类，缺少了id字段，id是从0开始，一直到12，例如：`KING(13, "KING", 2)`改为`KING(0, 13, "KING", 2)`，`QUEEN(12, "QUEEN", 3)`改为`QUEEN(1, 12, "QUEEN", 3)`，如此类推；如果用普通的方式，只能一个个去替换；如果用高级点的方式，只能从新用excel去处理；两种方法都耗费精力。

```java
public enum CardFigureEnum {
    KING(13, "KING", 2),
    QUEEN(12, "QUEEN", 3),
    JACK(11, "JACK", 4),
    TEN(10, "TEN", 5),
    NINE(9, "NINE", 6),
    EIGHT(8, "EIGHT", 7),
    SEVEN(7, "SEVEN", 8),
    SIX(6, "SIX", 9),
    FIVE(5, "FIVE", 10),
    FOUR(4, "FOUR", 11),
    THREE(3, "THREE", 12),
    TWO(2, "TWO", 0),
    ACE(1, "ACE", 1),
    ;
    
	// 省略其他无用代码
}
```

另外一种解法是通过VIM，步骤如下：

1. 打开VIM，贴入上述代码
2. 普通模式下输入:/(，先直接匹配所有的左括号
3. 普通模式下输入:let i = 0
4. 按gg使光标移动到最顶行
5. 按qx录制宏（注意从这里开始就不能随意输入内容了，到11步内，如果错一步都要从第2步重新开始）
6. 按n，找到下一个左括号，光标到达KING(的括号处
7. 按a，在左括号后输入
8. 按Ctrl+r，输入=i回车，此时自动会填充0，再输入,和空格
9. 按ESC退回普通模式
10. 输入:let i = i + 1
11. 按q完成宏
12. 按12@x，重放12次x的宏
13. 完成，效果如下图所示

```java
public enum CardFigureEnum {
    KING(0, 13, "KING", 2),
    QUEEN(1, 12, "QUEEN", 3),
    JACK(2, 11, "JACK", 4),
    TEN(3, 10, "TEN", 5),
    NINE(4, 9, "NINE", 6),
    EIGHT(5, 8, "EIGHT", 7),
    SEVEN(6, 7, "SEVEN", 8),
    SIX(7, 6, "SIX", 9),
    FIVE(8, 5, "FIVE", 10),
    FOUR(9, 4, "FOUR", 11),
    THREE(10, 3, "THREE", 12),
    TWO(11, 2, "TWO", 0),
    ACE(12, 1, "ACE", 1),
    ;
    
	// 省略其他无用代码
}
```

