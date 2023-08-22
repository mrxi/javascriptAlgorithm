初始化 npm init 或者 npm init -y
就会生成一个 package.json文件夹
package.json 中 main 是假如你把包上传之后，别人需要下载你的包时候
 就是你的入口文件 一般 mian:'index.js'
 我们下载完依赖 在对应项目种使用 就是 import * as axios from 'axios'
 如果我们 假如最终导出的是 axios包中的src/util.js
那我们引入时候就需要 import * as axios from 'axios/src/util.js'
这样就要别人阅读你的源码，所以这里做了处理，为了简单化 这里就mian为我们
提供了 出口文件地址
需要下载什么依赖  就 npm  install xxx 
npm install axios 默认就是  npm install axios -save 
这是生产环境 
比如 webpack webpack-cli 就是开发环境  因为它存在的价值 
就是打包 在项目中不会用到  我们需要安装时候 npm  install webpack -D

对照 package.json  dependencies 里面的依赖就是生产环境(就是项目中用到的)
devDependencies  里面的依赖就是开发环境 比如打包工具 那些

还有一个 peerDependencies 这个里面 的依赖是 这个包必须依赖的包
就是 也就是你依赖的一个包，它必须是以另外一个宿主包为前提的 


我们在package.json种经常可以看到 版本号 ^5.88.2 必须是 x.y.z格式
x对应 主版本号 
y对应 次版本号
z对应 修改号
还有 就前面这^ 代表着  主版本(x)不变 y(次版本号),z(修改号) 如果有
最新的版本号 比如 ^5.98.3 就可以下载更新最新的 
如果 前面是 ~ 代表着  主版本(x)不变 y(次版本号)不变,z(修改号) 如果有
最新的版本号 比如 ^5.88.6 就可以下载更新最新的 
但是 我们还有一个 package-Lock.json一般我们不删除会锁死
如果我们想跟新可以删掉  package-Lock.json 重新 npm install 就会是
最新版本

