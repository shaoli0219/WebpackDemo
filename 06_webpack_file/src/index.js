/**
 * webpack打包入口文件
 */

// polyfill会转译所有js新语法
// import '@babel/polyfill'

import data from './data.json';

// 引入样式文件
import './css/main.css';
import './css/main.less';

// 引入图片
import cartNano from './image/cartNano.png';

console.log(data);

const showMsg = () => {
  // eslint-disable-next-line
  alert('Hello');
};

// 挂载到全局作用域
// eslint-disable-next-line
window.showMsg = showMsg;

const p = new Promise(
  (resolve) => {
    setTimeout(() => {
      console.log('Promise is working');
      resolve();
    }, 1000);
  },
);
console.log(p);

// eslint-disable-next-line
const img = new Image();
img.src = cartNano;

// eslint-disable-next-line
document.body.append(img);
