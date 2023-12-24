## 电脑常用设置

### 把cmd的输出设置设置为UTF-8

1. 打开regedit
2. 找到`计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Command Processor`
3. 右键，新建字符串值
4. 新建一个名字为Autorun，数据值为`chcp 65001 > nul`