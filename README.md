project create by create React app

安装和初始化#
$ npm install -g create-react-app

# 注意：工具会自动初始化一个脚手架并安装 React 项目的各种必要依赖，如果在过程中出现网络问题，请尝试配置代理或使用其他 npm registry。
$ create-react-app my-app

$ cd my-app
$ npm start



引入 antd-mobile#
$ npm install antd-mobile --save


head 配置

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
  <script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
  <script>
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
      }, false);
    }
    if(!window.Promise) {
      document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
    }
  </script>
</head>


引入组件
packge.json:

{
  "name": "fd-web",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "antd-mobile": "^2.1.8",
    "babel-plugin-import": "^1.7.0",
    "echarts": "^4.0.4",
    "lrz": "^4.9.40",
    "rc-checkbox": "^2.1.5",
    "react": "^16.3.2",
    "react-codedown": "^0.1.6",
    "react-dom": "^16.3.2",
    "react-radio-group": "^3.0.3",
    "react-router": "^4.2.0",
    "react-router-dom": "^4.2.2",
    "react-scripts": "1.1.4",
    "react-signature-canvas": "^1.0.0-alpha.1",
    "react-sticky": "^6.0.2",
    "react-viewer": "^2.4.0",
    "react-zmage": "^0.1.7",
    "trim-canvas": "^0.1.2"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}


其它组件引用详细参考 mobile.ant.design


路由运用react-router4 

项目内文件 ：src/components/common/routes.js
api：http://reacttraining.cn/web




项目开发配置过程：
1.git clone https://github.com/StveenLi/fd-safe-web
2.cd XXX
3.npm i
4.npm start

发布过程：
npm i serve --save
npm run build
serve -s -p XX(端口) build


项目模块
assets-资源模块（icon\img\file）
audits-审核模块
{
	签名模块：    
	"react-signature-canvas": "^1.0.0-alpha.1" 
	统计模块：http://echarts.baidu.com/
	npm install --save echarts-for-react
	图片上传：
	全部采用base64模式
	定位信息：

}
check-考核模块
common-公共资源模块
config-配置模块
{
	数据层：fetch
	封装方法：api--Requester class
}
home-首页模块
law-法律模块
navbar-标题模块
signature-签名模块
train-培训模块
user-用户模块


其它详细参见项目代码













