## 基础配置

### Npm配置

- 下载最新版的Nodejs

- 在Nodejs文件夹中新建`node_global`和`node_cache`两个文件夹

- 在环境变量中配置下面的内容

  ```
  NODE_HOME -> E:\Tools\Nodejs\node-v20.12.2-win-x64
  NODE_GLOBAL -> E:\Tools\Nodejs\node_global
  NODE_PATH -> %NODE_GLOBAL%\node_modules
  ```

- 在环境变量的Path中设置

  ```
  %NODE_HOME%
  %NODE_GLOBAL%
  %NODE_PATH%
  ```

- 命令行中执行下面的命令

  ```powershell
  npm config set prefix "E:\Tools\Nodejs\node_global"
  npm config set cache "E:\Tools\Nodejs\node_cache"
  ```

- **重启命令行，因为配置以后命令行需要重新启动才能获取到新的环境变量**

- 测试安装，在命令行中执行

  ```powershell
  npm install -g nrm
  ```

- 选择并使用淘宝的官方镜像，在命令行中执行

  ```powershell
  nrm use taobao	# 使用淘宝镜像
  nrm ls	# 列出所有镜像
  ```

- 清除和移动已有依赖的包，可选

  - 删除：C:\Users\{用户}\AppData\Local\npm-cache
  - 在Nodejs的安装目录E:\Tools\Nodejs\node-v20.12.2-win-x64\node_modules下 ，除了corepack和npm文件夹，其他文件夹移动到E:\Tools\Nodejs\node_global中

- 校验配置，下面列出基本配置内容

  ```
  PS E:\workspace\blog> npm config list
  ; "user" config from C:\Users\MinChiang\.npmrc
  
  cache = "E:\\Tools\\Nodejs\\node_cache"
  home = "https://npmmirror.com"
  prefix = "E:\\Tools\\Nodejs\\node_global"
  registry = "https://registry.npmmirror.com/"
  ```
  
  

### Yarn配置

- 安装yarn

  ```powershell
  npm i -g yarn
  ```

- 在Nodejs文件夹中新建`yarn_global`和`yarn_cache`两个文件夹

- 在环境变量中配置下面的内容

  ```
  YARN_GLOBAL -> E:\Tools\Nodejs\yarn_global
  YARN_BIN -> %YARN_GLOBAL%\bin
  ```

- 在环境变量的Path中设置

  ```
  %YARN_GLOBAL%
  %YARN_BIN%
  ```

- 命令行中执行下面的命令

  ```powershell
  yarn config set prefix "E:\Tools\Nodejs\yarn_global"
  yarn config set global-folder "E:\Tools\Nodejs\yarn_global"
  yarn config set cache-folder "E:\Tools\Nodejs\yarn_cache"
  ```

- **重启命令行，因为配置以后命令行需要重新启动才能获取到新的环境变量**

- 测试安装typescript，在命令行中执行

  ```powershell
  yarn global add typescript
  ```

- 校验配置，下面列出基本配置内容

  ```powershell
  PS E:\workspace\blog> yarn config list
  yarn config v1.22.22
  info yarn config
  {
    'version-tag-prefix': 'v',
    'version-git-tag': true,
    'version-commit-hooks': true,
    'version-git-sign': false,
    'version-git-message': 'v%s',
    'init-version': '1.0.0',
    'init-license': 'MIT',
    'save-prefix': '^',
    'bin-links': true,
    'ignore-scripts': false,
    'ignore-optional': false,
    registry: 'https://registry.yarnpkg.com',
    'strict-ssl': true,
    'user-agent': 'yarn/1.22.22 npm/? node/v20.12.2 win32 x64',
    'cache-folder': 'E:\\Tools\\Nodejs\\yarn_cache',
    'global-folder': 'E:\\Tools\\Nodejs\\yarn_global',
    lastUpdateCheck: 1713187564203,
    prefix: 'E:\\Tools\\Nodejs\\yarn_global',
    bin: 'E:\\Tools\\Nodejs\\yarn_global\\bin',
    global: 'E:\\Tools\\Nodejs\\yarn_global'
  }
  info npm config
  {
    cache: 'E:\\Tools\\Nodejs\\node_cache',
    registry: 'https://registry.npmmirror.com/',
    home: 'https://npmmirror.com',
    prefix: 'E:\\Tools\\Nodejs\\node_global',
    bin: 'E:\\Tools\\Nodejs\\yarn_global\\bin',
    global: 'E:\\Tools\\Nodejs\\yarn_global'
  }
  Done in 0.06s.
  ```

  