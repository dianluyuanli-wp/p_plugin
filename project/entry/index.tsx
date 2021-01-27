/*
 * @Author: guanlanluditie 
 * @Date: 2021-01-28 00:13:03 
 * @Last Modified by:   guanlanluditie 
 * @Last Modified time: 2021-01-28 00:13:03 
 */
import React from 'react';
import ReactDom from 'react-dom';
import Home from './page/home';
import '@utils/i18n';
import CreateAccount from './page/createAccount';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//  挂载组件
const mountNode = document.getElementById('app');

//  原始前端渲染 在html的节点上挂载组件
ReactDom.render((
    <Router>
        <Switch>
            {/* 账户创建页 */}
            <Route exact path='/createAccount' component={CreateAccount}/>
            {/* 首页 */}
            <Route path='' exact component={Home} />
        </Switch>
    </Router>
),mountNode);