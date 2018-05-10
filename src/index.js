import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'antd-mobile/dist/antd-mobile.css';
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
//注意，global对象相当于浏览器里面的window，不要把过于庞大的函数对象放在这里面，应该放一些小而常用的
