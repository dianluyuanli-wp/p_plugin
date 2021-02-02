/*
 * @Author: guanlanluditie 
 * @Date: 2021-01-28 00:13:03 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-01-29 11:45:18
 */
import React from 'react';
import ReactDom from 'react-dom';
import Home from './page/home';
import '@utils/i18n';
import CreateAccount from './page/createAccount';
import AppRouter from './router';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//  挂载组件
const mountNode = document.getElementById('app');

function renderApp() {
    //  原始前端渲染 在html的节点上挂载组件
    ReactDom.render((
        <AppRouter />
    ),mountNode);
}

renderApp();

if (module.hot) {
    module.hot.accept('./router.tsx', function() {
        console.log('Accepting the updated printMe module!');
        renderApp();
        // 引入的文件的操作
        // ........
    })
 }	