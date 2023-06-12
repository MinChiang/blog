## ADB

```
adb devices									//查看adb已连接的设备信息，出现序列号和device表示已正常连接设备
adb shell pm list packages					//查看所有已安装应用的包名
adb shell pm uninstall -k --user 0 包名		//卸载包名所对应的软件（卸载命令1）
adb uninstall 包名							//卸载包名所对应的软件（卸载命令2，与卸载命令1功能相同，2选1即可）
adb shell am monitor						// 查看打开y
```

