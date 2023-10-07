## 面试相关

### 树根互联（架构师）

#### 问题：

- 你是如何评估数据量，给用户进行环境搭建，数据库分库分表的
- kafka宕机了，数据做不了分发怎么办
- 如何做维度的分表，比如商家+用户+订单表，怎么快速查询
- 数据前后变化了，例如客户端发的是AB这样顺序的报文，但是后端收到的是BA，怎么办
- MVCC频繁对表进行插入怎么办
- 职业规划
- 你为什么从上家公司离职

#### 缺点：

- 所有都是结合实际场景来的，面试前要多看看这家公司负责什么方向的内容
- 多考虑项目从启动到后期维护的生命周期，回答问题不能直接就去回答一些代码层面的东西，要考虑大而全
- 要多考虑分库分表的内容，这方面自己很薄弱，被问到就非常被动
- 思考的问题要全面，不能被面试官的话套进去，有些时候面试官自己都意识不到场景有问题
- 不能自我暴露缺点
- 要去了解看看k8s的东西，他们公司用k8s发布的



### 网易（资深Java）

#### 问题：

- dubbo

  - 负载均衡算法，如果让你自己写，你会写一个什么算法

  - dubbo下线怎么做的

  - 如何实现优雅下线

  - 注册中心怎么做，你们的s2s的原理是什么，和zookeeper还有consul有什么区别
  - 如果调用方类成员变量多/少一个字段，提供方少/多一个字段，会怎么样，dubbo会抛出什么异常，为什么

- kafka

  - 你们公司用kafka有什么场景？

  - 如果消费方kafka的消费方宕机了，如何快速解决

  - 说明一下分区和副本的区别

  - 什么是高水位和ISR

  - 你认为kafka为什么那么快，有什么设计特别优秀的地方
  - kafka消息积压了怎么办

- spring cloud

  - dubbo和spring cloud你认为有什么异同点

  - dubbo使用的协议和spring cloud有什么不同


- 你们的链路追踪是怎么做的
- ELK有用过吗？怎么做的
- 怎么切流，怎么做存量数据迁移的东西
- 做数据对比切流的时候，有没有落地什么通用的功能
- G1、CMS、ZGC怎么做的，有什么共同点
- 一些乱七八糟的项目问题
- 你在公司里面，如何使用AI结合对应的日常开发场景
- 你遇到什么挑战，说一下
- 你带了几个人

#### 缺点：

1. 回答太过冗长，啰啰嗦嗦
2. 控制好回答的量和时长，实际一面大概有1个小时，太长了
3. 某些会的东西要尽量给面试官面子，不能回答太周全了，可能要装一下不懂，给面试官深挖的机会
4. 结合AI方面，不能直接回答没有了解过，而是应该随便聊一下天，这样显得自己没有前瞻性



### 联通产业互联（笔试）

```java
public class Father {

    private String field = "father";

    public Father() {
        callName();
    }

    public void callName() {
        System.out.println(this.field);
    }

    public static class Sub extends Father {

        private String field = "sub";
        private int age = 20;

        public void callName() {
            System.out.println(this.field);
        }

        public Sub() {

        }

    }

    public static void main(String[] args) {
        Sub sub = new Sub();
    }

}
```

