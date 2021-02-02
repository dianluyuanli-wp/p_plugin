/*
 * @Author: guanlanluditie 
 * @Date: 2021-01-29 11:39:22 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-01-29 11:45:26
 */

import React from 'react';
import Home from './page/home';
import CreateAccount from './page/createAccount';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function AppRouter() {
    return <Router>
        <Switch>
            {/* 账户创建页 */}
            <Route exact path='/createAccount' component={CreateAccount}/>
            {/* 首页 */}
            <Route path='' exact component={Home} />
        </Switch>
    </Router>
}

export default AppRouter;
