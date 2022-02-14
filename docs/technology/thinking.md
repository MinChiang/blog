## DDD领域驱动模型
### 总览分析

![ddd层次调用](./images/ddd层次调用.png)

![ddd层级划分](./images/ddd层级划分.png)

![ddd数据流转](./images/ddd数据流转.png)

项目结构

- interfaces：用户表示层，最顶层；负责向用户显示信息和解释用户命令，请求应用层以获取用户所需要展现的数据，发送命令给应用层要求其执行某个用户命令；
  - facade：门面，为远程客户端提供粗粒度的调用接口，将一个用户请求委派给一个或多个Service进行处理；
  - DTO：数据传输对象，是与外部通讯的载体，是一个纯粹的POJO，内部不应该包含任何的业务逻辑；
  - assembler：装配器，实现DTO与领域对象之间的相互转换，与DTO同时出现；
  - 各种协议入口：如servlet、controller、mq协议，这种分层直接调用facade门面的入口；
- application：应用层，回答微服务应用要完成的任务内容，要求尽量的简单，不包含任何的业务逻辑或者知识，事务均放在应用层做处理；
  - 各种service：为一个接口，就是应用层接口
  - serviceImpl：为应用层接口的具体实现
  - event：为对应的事件接口
- domain：领域层，主要负责表达业务概念，业务状态信息和业务规则，几乎所有的业务逻辑均在该层实现
  - entity：实体，具有为已标志的对象
  - vo（value object）：值对象，无需唯一标志的对象
  - service（domain service）：领域服务，一些行为无法归类到实体对象或值对象上，本质是一些操作而非事物
  - aggregate：聚合根，一组具有内聚关系的相关对象或者集合
  - factory：工厂，创建复杂对象时，隐藏创建的细节
  - repository：仓储，提供查找和持久化对象的方法
- infrastructure：基础设施层，与所有层相交互，为用户表示层提供组件配置，为应用层提供传递消息的能力，为领域层提供持久化机制
  - eventImpl：应用层的event实现
  - persistence：持久化实现，为对应领域层中repository的实现

### 资料参考
- 结合《领域驱动设计》的工程：[领域驱动工程样例](https://github.com/citerus/dddsample-core)
- 阿里DDD技术讲解：
	- [阿里技术专家详解DDD系列 第一讲：Domain Primitive](https://juejin.cn/post/6844904177207001101)
	- [阿里技术专家详解DDD系列 第二讲：应用架构](https://juejin.cn/post/6844904201575743495)
	- [阿里技术专家详解DDD系列 第三讲：Repository模式](https://juejin.cn/post/6845166890554228744)
	- [阿里技术专家详解DDD系列 第四讲：领域层设计规范](https://juejin.cn/post/6912228908075057166)
	- [阿里技术专家详解DDD系列 第五讲：聊聊如何避免写流水账代码](https://juejin.cn/post/6953141151931039758)
	- 对应工程代码：[工程代码](https://github.com/Air433/dddbook)
- vivo技术讲解：
	- [领域驱动设计(DDD)实践之路(一)](https://juejin.cn/post/6844904071174815752)
	- [领域驱动设计(DDD)实践之路(二)：事件驱动与CQRS](https://juejin.cn/post/6844904122659913735)
	- [领域驱动设计(DDD)实践之路(三)：如何设计聚合](https://juejin.cn/post/6844904158449893389)
- [美团DDD技术讲解](https://developer.aliyun.com/article/319159)
- [COLA技术架构](https://github.com/alibaba/COLA)
- [为什么域服务必须使用域对象作为参数和返回值？](https://stackoverflow.com/questions/14326230/why-must-domain-services-use-domain-objects-as-parameters-and-return-values)
- [如何发布和处理领域事件](http://www.kamilgrzybek.com/design/how-to-publish-and-handle-domain-events/)
- [DDD 限界上下文和 Java 模块](https://www.baeldung.com/java-modules-ddd-bounded-contexts)
- [工厂的入参是原始对象还是value object](https://stackoverflow.com/questions/11395031/ddd-factory-entity-value-object?rq=1)

### 要点
- application层只是做服务的编排，不做任何的计算逻辑
- domain service只是对象状态的变更，不做save的操作，不能注入repository
- domain service入参和出参都返回领域内的对象
- CQE对象入参全为细颗粒度

### 概述
### Interface层：
- 承接消息的入口，转化入口参数
- interface层的表达不止为http协议，也有dubbo、soap、websocket、kafka等
- 每种协议独立一套的表达方式，避免同一表达；需要注意出参要有同一的格式，例如http协议同一返回StandardReposese对象
- 应该捕捉所有异常，避免异常信息的泄漏
- 不应意识到domain层的内部对象

### Application层：
- application层做的是**服务的编排**，**不做任何的计算逻辑**；一般包含下面的操作
	- 数据校验
	- 通过Repository查询Entity
	- 操作Entity，对Entity进行状态的变更
	- 通过Repository保存Entity
	- 发送领域事件
- Command、Query、Event统称为CQE，他们三者作为application的入参，根据单ID查询的场景下可以直入；统一返回DTO对象，不能暴露domain的Entity和Value Object，使用DTO Assemble进行转换
- 不同方法使用不同的CQE，因为不同方法的语义是不一样的，如果复用同一CQE对象，其中一个方法入参的变动会导致全体的参数变动
- application层需要做简单的参数校验，例如：判空、字符串合法化判断，可以用Bean Validation解决
- 有异常信息可以直接抛出，因为在上层的interface层已经捕获所有异常

### Domain层：
- Entity：
	- 有对应的id，一个Entity对应有一个唯一的id
	- 判断两个Entity是否相等应该直接判断id
	- id需要用一个对象进行包裹，防止id的唯一性变更
	- 一个Entity对应有一个Repository
	- 封装业务的参数校验以及业务逻辑
- Value Object：
	- 没有id，参数都是不可变的，若改变里面的信息直接重新new一个即可
	- 没有对应的Repository
	- 有对应的业务操作函数，非纯POJO
- Domain Service：
	- 操作复杂的业务逻辑，往往含有两个以上的Entity的操作，如果只有操作一个Entity，可以把这些业务逻辑挪到这唯一的Entity里面
	- Domain Service不应该依赖Repository，只做对Entity的状态的变更
- Repository：
	- 保存Entity的状态
	- 本质上只有save和find两种的方法
- Factory：
	- 创建Entity对象，从0到1的过程
	- 入参是领域对象，非基本类型
	- 复杂构造的时候可能会依赖Repository

### Infrastructure层：
- 用ACL防腐层将外部依赖转化为内部代码，隔离外部的影响