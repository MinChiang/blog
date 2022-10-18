## 构建整合包

### 事前准备工作

1. 一张大容量的TF卡，实时证明128G还是有点小，最好256G起步
2. 把TF格式化为FAT32

### 通过DeepSea直接下载整合包

1. 下载对应的整合包：[Team-Neptune/DeepSea](https://github.com/Team-Neptune/DeepSea)，直接选择Release中的advanced版本即可
2. 解压后直接放入TF卡根目录，并将hekate_ctcaer_x.x.x.bin改名为payload.bin
3. 把TF卡插入电脑中，直接运行即可

### 通过SdSetup自定义整合包

2. 通过[SdSetup](https://www.sdsetup.com/console?switch)制定对应的整合包，一般来说需要进行整合定制，推荐使用**Recommended Defaults**即可
3. 将 sd 卡里面的内容全部复制到 TF 卡根目录
	- 如果是硬破机器：将 payloads 中 `hekate_ctcaer_x.x.x.bin` 更名成 `payload.bin` 放入 TF 卡根目录，因为硬破机器会优先读取TF卡里面的payload.bin文件
	- 如果是软破机器：需要用TegraRcmGUI进行启动注入

## 下载安装Sigpatch

1. 通过[Sigpatch](https://sigmapatches.coomer.party/)下载对应的包，把其中的内容全部复制到对应的上述根目录文件夹中
2. 注意需要覆盖一些文件

## 备份重要的文件（如果已经做过可忽略）

1. 进入hekate选择`Tools->Backup eMMC`
2. 备份 `eMMC BOOT0 & BOOT1`
3. 备份 `eMMC RAW GPP`，这个需要等待比较长的时间，一般来说要30分钟
4. 进入hekate选择Payloads，使用`Lockpick_RCM.bin`，选择`Dump from SysNAND`
5. 拔出TF卡，插入电脑，然后在switch文件夹下复制prod.keys到本地电脑，复制backup/xxxxxxx/中所有内容

## 制作虚拟系统

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

## 后续的一些补充操作

- 删除/隐藏虚拟系统的序列号：复制atmosphere/config_templates/exosphere.ini到根目录下，并且修改exosphere.ini文件内容，把`blank_prodinfo_emummc`改为1
- block任天堂的请求地址
	- 打开`/atmosphere/hosts`文件夹，如果不存在直接创建即可
	- 下载[emummc.txt](https://nh-server.github.io/switch-guide/files/emummc.txt)文件并放在`/atmosphere/hosts`里面
	- 启动机器，查看`/atmosphere/logs/dns_mitm_startup.log`，如果有对应**Redirections xxx.nintendo.xxx -> xxx**，说明成功
	- 详情可以见：[NH Switch Guide](https://nh-server.github.io/switch-guide/extras/blocking_nintendo/)

## 一些其他的软件

- ~~~~下载 [ITotalJustice/patches](https://github.com/ITotalJustice/patches)，直接解压到根目录，这样才能运行破解游戏
- [dbi](https://github.com/rashevskyv/dbi)，可以直接从电脑直接安装游戏
- [Awoo-Installer](https://github.com/Huntereb/Awoo-Installer)，安装器
- [NxNandManager](https://github.com/eliboa/NxNandManager)，可以修改对应的分区大小
- [Switch_90DNS_tester](https://github.com/meganukebmp/Switch_90DNS_tester)，判断当前系统是否有block任天堂的地址
- [Tinfoil](https://tinfoil.io/Download)，从多个渠道安装游戏