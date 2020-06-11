## JDK各个版本新特性

- 1.8
  - lambda表达式
  - Stream API
  - Interface默认方法
  - 新时间日期API
  - HashMap结构优化，新增红黑树和resize时的代码优化，ConcurrentHashMap采用CAS算法，不再使用分段锁，而且也引入了红黑树

- 1.7
  - switch可以使用String判断
  - 泛型实例化类型自动推断
  - 新的整数字面表达式方式：0b前缀和_连接符
  - try-with-resources：任何实现了java.lang.AutoCloseable接口或者实现了java.io.Closeable，可以保证在结束时候关闭
  - 可以捕获多个异常类型：使用|可以把相同异常处理逻辑集中到一个catch中

- 1.6
  - 可以使用JAXB来实现对象与XML之间的映射转换
  - 新增STAX的XML处理API
  - 新增Compiler API
  - 轻量级的Http Server
  - 脚本语言的支持



## 你遇到什么比较难忘的坑

- Spring里面，service层自调用本类方法导致@Transactional注解不生效；
- 遇到同事在使用分布式锁时，事务没有在分布式锁内提交，导致仍然出现脏数据的问题；
- Mysql join查询时，参与join字段的字符集编码不同，导致性能严重下降；
- 使用静态常量的Runtime Exception导致异常堆栈信息打印不正确；
- 使用Hystrix线程隔离导致在上下文中获取不到当前用户；
- 使用缓存时，需要先更新数据库，再删除缓存；
- mysql一般存储采用utf8mb4（4个字节），而不是utf8（3个字节）；
- 在spring里面使用编程式事务（TransactionDefinition）时，需要指定setTimeout和isolationLevel，因为没有显式地提交事务（代码中忘记写commit语句），就事务一直在等待，但是事务默认的setTimeout为-1，因此导致事务一直在等待的状态；
- 做压力测试时，系统级错误导致JVM虚拟机崩溃报错；
- 经验不足的时候，不知道spring是区分父子容器的，在spring mvc容器中扫描了所有类，不报错；但在spring中扫描所有类，就会报找不到controller异常。正常的做法是spring mvc容器扫描controller注解，而spring扫描其他的类；



## 分布式数据库和缓存双写一致性问题

### 先更新数据库，再更新缓存

- A线程更新数据库；
- B线程更新数据库；
- B线程更新缓存；
- 线程A更新缓存。



### 先删缓存，再更新数据库

- A线程进行写，删除缓存；
- B线程查询缓存不存在，去数据库查询得到旧值；
- B线程把旧值写入缓存；
- A线程将新值写入数据库。



### 先更新数据库，再删缓存（推荐默认使用方案）

- 缓存刚好失效；
- A线程查询数据库，得到旧值；
- B线程将新值写入数据库；
- B线程删除缓存；
- A线程将查询到的旧值写入缓存。



## 使用过的高级场景

### 布隆过滤器

**一千万**的手机号，需要进行数据过滤，使用hash表方式存储需要消耗2（char占用两个byte） * 11（手机号码为11位） * 10000000（一千万手机号） = 220000000（byte） = **209.8（mb）**

使用布隆过滤器，设定参数误判率：**3%**，一共使用了72984408位进行存储，一共消耗内存为72984408（占用的位数） / 8 / 1024 / 1024 = **8.7（mb）**，数据压缩了24倍。



### Redis中的bitset

记录用户的每天登录情况，每日创建一个登录一个bitset用于保存当天所有的用户登录情况，使用用户自增的id作为对应的key，**一千万用户量**每日仅仅使用**1.19mb**的内存，如果几天都登录，则直接把bitset与操作即可。每日进行跑批处理，删除前30天在redis中的登录记录，建立下一天的登录记录表，用户进行登录时通过异步的方式使redis对应的标记位值1。



### 设计模式的使用场景

实现关系（Realization）：表现为实现接口，语义为like-a，虚线+空心箭头表示

泛化关系（Generalization）：表现为继承，语义为is-a，实线+空心箭头表示

依赖关系（Dependency）：是一种使用的关系，基于临时的关联，通过局部变量、方法参数或者静态方法调用另外一个类完成某些职责，虚线+箭头表示

关联关系（Association）：是对象之间一种引用的关系，最常用，实线+实心箭头表示

聚合关系（Aggregation）：强关联关系，是整体和部分的关系，部分能够超越整体的生命周期，语义为has-a，实线+空心菱形箭头

组合关系（Composition）：最强的关联关系，是整体和部分的关系，部分不能脱离整体存在，语义为cxmatins-a关系，实线+实心菱形箭头

![类图表示](C:/Users/MinChiang/Desktop/面试笔记/assets/类图表示.png)



- 策略模式：电商订单，优惠计算器，不同类型的订单使用不同类型的优惠计算器；

![策略模式](C:/Users/MinChiang/Desktop/面试笔记/assets/策略模式.png)

- 观察者模式：电商商品价格变动，推送通知给第三方平台和数据展示面板；

![观察者模式](C:/Users/MinChiang/Desktop/面试笔记/assets/观察者模式.png)

- 装饰者模式：电商收银自动使用优惠，满减、使用积分扣减；
- 工厂模式：
- 单例模式：大部分使用在程序的公共包，以及一些全局的配置管理类中；
- 命令模式：
- 适配器模式：
- 模板方法模式：
- 迭代器与组合模式：
- 状态模式：在合同管理平台运用到，分为审核中、待审核、未审核、审核完成，四个状态会进行相互跳转；

![状态机模式](C:/Users/MinChiang/Desktop/面试笔记/assets/状态机模式.png)

- 代理模式：



### 性能测试

#### 测试流程

1. 在Windows Server中安装并且配置LoadRunner；
2. 调整Windows Server系统和Linux系统参数；
3. 编写脚本，脚本可以使用Java或者C编写（C较Java而言会好一些，C的资源会马上释放，而JVM有垃圾回收机制，会对负载生成有一定的影响）；
4. 选择场景并运行压力测试，使用nmon采集对应的磁盘IO、内存使用率、CPU占用率等系统运行情况，使用jvisualvm采集JVM虚拟机的运行参数；
5. 使用nmon analyser导出系统级参数报表。



#### 名词解释

- TPS：Transaction Per Second，每秒的交易量，确定在某一个时刻的机器负载情况；
- ART：Average Transaction Reponse Time，每一个交易的平均处理时间；
- CPU占用率：含系统内核与用户对CPU的占用；
- 内存占用率：含系统内核与用户对内存的占用；



#### 参数调优

- Linux文件最大打开数量（句柄数）：

```
vim /etc/security/limits.conf
* soft nofile 65535
* hard nofile 65535

vim /etc/security/limits.d/20-nproc.conf
* soft nproc unlimited
```

- Windows Server参数调优：

```
减小HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\TcpTimedWaitDelay对应的值
```



## 常见应用端口

- Zookeeper：
  - 服务端口：2181

  - leader选举端口：3888
  - 集群通讯使用：2888（leader监听此端口）
- Mysql：
  - 服务端口：3306
- Oracle：
  - 服务端口：1521
- Redis：
  - 服务端口：6379
- Kafka：
  - 服务端口：9092
- ElasticSearch：
  - restful服务端口：9200
  - client服务端口：9300



## 看过什么网站和有用的书籍

- Stackoverflow：https://stackoverflow.com/
- Github：https://github.com/
- Java Code Example：https://www.programcreek.com/java-api-examples/index.php
- 并发编程网：http://ifeve.com/
- 软件架构设计
- Java高并发程序设计
- 深入理解JVM虚拟机
- Head First Parttern Design