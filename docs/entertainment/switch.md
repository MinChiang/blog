## 构建整合包

### 事前准备工作

1. 一张大容量的TF卡，实时证明128G还是有点小，最好256G起步
2. 用DiskGenius把TF格式化为FAT32，簇大小默认就好
3. 需要一点翻墙的手段，毕竟要下载一些东西

### 通过DeepSea直接下载整合包（不推荐）

1. 下载对应的整合包：[Team-Neptune/DeepSea](https://github.com/Team-Neptune/DeepSea)，直接选择Release中的advanced版本即可
2. 解压后直接放入TF卡根目录，并将hekate_ctcaer_x.x.x.bin改名为payload.bin
3. 把TF卡插入电脑中，直接运行即可

### 通过SdSetup自定义整合包（推荐）

2. 通过[SdSetup](https://www.sdsetup.com/console?switch)制定对应的整合包，一般来说需要进行整合定制，推荐使用**Recommended Defaults**即可
3. 将 sd 卡里面的内容全部复制到 TF 卡根目录，里面有`sd`和`payloads`两个目录
	- 如果是硬破机器：将 payloads 中 `hekate_ctcaer_x.x.x.bin` 更名成 `payload.bin` 放入 TF 卡根目录，因为硬破机器会优先读取TF卡里面的`payload.bin`文件
	- 如果是软破机器：需要用TegraRcmGUI进行启动注入

## 下载安装Sigpatch

1. 通过[Sigpatch](https://sigmapatches.coomer.party/)下载对应的包，把其中的内容全部复制到对应的上述根目录文件夹中
2. 注意需要覆盖一些文件，直接全部覆盖即可

## 备份重要的文件（如果已经做过可忽略）

1. 进入hekate选择`Tools->Backup eMMC`
2. 备份 `eMMC BOOT0 & BOOT1`
3. 备份 `eMMC RAW GPP`，这个需要等待比较长的时间，一般来说要30分钟
4. 进入hekate选择Payloads，使用`Lockpick_RCM.bin`，选择`Dump from SysNAND`
5. 拔出TF卡，插入电脑，然后在switch文件夹下复制prod.keys到本地电脑，复制backup/xxxxxxx/中所有内容

## 制作虚拟系统（如果已经做过可忽略）

1. 进入真实系统`Launch -> Stock (SYSNAND)`
2. 删除对应的wifi，保证机器不联网
3. 进入hekate，选择`emuMMC->Create emuMMC->SD File`
4. 进入Launch菜单，有4个选项：
	-   **Stock (SYSNAND)：** 从机身内部的eMMC启动系统，不加载破解，也就是真实系统
	-   **CFW (SYSNAND)：** 从机身内部的eMMC启动系统，加载破解，不建议选择这一项，非常容易被 ban
	-   **CFW (EMUMMC)：** 从TF卡的虚拟系统启动，加载破解，也就是虚拟系统，建议用此进入虚拟系统
	-   **Fusee：** 使用大气层 payload 引导，从TF卡的虚拟系统启动，加载破解，也就是大气层引导的虚拟系统

## 刷入固件

1. 下载[固件](https://darthsternie.net/switch-firmwares/)，下载对应的固件并且放入TF卡
2. 打开相册，打开Daybreak，选择对应的固件文件夹，确定即可
   - 选择保留设置
   - 选择格式化为fat32

## 精简系统（虚拟系统）

1. 进入hekate选择Payloads，使用`Lockpick_RCM.bin`，选择`Dump from EmuNAND`，注意不要选错选项了，下面的keyset有误一般都是这里选错选项
3. 拔出TF卡，插入电脑，然后在switch文件夹下复制prod.keys到本地电脑
4. 下载[NxNandManager](https://github.com/eliboa/NxNandManager)
5. 选择`File -> Open File`，选择TF卡里面的`/emuMMC/SD0/eMMC`下的00文件
6. 选择`Options -> Configure keyset -> Import keys from file`，导入对步骤1所导出的prod.keys
7. 选择`Tools -> Resize NAND`，勾选Format USER，New size for USER填2048MB，自定义填写Output file，点击确定
8. 通过NxNandManager重新打开刚才导出的resized文件，在Partitions中选择PRODINFO中，点击wipe personal清除序列号信息
9. 选择`File -> Save as(advanced)`，勾选Split output，设置大小为4000MB，设置导出路径，导出完之后把RAWNAND.bin.xxx改名为00，01，02，以此类推
10. 把原来的tf卡中的`/emuMMC/SD00/eMMC`重命名为eMMC_bak，新建eMMC文件夹，把刚才的00，01，02...所有文件拷贝进来，再复制eMMC_bak里面的BOOT0和BOOT1文件到eMMC文件夹中
11. 开机查看使用内存
11. 如果无误后，删除eMMC_bak文件夹

## 后续的一些补充操作

- 删除/隐藏虚拟系统的序列号：复制atmosphere/config_templates/exosphere.ini到根目录下，并且修改exosphere.ini文件内容，把`blank_prodinfo_emummc`改为1
- block任天堂的请求地址
  - 把`/atmosphere/config_templates/system_settings.ini`拷贝到`/atmosphere/config`中，取消 `enable_dns_mitm = u8!0x1` 前的注释
  - 打开`/atmosphere/hosts`文件夹，如果不存在直接创建即可
  - 下载[emummc.txt](https://nh-server.github.io/switch-guide/files/emummc.txt)文件并放在`/atmosphere/hosts`里面
  - 启动机器，查看`/atmosphere/logs/dns_mitm_startup.log`，如果有对应**Redirections xxx.nintendo.xxx -> xxx**，说明成功
  - 详情可以见：[NH Switch Guide](https://nh-server.github.io/switch-guide/extras/blocking_nintendo/)
- 游戏渠道：建议不要去破解游戏论坛里面下载，里面的好多需要回帖付费，直接去淘宝花10块钱买个百度网盘内容分享地址，全游戏下载美滋滋

## 一些其他的软件

- 下载 [ITotalJustice/patches](https://github.com/ITotalJustice/patches)，直接解压到根目录，这样才能运行破解游戏
- [dbi](https://github.com/rashevskyv/dbi)，可以直接从电脑直接安装游戏
- [Awoo-Installer](https://github.com/Huntereb/Awoo-Installer)，安装器
- [NxNandManager](https://github.com/eliboa/NxNandManager)，可以修改对应的分区大小
- [Switch_90DNS_tester](https://github.com/meganukebmp/Switch_90DNS_tester)，判断当前系统是否有block任天堂的地址
- [Tinfoil](https://tinfoil.io/Download)，从多个渠道安装游戏
- [N中文数据整理](https://shimo.im/sheets/m5kv9zpQ6Dha82qX/MODOC)，直接使用文档下载游戏（需要配合百度网盘）
- 一些教程：https://www.marsshen.com/posts/20e16ead/

## 其他

- 关于Tesla特斯拉插件的使用：同时按L + 左摇杆下 + 右摇杆中间即可唤出
- sys-clk的使用：可以进行超频使用，推荐修改在底座模式下的参数

