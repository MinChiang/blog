# AI

## 文章引用：

- [Claude Skills 彻底爆了，从实现原理到 Claude Code、CodeX、OpenCode 实战，一网打尽！ ](https://www.cnblogs.com/javastack/p/19531825)
- [GLM Coding 开发者社区](https://zhipu-ai.feishu.cn/wiki/Av34wIZTGirqSuk2gsacUaMSnjC)
- [AI 時代，一定要學會使用 GitHub spec kit — SDD 規格驅動開發](https://milkmidi.medium.com/ai-%E6%99%82%E4%BB%A3-%E4%B8%80%E5%AE%9A%E8%A6%81%E5%AD%B8%E6%9C%83%E4%BD%BF%E7%94%A8-github-spec-kit-sdd-%E8%A6%8F%E6%A0%BC%E9%A9%85%E5%8B%95%E9%96%8B%E7%99%BC-f2df57cfdf3c)

## AI使用教程

### Rules（规则）：项目宪法 

**最佳实践：** 采用“身份 + 约束 + 禁令”结构。直接放在根目录的 `.cursorrules` 或 `.windsurfrules` 中。

```
# Role
你是一名精通 TypeScript 和 Rust 的全栈工程师，追求极简、高性能的代码。

# Coding Standards
- 命名：变量用小驼峰，常量用全大写。
- UI：优先使用 Tailwind CSS，保持响应式设计。
- 逻辑：优先使用函数式编程，减少副作用。

# Special Instructions
- 修改代码前，先简要分析逻辑，不要直接输出大段代码。
- 所有的 Shell 脚本必须兼容 Zsh 且包含错误处理。

# Strict Taboos
- 严禁在回答中说“好的”、“没问题”等废话。
- 严禁删除用户现有的注释。
```

### Skills（技能）：专业插件库

**最佳实践：** Skill 本质上是**知识库 (Knowledge)** 或 **工具集 (Tools)**。建议以 `.md` 文档形式存放在特定的 `docs/ai_skills/` 目录下，并让 AI 索引。

```
# Skill: NAS API Handler
## Context
本技能用于处理 Synology NAS 的 API 请求。

## Methods
- 调用逻辑：所有请求需带上 `_sid` token。
- 接口地址：`http://192.168.1.100:5000/webapi/`
- 错误码处理：101 表示权限不足，需触发 re-login 逻辑。

## Examples
(在这里贴一段标准的 API 调用 JSON 样例)
```

### Prompt（提示词）：战术指令

**最佳实践：** 采用 **CO-STAR** 框架。这是目前公认最稳健的结构。

| **维度**             | **内容说明**   | **实际例子**                                          |
| -------------------- | -------------- | ----------------------------------------------------- |
| **C**ontext (背景)   | 提供任务背景   | “我正在为我的软路由写一个流量监控插件。”              |
| **O**bjective (目标) | 明确要干什么   | “编写一个 Python 脚本，提取流量数据并存入 InfluxDB。” |
| **S**tyle (风格)     | 指定输出风格   | “代码要专业、模块化，类似开源库的质量。”              |
| **T**one (语气)      | 设定回答语气   | “简洁、技术导向。”                                    |
| **A**udience (受众)  | 谁来看这段代码 | “给有经验的开发者看，不需要解释基础语法。”            |
| **R**esponse (格式)  | 输出什么格式   | “直接给出代码块和安装依赖的命令。”                    |