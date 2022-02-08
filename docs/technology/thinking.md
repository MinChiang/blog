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
- [美团DDD技术讲解](https://developer.aliyun.com/article/319159)
- [COLA技术架构](https://github.com/alibaba/COLA)