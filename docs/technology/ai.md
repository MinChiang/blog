# AI

## 文章引用：

- [Claude Skills 彻底爆了，从实现原理到 Claude Code、CodeX、OpenCode 实战，一网打尽！ ](https://www.cnblogs.com/javastack/p/19531825)
- [GLM Coding 开发者社区](https://zhipu-ai.feishu.cn/wiki/Av34wIZTGirqSuk2gsacUaMSnjC)
- [AI 時代，一定要學會使用 GitHub spec kit — SDD 規格驅動開發](https://milkmidi.medium.com/ai-%E6%99%82%E4%BB%A3-%E4%B8%80%E5%AE%9A%E8%A6%81%E5%AD%B8%E6%9C%83%E4%BD%BF%E7%94%A8-github-spec-kit-sdd-%E8%A6%8F%E6%A0%BC%E9%A9%85%E5%8B%95%E9%96%8B%E7%99%BC-f2df57cfdf3c)

## AI使用规范

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

目录可以这样组织：

```txt
python-code-review/
├── SKILL.md
├── references/
│   ├── style-guide.md
│   ├── security-checklist.md
│   └── testing-guide.md
└── scripts/
    └── run_checks.py
```

#### 只告诉模型这个 Skill 是干什么的

`SKILL.md` 的开头：

```
---
name: python-code-review
description: >
  Review Python code for correctness, security,
  maintainability and test coverage. Use when
  reviewing code changes or pull requests.
---
```

这一层主要用于技能发现。模型看到 `description`，就能判断当前任务是否适合使用这个 Skill。

#### 告诉模型具体怎么审查

继续在 `SKILL.md` 中编写：

```
# Python Code Review

## Workflow

1. Read the changed files.
2. Check correctness and edge cases.
3. Check security issues.
4. Evaluate maintainability.
5. Check test coverage.
6. Report findings with file paths and line numbers.

## References

- Read references/style-guide.md when checking style.
- Read references/security-checklist.md when checking security.
- Read references/testing-guide.md when evaluating tests.

## Constraints

- Do not modify source code during review.
- Do not report speculative issues as confirmed bugs.
- Explain why each finding matters.
```

注意，第二层可以先规定工作流程，而不必把所有安全规范、测试规范都写进去。

#### 需要时再深入读取

比如发现代码中存在 SQL 拼接：

- 读取 `security-checklist.md`，判断是否存在 SQL 注入风险。
- 发现测试缺失，再读取 `testing-guide.md`。
- 如果需要运行静态检查，再执行 `run_checks.py`。

这样一来，简单的代码审查不需要加载所有参考资料；复杂任务才会逐步获取更多内容。

这就是渐进式披露的实际价值。

### Prompt（提示词）：战术指令

**最佳实践：** 采用 **CO-STAR** 框架，这是目前公认最稳健的结构。

| **维度**             | **内容说明**   | **实际例子**                                          |
| -------------------- | -------------- | ----------------------------------------------------- |
| **C**ontext (背景)   | 提供任务背景   | “我正在为我的软路由写一个流量监控插件。”              |
| **O**bjective (目标) | 明确要干什么   | “编写一个 Python 脚本，提取流量数据并存入 InfluxDB。” |
| **S**tyle (风格)     | 指定输出风格   | “代码要专业、模块化，类似开源库的质量。”              |
| **T**one (语气)      | 设定回答语气   | “简洁、技术导向。”                                    |
| **A**udience (受众)  | 谁来看这段代码 | “给有经验的开发者看，不需要解释基础语法。”            |
| **R**esponse (格式)  | 输出什么格式   | “直接给出代码块和安装依赖的命令。”                    |

## RAG 混合检索与评测

### 分块

**整篇文档不能直接喂给检索器**：
- 单块过长会让 embedding 语义被稀释，向量趋近一锅粥，召回不准；
- 上下文窗口装不下整篇文档；
- 越接近用户问题的语义粒度，检索越准。

分块的**本质是设计检索单元**：每一块都要能独立回答一个问题。

#### chunk_size 与 overlap

- chunk_size 是每块的目标字符数上限，**属于软目标而非硬约束**；
- chunk_overlap 是相邻块共享的字符数，**防止语义断在边界**；
- **步长 = chunk_size - chunk_overlap，步长越小块数越多**。

手算示例：chunk_size=300，overlap=60，文档 1000 字
- 步长 = 240
- 块数 = ceil((1000-60)/240) = 4
- 冗余率 = overlap / chunk_size = 20%

**overlap 过大（超过 30%）的代价**：
- 向量数膨胀，成本上升；
- Top-K 可能被同一段内容占满，挤掉其他相关块；
- 相邻块向量高度相似，排序失去区分度。

#### 中文分块

chunk_size 按字符计算而非 token。中文 200 字符约等于 250~300 token，英文约 40~50 token，两者差 7~8 倍。

默认分隔符列表不含中文标点，中文会被一路降级到**逐字符硬切、切破词**。需要自定义分隔符优先级队列（从大到小），并保留标点：

```python
from langchain_text_splitters import RecursiveCharacterTextSplitter
splitter = RecursiveCharacterTextSplitter(
    chunk_size=300,
    chunk_overlap=50,
    separators=["\n\n", "\n", "。", "！", "？", "；", "，", " ", ""],
    keep_separator=True,
)
```

核心认知：**切不切由 chunk_size 决定，切在哪由分隔符决定**。句子比 chunk_size 短时，降级到逗号的逻辑不会触发，句子保持完整。

#### 代码块与表格

**代码块和表格不能按普通文本分块**：代码块被切开等于每半都是噪声，表格被切开只剩残行，检索不到整条信息。

**处理成原子块**：代码块整体成块并带上所属章节，表格整体成块。它们不参与正文的句子切割。

#### 可复现性

分块参数要写进脚本、能一键重建，同样的输入必须产出同样的输出，**这是评测的前提**。

### 评测标尺

没有标尺时，每改一版都觉得更准了，全是心理安慰。**评测把效果变成可量化的数字**。

#### 三个核心指标

| 指标 | 回答的问题 | 算法 |
|---|---|---|
| HitRate@K | 有没有：前 K 个结果里是否至少命中 1 个正确块 | 命中=1 否则=0 |
| Recall@K | 全不全：应该找到的都对没都找到 | 命中数 / gold 总数 |
| MRR | 前不前：第一个正确块排第几 | 1 / rank，找不到=0 |

MRR 的倒数维度让排名越前分数越高且陡峭：第 1 名 1.0，第 2 名 0.5，第 4 名 0.25。HitRate@5 常接近满分，因为它只要求蒙对一个，必须配合 MRR 看排序质量。

记忆要点：
- **HitRate = 有没有**
- **Recall = 全不全**
- **MRR = 前不前**

#### 评测集要防污染

**三件事会污染评测集**：

1. **词汇泄漏**：让 LLM 对着 chunk 生成问题，问题逐字复述原文术语，检索器靠字面匹配就能拿高分，语义能力没被测到。

2. **一对一出题**：每个 chunk 生成恰好一道题，评测集变成 chunk 集合的镜像，考不出现实场景的多跳问题。

3. **分布失真**：只有能生成问题的 chunk 有题，长尾内容、无答案场景被忽略。

正确做法：
- **人工编写**，从真实用户会怎么问出发；
- 覆盖题型：单跳、多跳、否定/边界、代码、无答案；
- 无答案题占比约 20%，**用于检验拒答能力**；
- **冻结评测集**并区分开发集与测试集，**防止对评测集过拟合**。

### 混合检索与 RRF

#### 单路检索的局限

| 检索路 | 擅长 | 挂的场景 |
|---|---|---|
| BM25 | 字面命中，词频 + 稀有词加权 | 问题措辞和文档不同（如 TCC vs Try/Confirm/Cancel） |
| 向量 | 语义相似，embedding 近似 | 词汇极生僻、embedding 没学过的场景 |

用户问题要么和文档原文几乎一样（BM25 好），要么完全不一样（向量好），**单路必在一种上挂掉**。

#### 分数不能直接相加

BM25 分数无上限（0~几十），向量相似度在 0.3~0.8 之间，**量纲不可比**。直接 0.5*BM25 + 0.5*向量，BM25 的绝对分差会淹没向量的相对信息。归一化（min-max）也不行，min/max 从哪来不好定，容易人为放大噪声。

#### RRF：只看名次，不看分数

公式：score(块) = sum over 各路 [ 1 / (k + rank_i) ]，k 默认 60。

手算示例，k=60：

| 块 | BM25名次 | 向量名次 | RRF 得分 |
|---|---|---|---|
| C1 | 1 | 5 | 1/61 + 1/65 = 0.0318 |
| C2 | 3 | 2 | 1/63 + 1/62 = 0.0320 |
| C3 | 30 | 1 | 1/90 + 1/61 = 0.0275 |

排序 C2 > C1 > C3。RRF **偏好多路都靠前的块**，**惩罚单路极强但另一路很弱的块**。

#### 中文 BM25 需要分词

BM25 按词检索，中文没有天然空格，**必须先用 jieba 等分词**：

```python
from rank_bm25 import BM25Okapi
import jieba, numpy as np

def tokenize(text):
    return [w for w in jieba.cut(text) if w.strip()]

bm25 = BM25Okapi([tokenize(c["content"]) for c in chunks])
scores = bm25.get_scores(tokenize(question))
order = np.argsort(-scores)
```

#### TCC 案例

库里有 chunk 写的是 "Try、Confirm和Cancel单词的缩写"，通篇没有 "TCC" 这 3 个字母。

- 纯 BM25：TCC 无字面匹配，排名第 17，召回失败；
- 纯向量：TCC 的向量和 "Try、Confirm和Cancel" 语义相近，排名第 1，召回成功；
- RRF 双路：BM25 第 17 名 + 向量第 1 名，融合后第 1 名。

这题说明：**纯 BM25 必挂，加向量路能救，双路最稳**。

#### 评测对比

6 条评测题上的指标：

| 方案 | HitRate@5 | MRR | Recall@5 |
|---|---|---|---|
| 纯 BM25 | 0.800 | 0.800 | 0.800 |
| 纯向量 | 1.000 | 1.000 | 1.000 |
| RRF 双路 | 1.000 | 1.000 | 1.000 |

评测集偏小且多字面命中时，指标 1.0 属于**虚高**，不代表真实场景。扩到 25~30 条、引入抗泄漏题和反例，指标才有意义。

### Reranker 精排（cross-encoder）

双路召回负责**广撒网保证不漏**，Reranker 负责**挑尖子保证精准**，对召回候选做第二道精筛。

#### bi-encoder 与 cross-encoder 的区别
- bi-encoder 召回路：问题和块**各自单独编码**，最后算向量夹角。块向量可离线缓存，因此**快，但只能抓大方向**。
- cross-encoder 精排路：问题和块**拼在一起喂同一模型**，靠注意力机制互相照看，**直接输出相关度分数**，准但慢。
- 注意：两者的输入都是文本，区别在于**如何组织文本、模型如何交互**，而不是输入是向量还是文本。

#### 为什么 Reranker 只能叠加在召回之后
- 每个候选都要**重新拼接问题、跑一次模型**，无法像向量那样缓存，**计算慢**。
- 候选数量大时不可行，必须先由召回压到少量候选再做精排。
- 结论：**召回决定检索上限，精排决定最终下限**。

### 评测集扩量（立可信标尺）

#### 指标虚高的常见原因
- **评测量太少**：单条波动大，统计不可靠。
- **抗泄漏差**：问题照抄语料原词，字面匹配即可得分，测不出语义能力。
- 题型覆盖不全：缺少否定边界、代码类问题。
扩量后**剥离送分题**，指标从虚高的 1.0 回落到真实区间，结果才可信。

#### 抗泄漏出题原则
- 改写措辞：问题不直接复述语料关键原词，改用使用场景来发问。
- 覆盖题型：单跳、多跳、否定边界、代码、无答案。
- 无答案题约占两成，**用于检验拒答能力**。
- 冻结评测集，区分开发集与测试集，避免对评测集过拟合。

#### 报告需多指标配合阅读
单看一个指标会误判，应配合：HitRate 和 Recall 衡量有没有、全不全，MRR 衡量正确项排得多靠前。

### Query Rewrite（查询改写）

在检索前先改写问题，把口语化或与语料措辞不一致的表述，改写成**更贴近文档规范的问法**再进入检索，解决问题表述不佳导致召回遗漏。

#### 三类改写方式
- **单轮改写**：一次生成改写后的问题，成本低，适合措辞不规范。
- **Multi-query**：生成多个不同表述的查询分别检索再合并，适合复杂多义。
- **HyDE**：先依据问题生成一段假设答案，再拿它去检索，适合问题与文档风格差异较大。

#### 改写是换表达，不是删信息
**改写必须保留原问题的核心语义与约束**，否则会丢掉关键限定，导致检索到无关内容。

#### 改写前后效果
- **对以字面匹配为主的检索方式提升最明显**，因为改写把语义转译成语料中出现过的规范词。
- 对语义检索的排序质量几乎总是有益，但召回面可能因表达收窄而**略有回退**。
- **改写并非无条件有益，上线前应通过评测甄别**。

### 父子 chunk（父大子小，双块策略）

用小粒度块进向量库以提升检索精度，用大粒度块**补全上下文**。命中小块后回溯其大块再喂给模型，**兼顾找得准与喂得全**。

#### 关键机制
- 每个小粒度块**记录其所属大粒度块**。
- 命中多个同属一个大块的子块时，**去重后只保留一份**，节省 token 并避免重复。
- 命中不同大块的子块，则各自回溯为不同大块，全部保留。

#### 代价
一个擦边命中的子块可能**带回一整大段内容**，造成上下文不纯，需权衡，常见做法是限制回溯的大块数量。

### 总结

- 分块是设计检索单元，不是切字符串，每一块要能独立读通；
- 中文必须自定义分隔符，否则退化成逐字符硬切；
- 代码块、表格要原子化，不能参与正文分词；
- 评测先于优化：没有标尺，所有变好了都是幻觉；
- HitRate 看有没有，Recall 看全不全，MRR 看前不前；
- BM25 抓字面，向量抓语义，两路互补；
- 两路分数不可直接相加，RRF 只看名次融合；
- 评测集要防**词汇泄漏**、**一对一出题**、**分布失真**；
- 开发集调参，测试集封印，防止对评测集过拟合。

