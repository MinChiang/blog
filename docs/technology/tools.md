## ACME.sh

### 介绍

- 一个自动申请域名与自动续签的linux脚本
- [官网](https://github.com/acmesh-official/acme.sh)
- [中文说明](https://github.com/acmesh-official/acme.sh/wiki/%E8%AF%B4%E6%98%8E)

### 托管平台（Namesilo为例）申请API密钥

- [NameSilo API托管地址](https://www.namesilo.com/account_api.php)
- 记录下申请的key

### 安装

```bash
export Namesilo_Key="上面步骤申请的key"
curl https://get.acme.sh | sh -s email=你的邮箱地址
acme.sh --install-cronjob
```

其中1，2行可以替换为修改/root/.acme.sh/account.conf

```bash
Namesilo_Key='上面步骤申请的key'
ACCOUNT_EMAIL='你的邮箱地址'
```

### 申请证书

```bash
acme.sh --issue --dns dns_namesilo --dnssleep 1800 -d *.minchiang.info
```

### 安装证书

```bash
acme.sh --install-cert -d *.minchiang.info \
--key-file       /etc/nginx/ssl/*.minchiang.info/key.pem  \
--fullchain-file /etc/nginx/ssl/*.minchiang.info/cert.pem \
--reloadcmd     "/etc/init.d/nginx force-reload"
```

### 后续维护

- 强制续约：
  
  ```bash
  acme.sh --renew -d *.minchiang.info --force
  ```

- 查看证书列表：
  
  ```bash
  acme.sh --list 
  ```

- 查看是否已经注册到crontab中
  
  ```bash
  crontab -l
  ```

## Git

- 版本库初始化：git init
- 加入到暂存区： git add
  - 交互模式：-i
  - 筛选文件夹或者文件：后面加入目录或者正则表达式
- 提交修改：git commit -m "注释内容"
- 查看某个提交记录：git show
- 查看提交记录历史：git log
  - 单行查看：--pretty=oneline
  - 以图标方式查看：--graph
  - 仅查看某个文件的提交记录：后面添加指定的文件
- 对比差异：git diff
  - 默认情况比较的是**工作区**和**暂存区**之间的差异
- 回滚到某个版本：git reset
  - 回滚到上个版本：HEAD^
  - 回滚到上上个版本：HEAD^^
  - 回滚到某个版本：HEAD~xxx
  - 回滚版本库，暂存区和工作区：--hard，会造成内容的丢失
  - 回滚版本库和暂存区（默认）**：--mixed，把修改返回到工作区且不暂存
  - 回滚版本库：--soft，把修改返回到工作区，并暂存
- 回滚某个提交：git revert
- 撤销修改：git restore
  - 默认情况仅撤销工作区中的修改
  - 撤销暂存区中的修改，并放回到工作区中：--staged
- 查看分支：git branch
  - 新建分支：后面带上新建的分支名称
  - 删除分支（已经完成代码合并操作）：-d
  - 删除分支（未进行代码合并操作）： -D
- 检出分支：git checkout
  - 新建并且检出分支：-b
  - 有回滚项目文件的功能，把文件快速回滚到之前的状态：-- fileName
- 合并分支：git merge
  - 先在checkout被merge的分支，再执行merge命令，把需要的分支合并到当前分支
- 摘取单个提交：git check-pick
- 贮存现场：git stash
  - 列出贮存列表：list
  - 恢复贮存现场（不删除贮存内容）：apply
  - 恢复贮存现场（删除贮存内容）：pop
  - 删除贮存现场：drop
- 打标签：git tag
  - 默认为查看所有标签
  - 指定标签信息：-m
  - 删除标签：-d

## Git和SVN的区别

- Git是分布式的：每个开发人员都是中心版本库的一个克隆
- Git按内容元数据方式存储，而SVN是按文件存储：.svn和.git比较差异非常大，.git目录下有中心版本库的所有东西，例如标签、分支和版本记录等；
- Git的分支和SVN的分支不同：Git分支是同一个文件夹的不同表现方式，而SVN是在不同的文件夹下；
- Git没有一个全局的版本号，而SVN有；
- Git的内容完整性要优于SVN：Git的内容存储使用SHA-1哈希算法，确保内容的完整性。

## IDEA快速工具

### 破解工具

- 去[https://3.jetbra.in/](https://3.jetbra.in/)中下载最新的jetbra.zip
- 打开**idea64.exe.vmoptions**，在最后添加：-javaagent:C:\xxx\jetbra\ja-netfilter.jar=jetbrains
- 点击页面中的工具的密码（当然是过期共用的啦，不配合jetbra.zip是无法使用的）
- 黏贴到激活Activation code栏目中，即可完成破解

### 代码模板

settings -> Editor -> Color Schema -> File and Code Templates

- Enum模板
  
  ```java
  #if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end  
  ```

import java.util.Arrays;  
import java.util.Collections;  
import java.util.Map;  
import java.util.function.Function;  
import java.util.stream.Collectors;  

#parse("File Header.java")  
public enum ${NAME} {

    /**  
    * 未知  
    */  
    UNKNOWN(0),
    
    ;
    
    private static final Map<Integer, ${NAME}> ALL = Collections.unmodifiableMap(Arrays.stream(${NAME}.class.getEnumConstants()).collect(Collectors.toMap(value -> value.id, Function.identity())));
    
    /**  
    * 转换  
    *  
    * @param id id  
    * @return 对应类别  
    */  
    public static ${NAME} from(int id) {
        return ALL.get(id);
    }  
    
    /**  
    * 唯一标志  
    */  
    public final int id;  
    
    ${NAME}(int id) {
        this.id = id;  
    }

}

```
- Factory模板
```java
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end  

#parse("File Header.java")  
public class ${NAME}Factory {  

    public ${NAME}Factory() {
    }

    /**  
    * 创建牌组合  
    *  
    * @return 工厂创建对象  
    */  
    public ${NAME} create() {
        return null;
    }

}
```

- Singleton模板
  
  ```java
  #if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end  
  ```

#parse("File Header.java")  
public class ${NAME} {  

    private ${NAME}() {
    }
    
    /**  
    * 获取单例对象  
    *  
    * @return 实例对象  
    */  
    public static ${NAME} getInstance() {
    return ${NAME}Holder.INSTANCE;
    }  
    
    private static final class ${NAME}Holder {
    
    private static final ${NAME} INSTANCE = new ${NAME}();
    
    }

}

```
- 标准头
```java
/**   
* @author MinChiang  
 * @version 1.0.0  
 * @date ${YEAR}-${MONTH}-${DAY} ${TIME}   
*/
```

### 插件

- Alibaba Java Coding Guidelines（阿里规范）
- GenerateSerialVersionUID（生成UUID）
- Grep Console（支持控制台打印颜色）
- GsonFormatPlus（json -> 实体对象）
- MapStruct Support（MapStruct的支持）
- Maven Helper（对Maven依赖的问题的解决）
- MyBatisX（快速生成MyBatis plus的工具）
- One Dark theme（黑暗配色）
- Rainbow Brackets（彩色的括号）
- RestfulToolkit（快速查找Controller）
- String Manipulation（各种命名风格的格式切换）
- Translation（翻译）
- Protocol Buffer Editor（PB文件支持）