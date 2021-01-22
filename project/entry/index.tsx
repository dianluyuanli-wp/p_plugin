import React from 'react';
import ReactDom from 'react-dom';
import Home from './page/home';
import s from './index.css';

//  挂载组件
const mountNode = document.getElementById('app');

//  原始前端渲染 在html的节点上挂载组件
ReactDom.render((
    <div className={s.wrapper}>
        <Home />
    </div>

),mountNode);