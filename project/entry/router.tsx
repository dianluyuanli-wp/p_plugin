/*
 * @Author: guanlanluditie 
 * @Date: 2021-01-29 11:39:22 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-13 23:37:01
 */

import React, { useEffect } from 'react';
import { MobXProviderContext  } from 'mobx-react';
import Home from './page/home';
import GlobalStore from './store';
import CreateAccount from './page/createAccount';
import CreateAccountStore from './page/createAccount/store';
import UserAgreement from './page/userAgreement';
import Recient from './page/receipt';
import { PAGE_NAME } from '@constants/app';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function AppRouter() {
    const storeObj = {
        GlobalStore,
        CreateAccountStore
    }

    return <MobXProviderContext.Provider value={storeObj}>
        <Router>
            <Switch>
                {/* 账户创建页 */}
                <Route exact path={PAGE_NAME.CREATE_ACCOUNT} component={CreateAccount}/>
                {/* 用户协议 */}
                <Route exact path={PAGE_NAME.USER_AGREEMENT} component={UserAgreement}/>
                {/* 收款页 */}
                <Route exact path={PAGE_NAME.RECIENT} component={Recient} />
                {/* 首页 */}
                <Route path='' exact component={Home} />
            </Switch>
        </Router>
    </MobXProviderContext.Provider>
}

export default AppRouter;
