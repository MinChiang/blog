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
- 回滚**到**某个版本：git reset
  - 回滚到上个版本：HEAD^
  - 回滚到上上个版本：HEAD^^
  - 回滚到某个版本：HEAD~xxx
  - 回滚**版本库，暂存区和工作区**：--hard，会造成内容的丢失
  - 回滚**版本库和暂存区（默认）**：--mixed，把修改返回到工作区且**不暂存**
  - 回滚**版本库**：--soft，把修改返回到工作区，**并暂存**
- 回滚**某个提交**：git revert
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

### 最好用的版本推荐

[IntelliJ IDEA Ultimate 2020.3.4](https://download.jetbrains.com/idea/ideaIU-2020.3.4.exe)

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

- Alibaba Java Coding Guidelines
- Free MyBatis Plugin
- GenerateSerialVersionUID
- Grep Console
- JRebel and XRebel forIntelliJ
- Maven Helper
- Protocol Buffer Editor
- Rainbow Brackets
- RestfulToolkit
- String Manipulation
- Translation
- IDE Eval Rest（需要添加仓库地址：https://plugins.zhile.io）

### 配色方案

将以下文件保存为Brackets.icls
并在Settings -> Editor -> Color Scheme中进行导入处理

```xml
<scheme name="Brackets" version="142" parent_scheme="Default">
  <option name="FONT_SCALE" value="1.0" />
  <metaInfo>
    <property name="created">2022-02-08T14:08:56</property>
    <property name="ide">idea</property>
    <property name="ideVersion">2020.3.0.0</property>
    <property name="modified">2022-02-08T14:09:04</property>
    <property name="originalScheme">Brackets</property>
  </metaInfo>
  <option name="LINE_SPACING" value="1.2" />
  <option name="EDITOR_FONT_SIZE" value="13" />
  <option name="EDITOR_FONT_NAME" value="Cascadia Code PL" />
  <option name="EDITOR_LIGATURES" value="true" />
  <option name="CONSOLE_FONT_NAME" value="Cascadia Mono" />
  <option name="CONSOLE_FONT_SIZE" value="12" />
  <option name="CONSOLE_LINE_SPACING" value="1.0" />
  <colors>
    <option name="CARET_ROW_COLOR" value="e0e0ff" />
    <option name="CONSOLE_BACKGROUND_KEY" value="f8f8f8" />
    <option name="GUTTER_BACKGROUND" value="f8f8f8" />
    <option name="INDENT_GUIDE" value="eaeaea" />
    <option name="LINE_NUMBERS_COLOR" value="a2a2a2" />
    <option name="METHOD_SEPARATORS_COLOR" value="e0e0ff" />
    <option name="SELECTED_INDENT_GUIDE" value="535358" />
    <option name="SELECTED_TEARLINE_COLOR" value="eaeaea" />
    <option name="SELECTION_BACKGROUND" value="eaeaea" />
    <option name="SELECTION_FOREGROUND" value="535358" />
    <option name="TEARLINE_COLOR" value="e0e0ff" />
  </colors>
  <attributes>
    <option name="ABSTRACT_CLASS_NAME_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="8757c4" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="8757c4" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="ANNOTATION_NAME_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="cc9393" />
        <option name="FONT_TYPE" value="1" />
        <option name="EFFECT_COLOR" value="cc9393" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="ANONYMOUS_CLASS_NAME_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="8757c4" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="8757c4" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="BAD_CHARACTER">
      <value>
        <option name="FOREGROUND" value="ab2525" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="Block comment">
      <value>
        <option name="FOREGROUND" value="a2a2a2" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="a2a2a2" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="CLASS_NAME_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="8757c4" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="8757c4" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="CONSOLE_ERROR_OUTPUT">
      <value>
        <option name="FOREGROUND" value="f38c00" />
        <option name="FONT_TYPE" value="1" />
        <option name="EFFECT_COLOR" value="f38c00" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="CONSOLE_NORMAL_OUTPUT">
      <value>
        <option name="FOREGROUND" value="535358" />
        <option name="BACKGROUND" value="f8f8f8" />
      </value>
    </option>
    <option name="CONSOLE_SYSTEM_OUTPUT">
      <value>
        <option name="FOREGROUND" value="f38c00" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="f38c00" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="CONSOLE_USER_INPUT">
      <value>
        <option name="FOREGROUND" value="a2a2a2" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="a2a2a2" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="CUSTOM_INVALID_STRING_ESCAPE_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="ab2525" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="CUSTOM_KEYWORD1_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="426dc0" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="426dc0" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="CUSTOM_KEYWORD2_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="426dc0" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="426dc0" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="CUSTOM_KEYWORD3_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="426dc0" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="426dc0" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="CUSTOM_KEYWORD4_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="426dc0" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="426dc0" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="CUSTOM_LINE_COMMENT_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="a2a2a2" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="a2a2a2" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="CUSTOM_MULTI_LINE_COMMENT_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="a2a2a2" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="a2a2a2" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="CUSTOM_NUMBER_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="f38c00" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="f38c00" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="CUSTOM_STRING_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="f38c00" />
        <option name="FONT_TYPE" value="1" />
        <option name="EFFECT_COLOR" value="f38c00" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="CUSTOM_VALID_STRING_ESCAPE_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="f38c00" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="f38c00" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_ATTRIBUTE">
      <value>
        <option name="FOREGROUND" value="885d3b" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_BRACES">
      <value>
        <option name="FOREGROUND" value="b05a65" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_BRACKETS">
      <value>
        <option name="FOREGROUND" value="b05a65" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_CLASS_NAME">
      <value>
        <option name="FOREGROUND" value="8757c4" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="8757c4" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_CLASS_REFERENCE">
      <value>
        <option name="FOREGROUND" value="8757c4" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="8757c4" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_COMMA">
      <value>
        <option name="FOREGROUND" value="0" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_CONSTANT">
      <value>
        <option name="FOREGROUND" value="885d3b" />
      </value>
    </option>
    <option name="DEFAULT_DOC_COMMENT">
      <value>
        <option name="FOREGROUND" value="ad95af" />
        <option name="FONT_TYPE" value="3" />
      </value>
    </option>
    <option name="DEFAULT_DOC_COMMENT_TAG">
      <value>
        <option name="FOREGROUND" value="566874" />
        <option name="FONT_TYPE" value="3" />
      </value>
    </option>
    <option name="DEFAULT_DOC_MARKUP">
      <value>
        <option name="FOREGROUND" value="cc9393" />
        <option name="FONT_TYPE" value="1" />
        <option name="EFFECT_COLOR" value="cc9393" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_DOT">
      <value>
        <option name="FOREGROUND" value="0" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_ENTITY">
      <value>
        <option name="FOREGROUND" value="f38c00" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="f38c00" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_FUNCTION_CALL">
      <value>
        <option name="FOREGROUND" value="bc5a65" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_FUNCTION_DECLARATION">
      <value>
        <option name="FOREGROUND" value="b05a65" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_GLOBAL_VARIABLE">
      <value>
        <option name="FOREGROUND" value="416dbf" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="416dbf" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_IDENTIFIER">
      <value>
        <option name="FOREGROUND" value="535358" />
      </value>
    </option>
    <option name="DEFAULT_INSTANCE_FIELD">
      <value>
        <option name="FOREGROUND" value="728e00" />
        <option name="FONT_TYPE" value="3" />
      </value>
    </option>
    <option name="DEFAULT_INSTANCE_METHOD">
      <value>
        <option name="FOREGROUND" value="bc5a65" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_INTERFACE_NAME">
      <value>
        <option name="FOREGROUND" value="9b5656" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_INVALID_STRING_ESCAPE">
      <value>
        <option name="FOREGROUND" value="ab2525" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_KEYWORD">
      <value>
        <option name="FOREGROUND" value="426dc0" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="426dc0" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_LABEL">
      <value>
        <option name="FOREGROUND" value="885d3b" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_LINE_COMMENT">
      <value>
        <option name="FOREGROUND" value="a2a2a2" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="a2a2a2" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_LOCAL_VARIABLE">
      <value>
        <option name="FOREGROUND" value="416dbf" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="416dbf" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_METADATA">
      <value>
        <option name="FOREGROUND" value="808080" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_NUMBER">
      <value>
        <option name="FOREGROUND" value="f38c00" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="f38c00" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_OPERATION_SIGN">
      <value>
        <option name="FOREGROUND" value="0" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_PARAMETER">
      <value>
        <option name="FOREGROUND" value="885d3b" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_PARENTHS">
      <value>
        <option name="FOREGROUND" value="b05a65" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_PREDEFINED_SYMBOL">
      <value>
        <option name="FOREGROUND" value="a0b0c" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_SEMICOLON">
      <value>
        <option name="FOREGROUND" value="0" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_STATIC_FIELD">
      <value>
        <option name="FOREGROUND" value="885d3b" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_STATIC_METHOD">
      <value>
        <option name="FOREGROUND" value="c4c4b7" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_STRING">
      <value>
        <option name="FOREGROUND" value="f38c00" />
        <option name="FONT_TYPE" value="1" />
        <option name="EFFECT_COLOR" value="f38c00" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_TAG">
      <value>
        <option name="FOREGROUND" value="b05a65" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_TEMPLATE_LANGUAGE_COLOR">
      <value>
        <option name="FOREGROUND" value="535358" />
      </value>
    </option>
    <option name="DEFAULT_VALID_STRING_ESCAPE">
      <value>
        <option name="FOREGROUND" value="f38c00" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="f38c00" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="DELETED_TEXT_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="f8f8f8" />
        <option name="BACKGROUND" value="535358" />
      </value>
    </option>
    <option name="DEPRECATED_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="ab2525" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="DOC_COMMENT_TAG_VALUE">
      <value>
        <option name="FOREGROUND" value="cc9393" />
        <option name="FONT_TYPE" value="1" />
        <option name="EFFECT_COLOR" value="cc9393" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="ENUM_NAME_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="9b5656" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="FOLDED_TEXT_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="535358" />
        <option name="BACKGROUND" value="eaeaea" />
      </value>
    </option>
    <option name="HTML_CODE">
      <value />
    </option>
    <option name="IDENTIFIER_UNDER_CARET_ATTRIBUTES">
      <value>
        <option name="BACKGROUND" value="ffcfbb" />
        <option name="ERROR_STRIPE_COLOR" value="ffcfbb" />
      </value>
    </option>
    <option name="IMPLICIT_ANONYMOUS_CLASS_PARAMETER_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="9b5656" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="INJECTED_LANGUAGE_FRAGMENT">
      <value>
        <option name="FOREGROUND" value="535358" />
      </value>
    </option>
    <option name="INSTANCE_FIELD_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="728e00" />
        <option name="FONT_TYPE" value="3" />
      </value>
    </option>
    <option name="INTERFACE_NAME_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="9b5656" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="KOTLIN_LABEL">
      <value />
    </option>
    <option name="LOG_ERROR_OUTPUT">
      <value>
        <option name="FOREGROUND" value="426dc0" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="426dc0" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="LOG_EXPIRED_ENTRY">
      <value>
        <option name="FOREGROUND" value="a2a2a2" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="a2a2a2" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="LOG_WARNING_OUTPUT">
      <value>
        <option name="FOREGROUND" value="416dbf" />
        <option name="FONT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="416dbf" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="MATCHED_BRACE_ATTRIBUTES">
      <value>
        <option name="BACKGROUND" value="99ccbb" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="METHOD_DECLARATION_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="bc5a65" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="PARAMETER_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="885d3b" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="SEARCH_RESULT_ATTRIBUTES">
      <value>
        <option name="BACKGROUND" value="ffcfbb" />
        <option name="ERROR_STRIPE_COLOR" value="ffcfbb" />
      </value>
    </option>
    <option name="STATIC_FIELD_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="885d3b" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="STATIC_METHOD_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="566874" />
        <option name="FONT_TYPE" value="3" />
      </value>
    </option>
    <option name="TEMPLATE_VARIABLE_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="535358" />
      </value>
    </option>
    <option name="TEXT">
      <value>
        <option name="FOREGROUND" value="535358" />
        <option name="BACKGROUND" value="f8f8f8" />
      </value>
    </option>
    <option name="TEXT_SEARCH_RESULT_ATTRIBUTES">
      <value>
        <option name="BACKGROUND" value="ffdf99" />
        <option name="ERROR_STRIPE_COLOR" value="ffdf99" />
      </value>
    </option>
    <option name="TYPE_PARAMETER_NAME_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="885d3b" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="WRITE_IDENTIFIER_UNDER_CARET_ATTRIBUTES">
      <value>
        <option name="BACKGROUND" value="ffcfbb" />
        <option name="ERROR_STRIPE_COLOR" value="ffcfbb" />
      </value>
    </option>
    <option name="WRITE_SEARCH_RESULT_ATTRIBUTES">
      <value>
        <option name="BACKGROUND" value="ffcfbb" />
        <option name="ERROR_STRIPE_COLOR" value="ffcfbb" />
      </value>
    </option>
  </attributes>
</scheme>
```
