## 总览分析

![ddd层次调用](../images/ddd层次调用.png)

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
  - value object：值对象，无需唯一标志的对象
  - service（domain service）：领域服务，一些行为无法归类到实体对象或值对象上，本质是一些操作而非事物
  - aggregate：聚合根，一组具有内聚关系的相关对象或者集合
  - factory：工厂，创建复杂对象时，隐藏创建的细节
  - repository：仓储，提供查找和持久化对象的方法
- infrastructure：基础设施层，与所有层相交互，为用户表示层提供组件配置，为应用层提供传递消息的能力，为领域层提供持久化机制
  - eventImpl：应用层的event实现
  - persistence：持久化实现，为对应领域层中repository的实现



### DDD共识

- DDD是天生指读写分离的，原则上它只**限制了写操作的准则，而不对读操作有太多的指导和干预**；所以我们在讨论DDD的时候一般讲的都是关注如何进行写操作落地与建模的，而读操作则是可以进行传统的MVC结构，从存储结构层面数据直出

- 要求在代码编写时：**进行外部逻辑的入侵屏蔽，对内部逻辑暴露的细节抹除**；假设外部引用是污浊的，内部域内代码是干净的，我们仅能通过一些防腐层做好隔离处理，所以我们可以看到很多参考文章中写xxxFacade，xxxGateway，都是为了防止外部逻辑对内部域模型的侵入，以及内部域对外部世界的暴露

- DDD是需要堆叠很多代码量的，不能由于一时的简单快捷而破环DDD的指导准则

- 架构扁平，分离接口与具体实现，面向接口编程

- 分离技术与业务

- DDD有很多落地的思想与架构，例如有：

  - 洋葱模型
  - 整洁架构
  - 六边形架构
  - 菱形对称模型
  - COLA模型

  

### DDD讲解

- adapter

  - 表示对外部调用接口调用的**适配，而不是实现**
  - 这里的接口尽量小，尽量细，不能大而全
  - 这里只有对应的interface，并没有对应的实现
  - 出入参数可以为内部的domain的模型，也可以为基本类型

  例如**工单领域**需要查询**知识点领域**的内容：根据知识点id批量查询知识点目录

  ```java
  public interface KnowledgeAdapter {
      /**
       * 获取知识点目录名称
       *
       * @param ids 知识点目录id
       * @return 名称集合
       */
      Map<Integer, String> getKnowledgeCategoryNames(Set<Integer> ids);
  }
  ```

- application

  - 应用层，**回答服务应用要完成的任务内容**，要求尽量的简单
  - **不包含任何的业务逻辑或者知识**
    - 没有if...else等逻辑判断（业务逻辑）
    - 没有计算相关的东西，例如计算工单时长等，都不能出现
  - 应用层分为两类：
    - xxxQueryService：表示读取，入参都是以xxxQuery结尾，出餐xxxDTO结尾
    - xxxApplicationService：表示写入，入参都是以xxxCommand结尾，如果创建了聚合根对象则返回对应的id，否则返回值为空
  - 这里是做数据库事务的地方
    - 原则上这里的接口是意识不到事务的，即**不能再接口层面上面加@Transational的注解**
    - 注意长事务，如果有长事务出现则需要手动编排管理事务
  - 这里只有对应的interface，并没有对应的实现
  - 编写application实现原则：
    - 数据校验
    - 通过Repository查询聚合根
    - 操作聚合根，对聚合根进行状态的变更
    - 通过Repository保存聚合根
    - 发送领域事件

  ```java
  public interface OrderQueryService {
      /**
       * 查询工单详情
       *
       * @param query 查询内容
       * @return 工单详情
       */
      GetOrderDTO getOrder(@Valid @NotNull GetOrderQuery query);
  
      /**
       * 查询我的锁定中的工单
       *
       * @param query 查询内容
       * @return 工单列表
       */
      PageResult<ListMyOrderDTO> listMyOrder(@Valid @NotNull ListMyOrderQuery query);
  }
  ```

- domain

  - DDD所重点关注的地方
  - 是整个领域的**核心**，也是MVP（Minimum Viable Product**最简化可实行产品**）
  - 不关心和提现技术细节，**只体现业务价值**
  - 能够独立进行测试运行
  - 除了内部依赖内部工具库以外，**不依赖其他库或者框架**
  - 里面按照领域进行分包，一个领域独占一个包

- biz

  - 是领域的业务逻辑
  - 不是DDD所规范必须的
  - 可以用设计模式手段来**实现业务价值**

- entity

  - 类是**有血有肉**富含行为的，不再是单纯的POJO
  - 有对应的id，一个Entity对应有一个唯一的id
  - 判断两个Entity是否相等应该直接判断id
  - id需要用一个对象进行包裹，防止id的唯一性变更
  - 一个聚合根对应有一个Repository
  - 封装业务的参数校验以及业务逻辑
  - 写方法一般来说返回是void，可以直接扔出领域事件，让application层进行事件抛出

  ```java
  @Getter
  @ToString
  @EqualsAndHashCode
  @AllArgsConstructor
  @NoArgsConstructor(access = AccessLevel.PROTECTED)
  public class Order implements AggregateRoot<OrderId>, Serializable {
      /**
       * 工单主键
       */
      private OrderId id;
  
      // 这里是一些比较重要的设计点
  
      /**
       * 所属组别
       */
      private GroupId groupId;
  
      /**
       * 优先级，这个值和提单人是否是VIP，以及工单的紧急度相关
       */
      private Priority priority = Priority.LOWEST;
  
      /**
       * 锁定信息
       */
      private Lock lock = NO_LOCK;
  
      /**
       * 工单归档信息
       */
      private ArchiveInformation archiveInformation = ArchiveInformation.NOT_ARCHIVED;
  
      /**
       * 状态
       */
      private OrderStatusEnum status = WAITING;
  
      /**
       * 业务id
       */
      private Integer appId;
  
      /**
       * 服务id
       */
      private Long serviceId;
  
      /**
       * 工单来源，1-聊天入口，2-电话入口，3-手动提单
       */
      private OriginEnum origin;
  
      /**
       * 接受/锁定工单
       *
       * @param user      接受工单的客服人员
       * @param permanent 是否永久锁定
       */
      public List<Event> lock(UserId user, boolean permanent) {
          checkNotLocked();
          this.setLock(this.lock.lock(user, permanent));
          EventResult<OrderStatusEnum> eventResult = OrderTypeProcessorFactory.getProcessor(this.getType()).lock(this);
          List<Event> events = new ArrayList<>();
          events.addAll(eventResult.getEvents());
          events.addAll(changeStatusTo(eventResult.getResult()));
          maintainedBy(user);
          return events;
      }
  
      /**
       * 解锁/释放工单
       *
       * @param user 释放工单的客服人员
       */
      public List<Event> unlock(UserId user) {
          checkOrderStatusIn(WAITING, FOLLOWING);
          checkLockedBy(user);
          this.setLock(NO_LOCK);
          EventResult<OrderStatusEnum> eventResult = OrderTypeProcessorFactory.getProcessor(this.getType()).unlock(this);
          List<Event> events = new ArrayList<>();
          events.addAll(eventResult.getEvents());
          events.addAll(changeStatusTo(eventResult.getResult()));
          maintainedBy(user);
          return events;
      }
  
      /**
       * 解决/归档工单
       *
       * @param user        释放工单的客服人员
       * @param archiveType 结单类型
       */
      public List<Event> archive(UserId user, ArchiveTypeEnum archiveType) {
          checkOrderStatusIn(WAITING, FOLLOWING);
          checkLockedBy(user);
          this.setArchiveInformation(ArchiveInformation.of(user, archiveType));
          this.setLock(this.lock.unlock());
          EventResult<OrderStatusEnum> eventResult = OrderTypeProcessorFactory.getProcessor(this.getType()).archive(this);
          List<Event> events = new ArrayList<>();
          events.addAll(eventResult.getEvents());
          events.addAll(changeStatusTo(eventResult.getResult()));
          // 如果设定给用户确认，那么工单有可能会成为二次工单，此时要设定初始化对应的二次状态
          if (this.getReplyConfig().isCheckResult()) {
              ReopenInformation secondaryOrder = this.getReopenInformation().waitToClientConfirm();
              this.setReopenInformation(secondaryOrder);
          }
          maintainedBy(user);
          return events;
      }
  }
  ```

- repository

  - 保存聚合根的状态
  - 本质上只有save和find两种的方法
  - 这里只有对应的interface，并没有对应的实现

- service

  - 领域服务，请与ApplicationService区分开
  - domain service是一个不必要的妥协，应该越少越好
  - 有些行为不能单纯地放在一个实体中
    - 对外围接口进行调用的情况
    - 未来复杂的计算逻辑，但是计算的参数有预想地不再聚合内
    - 一些同时改变多个聚合的方法
    - 不仅有接口还有实现，一些文章说直接写对应实现即可，但是本人还是推荐保留接口

```java
/**
 * 计算工单优先级
 * 由于工单优先级可能有多个影响的因素，如：创建的时间、紧急度、工单创建人的职位、是否VIP等
 * 这些不定的因素都会
 */
public interface OrderPriorityCalculateService {
    /**
     * 计算优先级
     *
     * @param order 工单
     * @return 优先级
     */
    Priority calculate(Order order);
}

/**
 * 工单发送通知给用户
 */
public interface ReplyService {
    /**
     * 异步回复
     *
     * @param order 工单信息
     * @param ways  回复方式
     */
    void replyAsync(Order order, ReplyWayEnum... ways);
}

public class OrderPriorityCalculateServiceImpl implements OrderPriorityCalculateService {

    /**
     * 紧急度计算比重
     */
    private int urgencyWeight = 2;

    /**
     * vip计算比重
     */
    private int vipWeight = 1;

    public OrderPriorityCalculateServiceImpl() {
    }

    @Override
    public Priority calculate(Order order) {
        Priority result = Priority.LOWEST;
        Urgency urgency = order.getUrgency();
        result = result.addPriority(Priority.of(urgency.getTimes() * urgencyWeight));
        if (order.isVip()) {
            result = result.addPriority(Priority.of(vipWeight));
        }
        return result;
    }

}

public class ReplyServiceImpl implements ReplyService {

    private static final ExecutorService EXECUTOR_SERVICE = Executors.newFixedThreadPool(4);

    private final ReplyInnerAdapter replyInnerAdapter;
    private final ReplyAppAdapter replyAppAdapter;
    private final ReplyPushAdapter replyPushAdapter;

    public ReplyServiceImpl(ReplyInnerAdapter replyInnerAdapter,
                            ReplyAppAdapter replyAppAdapter,
                            ReplyPushAdapter replyPushAdapter) {
        this.replyInnerAdapter = replyInnerAdapter;
        this.replyAppAdapter = replyAppAdapter;
        this.replyPushAdapter = replyPushAdapter;
    }

    @Override
    public void replyAsync(Order order, ReplyWayEnum... ways) {
        ReplyConfig replyConfig = order.getReplyConfig();
        ContactAccount contactAccount = order.getContactAccount();
        if (!replyConfig.isReplyable() || ContactAccount.NO_CONTACT_ACCOUNT.equals(contactAccount) || ways == null || ways.length == 0) {
            log.info("can not reply, maybe reply is not configured or contact account is empty!");
            return;
        }
        OrderId id = order.getId();
        UserId clientId = contactAccount.getClientId();
        String replyMessage = replyConfig.getReplyMessage();
        Integer appId = contactAccount.getAppId();

        for (ReplyWayEnum way : ways) {
            switch (way) {
                case PUSH:
                    EXECUTOR_SERVICE.execute(() -> {
                        try {
                            PushReplyInfo pushReplyInfo = new PushReplyInfo(id, clientId, replyMessage, appId);
                            replyPushAdapter.sendPushMessage(pushReplyInfo);
                        } catch (Exception e) {
                            log.error("reply push message error, order: {}", order, e);
                        }
                    });
                    break;
                case APP:
                    EXECUTOR_SERVICE.execute(() -> {
                        try {
                            AppReplyInfo appReplyInfo = new AppReplyInfo(id, clientId, replyMessage, appId);
                            replyAppAdapter.sendAppMessage(appReplyInfo);
                        } catch (Exception e) {
                            log.error("reply app message error, order: {}", order, e);
                        }
                    });
                    break;
                case INNER:
                    EXECUTOR_SERVICE.execute(() -> {
                        try {
                            // 发送内部的服务信息
                            InnerReplyInfo innerReplyInfo = new InnerReplyInfo(id, clientId, replyMessage);
                            replyInnerAdapter.sendInnerMessage(innerReplyInfo);
                        } catch (Exception e) {
                            log.error("reply inner message error, order: {}", order, e);
                        }
                    });
                    break;
                default:
                    throw new IllegalArgumentException();
            }
        }
    }

}
```



### 目录结构（举例说明）

```
customer-order
│  pom.xml													项目管理文件
│  readme.md												本文文档
├─doc														文档核心文件
├─src														Java标准层次目录结构
│  ├─main
│  │  ├─java
│  │  │  └─com
│  │  │      └─business
│  │  │          └─customer
│  │  │              └─order
│  │  │                  ├─adapter							各种外围的adapter，例如AppAdapter
│  │  │                  ├─application						应用层入口，进行读写分离
│  │  │                  │  └─dto							存放与外界交互的参数以及结果（这里存放的都是对内不进行复用的）
│  │  │                  │      ├─command   				写命令
│  │  │                  │      ├─query						读请求
│  │  │                  │      └─result 					返回结果
│  │  │                  ├─config							一些业务的配置项，存放业务相关的spring配置文件
│  │  │                  ├─constant							一些核心的配置参数（不外露的），例如：工单自动解锁的时长等
│  │  │                  ├─domain							整个项目最核心的部分，存放内部业务模型，只有接口，没有实现
│  │  │                  │  ├─clientsupplementation			用户补充内容领域
│  │  │                  │  │  ├─entity						用户补充内容实体
│  │  │                  │  │  ├─repository					用户补充内容仓储
│  │  │                  │  │  └─valueobject				用户补充内容值对象
│  │  │                  │  ├─order							工单领域
│  │  │                  │  │  ├─biz						工单领域的业务逻辑
│  │  │                  │  │  │  ├─processor				工单领域工单动作驱动器
│  │  │                  │  │  │  ├─saver					工单领域工单详情保存器
│  │  │                  │  │  │  └─status 					工单领域工单状态驱动器
│  │  │                  │  │  ├─entity						工单领域实体
│  │  │                  │  │  ├─repository					工单领域仓储
│  │  │                  │  │  ├─service					工单领域领域服务
│  │  │                  │  │  │  └─impl					工单领域领域服务实现
│  │  │                  │  │  └─valueobject				工单领域值对象
│  │  │                  │  └─shared						一些共享的东西，例如像PhoneNumber、IdentityCardNumber的值对象
│  │  │                  ├─infrastructure					基础设施层，是各个层的实现部分
│  │  │                  │  ├─adapter						adapter的实现
│  │  │                  │  ├─application					application的实现
│  │  │                  │  └─persistence					序列化存储相关
│  │  │                  │      ├─datamapper				聚合根到po或者po到聚合根的映射
│  │  │                  │      ├─mybatis					mybatis框架的实现
│  │  │                  │      │  ├─impl					mybatis-plus的ServiceImpl
│  │  │                  │      │  └─mapper					mybatis的mapper
│  │  │                  │      ├─po						序列化对象
│  │  │                  │      └─repository				仓储层的实现
│  │  │                  └─interfaces						外围的数据入口
│  │  │                      ├─assembler					各种转换器
│  │  │                      ├─event						领域事件的处理入口
│  │  │                      ├─facade						程序内部调用以及RPC调用的入口
│  │  │                      ├─http							对外部网关调用的http入口
│  │  │                      │  └─vo						http的请求参数
│  │  │                      └─schedule						定时任务的入口
│  │  └─resources											资源配置文件
│  │      └─mapper											mybatis的配置文件
│  └─test													测试包
└─target													编译包

customer-order-api
│  pom.xml													项目管理文件
├─src														Java标准层次目录结构
│  └─main
│      └─java
│          └─com
│              └─b
│                  └─customer
│                      └─order
│                          └─api		`					api结构
│                              ├─constant					一些对外的校验常量
│                              ├─dto						存放与外界交互的参数以及结果（对内进行复用的）
│                              │  ├─command					写命令
│                              │  ├─event					领域事件		
│                              │  ├─query					读请求
│                              │  └─result					返回结果
│                              ├─exception					异常
│                              └─facade						对外暴露的接口
└─target													编译包
```





## 资料参考

- 结合《领域驱动设计》的工程：[领域驱动工程样例](https://github.com/citerus/dddsample-core)
- 阿里DDD技术讲解：
  - [阿里技术专家详解DDD系列 第一讲：Domain Primitive](https://mp.weixin.qq.com/s?__biz=MzAxNDEwNjk5OQ==&mid=2650403892&idx=1&sn=a91fa477392e80f9420a8ca4d26bcace&chksm=83953c2cb4e2b53a6af3b5a82c3b7d7ed932bfe83f59877a935445ae89edd0ff4ee1c4e82fba&scene=21#wechat_redirect)
  - [阿里技术专家详解DDD系列 第二讲：应用架构](https://mp.weixin.qq.com/s?__biz=MzAxNDEwNjk5OQ==&mid=2650404060&idx=1&sn=cacf40d19528f6c2d9fd165151d6e8b4&chksm=83953cc4b4e2b5d2bd4426e0d2103f2e95715b682f3b7ff333dbb123eaa79d3e5ad24f64beac&scene=21#wechat_redirect)
  - [阿里技术专家详解DDD系列 第三讲：Repository模式](https://mp.weixin.qq.com/s?__biz=MzAxNDEwNjk5OQ==&mid=2650406692&idx=1&sn=4a4ac4168299d8ca1905a4f457ae4c59&chksm=8395373cb4e2be2a2d066a5ea4e631fd6270e969ce61883b488f61c1ce33fbc0b362ec9cbf7b&scene=21#wechat_redirect)
  - [阿里技术专家详解DDD系列 第四讲：领域层设计规范](https://mp.weixin.qq.com/s?__biz=MzAxNDEwNjk5OQ==&mid=2650414919&idx=1&sn=0ad1df1a1b0e2488f7faa21008fdbdd0&chksm=8396d75fb4e15e49341b07022780dcb8dca66a0efb7f129d4de86a5ef5d8a890f6e0d2fd6432&scene=21#wechat_redirect)
  - [阿里技术专家详解DDD系列 第五讲：聊聊如何避免写流水账代码](https://mp.weixin.qq.com/s?__biz=MzAxNDEwNjk5OQ==&mid=2650427571&idx=1&sn=bfc3c1c6f189965a1a4c7f3918012405&chksm=839698abb4e111bd5e02344f27d86c928ccfe4d3da1649817b02924c07f681fc1a7ea818f442&scene=178&cur_album_id=1452661944472977409#rd)
  - 对应工程代码：[工程代码](https://github.com/Air433/dddbook)
- vivo技术讲解：
  - [领域驱动设计(DDD)实践之路(一)](https://juejin.cn/post/6844904071174815752)
  - [领域驱动设计(DDD)实践之路(二)：事件驱动与CQRS](https://juejin.cn/post/6844904122659913735)
  - [领域驱动设计(DDD)实践之路(三)：如何设计聚合](https://juejin.cn/post/6844904158449893389)
- [美团DDD技术讲解](https://developer.aliyun.com/article/319159)
- [后端开发实践系列——领域驱动设计(DDD)编码实践](https://juejin.cn/post/6844903903104860174)
- [COLA技术架构](https://github.com/alibaba/COLA)
- [为什么域服务必须使用域对象作为参数和返回值？](https://stackoverflow.com/questions/14326230/why-must-domain-services-use-domain-objects-as-parameters-and-return-values)
- [如何发布和处理领域事件](http://www.kamilgrzybek.com/design/how-to-publish-and-handle-domain-events/)
- [DDD 限界上下文和 Java 模块](https://www.baeldung.com/java-modules-ddd-bounded-contexts)
- [工厂的入参是原始对象还是value object](https://stackoverflow.com/questions/11395031/ddd-factory-entity-value-object?rq=1)
- [DDD, Hexagonal, Onion, Clean, CQRS, … How I put it all together](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/)



## 要点

- application层只是做服务的编排，不做任何的计算逻辑
- domain service只是对象状态的变更，不做save的操作，不能注入repository
- domain service入参和出参都返回领域内的对象
- CQE对象入参全为细颗粒度



## 概述

#### Interface层：

- 承接消息的入口，转化入口参数
- interface层的表达不止为http协议，也有dubbo、soap、websocket、kafka等
- 每种协议独立一套的表达方式，避免同一表达；需要注意出参要有同一的格式，例如http协议同一返回StandardReposese对象
- 应该捕捉所有异常，避免异常信息的泄漏
- 不应意识到domain层的内部对象
- 用Bean Validation做对CQE对象的校验

#### Application层：

- application层做的是**服务的编排**，**不做任何的计算逻辑**；一般包含下面的操作
  - 数据校验
  - 通过Repository查询聚合根
  - 操作聚合根，对聚合根进行状态的变更
  - 通过Repository保存聚合根
  - 发送领域事件
- Command、Query、Event统称为CQE，他们三者作为application的入参，根据单ID查询的场景下可以直入；统一返回DTO对象，不能暴露domain的Entity和Value Object，使用DTO Assemble进行转换
- 不同方法使用不同的CQE，因为不同方法的语义是不一样的，如果复用同一CQE对象，其中一个方法入参的变动会导致全体的参数变动
- application层需要做简单的参数校验，例如：判空、字符串合法化判断，可以用Bean Validation解决
- 有异常信息可以直接抛出，因为在上层的interface层已经捕获所有异常
- 接收domain或者domain service里面抛出的领域事件，发布对应的领域事件

#### Domain层：

- Entity：
  - 有对应的id，一个Entity对应有一个唯一的id
  - 判断两个Entity是否相等应该直接判断id
  - id需要用一个对象进行包裹，防止id的唯一性变更
  - 一个聚合根对应有一个Repository
  - 封装业务的参数校验以及业务逻辑
  - 写方法一般来说返回是void，可以直接扔出领域事件，让application层进行事件抛出
- Value Object：
  - 没有id，参数都是**不可变**的，若改变里面的信息需要直接new一个实体
  - 没有对应的Repository
  - 有对应的业务操作函数，非纯POJO
- Domain Service：
  - 操作复杂的业务逻辑，往往含有两个以上的Entity的操作，如果只有操作一个Entity，可以把这些业务逻辑挪到这唯一的Entity里面
  - Domain Service不应该依赖Repository，只做对Entity的状态的变更
  - 注意和Application的区别，domain service是一个不必要的妥协，应该越少越好
- Repository：
  - 保存Entity的状态
  - 本质上只有save和find两种的方法
  - 实现类完成数据库存储的细节
- Factory：
  - 创建Entity对象，从0到1的过程
  - 入参是领域对象，非基本类型
  - 复杂构造的时候可能会依赖Repository

#### Infrastructure层：

- 用ACL防腐层将外部依赖转化为内部代码，隔离外部的影响



## 使用ACL的好处

- 适配器：便于适配其他服务接口
- 缓存：可以缓存频繁请求的数据
- 兜底：防止其他服务不可用导致核心功能的不可用
- 易于测试：可以方便地通过mock和stub进行单元测试
- 功能开关：控制功能的实现



## CQE的概念与使用

|        | Command            | Query           | Event            |
| ------ | ------------------ | --------------- | ---------------- |
| 语义   | "希望"能触发的操作 | 各种查询条件    | 已经发生过的事情 |
| 读/写  | 写                 | 只读            | 写               |
| 返回值 | DTO或Boolean       | DTO或Collection | Void             |

- CQE在interfaces层做校验，推荐使用Bean Validation实现
- 不要复用CQE对象，因为不同行为后续的差异会越来越大

