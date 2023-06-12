## Dubbo

### 加载流程

ExtensionLoader

- 样例：private static final Protocol protocol = ExtensionLoader.getExtensionLoader(Protocol.class).getAdaptiveExtension();

  1. 加载接口Protocol的@SPI注解

  2. 在loadExtensionClasses方法中，查找对应的配置方法，查找顺序：

     1. META-INF/dubbo/internal/
     2. META-INF/dubbo/
     3. META-INF/services/

     对应的配置名字为：接口的全称，例如在dubbo-rpc-injvm工程中，对应的Protocol实现文件在META-INF/dubbo/internal/，文件名字为org.apache.dubbo.rpc.Protocol，内容如下

     ```txt
     injvm=org.apache.dubbo.rpc.protocol.injvm.InjvmProtocol
     ```

  3. 由ExtensionLoader.createAdaptiveExtension()生成对应的实现类，本质上都是简单地实现接口而已

     ```java
     package org.apache.dubbo.rpc;
     
     import org.apache.dubbo.common.extension.ExtensionLoader;
     
     public class Protocol$Adaptive implements org.apache.dubbo.rpc.Protocol {
     
         public void destroy() {
             throw new UnsupportedOperationException("The method public abstract void org.apache.dubbo.rpc.Protocol.destroy() of interface org.apache.dubbo.rpc.Protocol is not adaptive method!");
         }
     
         public int getDefaultPort() {
             throw new UnsupportedOperationException("The method public abstract int org.apache.dubbo.rpc.Protocol.getDefaultPort() of interface org.apache.dubbo.rpc.Protocol is not adaptive method!");
         }
     
         public org.apache.dubbo.rpc.Exporter export(org.apache.dubbo.rpc.Invoker arg0) throws org.apache.dubbo.rpc.RpcException {
             if (arg0 == null) throw new IllegalArgumentException("org.apache.dubbo.rpc.Invoker argument == null");
             if (arg0.getUrl() == null)
                 throw new IllegalArgumentException("org.apache.dubbo.rpc.Invoker argument getUrl() == null");
             org.apache.dubbo.common.URL url = arg0.getUrl();
             String extName = (url.getProtocol() == null ? "dubbo" : url.getProtocol());
             if (extName == null)
                 throw new IllegalStateException("Failed to get extension (org.apache.dubbo.rpc.Protocol) name from url (" + url.toString() + ") use keys([protocol])");
             org.apache.dubbo.rpc.Protocol extension = (org.apache.dubbo.rpc.Protocol) ExtensionLoader.getExtensionLoader(org.apache.dubbo.rpc.Protocol.class).getExtension(extName);
             return extension.export(arg0);
         }
     
         public org.apache.dubbo.rpc.Invoker refer(java.lang.Class arg0, org.apache.dubbo.common.URL arg1) throws org.apache.dubbo.rpc.RpcException {
             if (arg1 == null) throw new IllegalArgumentException("url == null");
             org.apache.dubbo.common.URL url = arg1;
             String extName = (url.getProtocol() == null ? "dubbo" : url.getProtocol());
             if (extName == null)
                 throw new IllegalStateException("Failed to get extension (org.apache.dubbo.rpc.Protocol) name from url (" + url.toString() + ") use keys([protocol])");
             org.apache.dubbo.rpc.Protocol extension = (org.apache.dubbo.rpc.Protocol) ExtensionLoader.getExtensionLoader(org.apache.dubbo.rpc.Protocol.class).getExtension(extName);
             return extension.refer(arg0, arg1);
         }
     
     }
     ```



配置refresh方法

1. 配置CompositeConfiguration
   1. SystemConfiguration：从System.getProperty获取
   2. 从appExternalConfigs获取
   3. 从externalConfigs获取
   4. PropertiesConfiguration：
      1. 先从System.getProperty获取
      2. 获取不到则读取应用启动配置的dubbo.properties.file以加载文件名
      3. 获取不到则读取环境变量ENV中的dubbo.properties.file以加载文件名
      4. 若取不到则取dubbo.properties作为文件名
2. 调整配置读取顺序
   - 如果是以配置中心优先：SystemConfiguration -> AppExternalConfiguration -> ExternalConfiguration -> AbstractConfig -> PropertiesConfiguration
   - 非配置中心优先：SystemConfiguration -> AbstractConfig -> AppExternalConfiguration -> ExternalConfiguration -> PropertiesConfiguration
3. 获取配置中的所有setter方法，便利所有的属性，从CompositeConfiguration里面重新加载对应的值



一个服务是由一个url地址组成建立链接的，那一个进程有多个服务会不会建立多个链接？

不会，因为在AbstractZookeeperTransporter.connect()方法中，建立ZookeeperClient时，现在zookeeperClientMap找出有相同连接地址的ZookeeperClient，然后复用对应的ZookeeperClient

- 先拿出整个服务URL的zookeeper链接地址，例如zookeeper://127.0.0.1:2181?127.0.0.1:8989,127.0.0.1:9999
- 提取所有地址，变成[zookeeper://127.0.0.1:2181,127.0.0.1:8989,127.0.0.1:9999]列表
- 循环遍历上面的地址列表，查找zookeeperClientMap里面有没有对应的ZookeeperClient，如果有则返回对应的链接复用
- 便利完之后如果找不到，则建立链接



ServiceConfig启动流程

- completeCompoundConfigs：设置一些共用的配置，从provider、module、application里面获取设置的数据
- startConfigCenter：启动配置中心，有对应的启动配置加载读取流程

