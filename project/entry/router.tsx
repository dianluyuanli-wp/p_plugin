/*
 * @Author: guanlanluditie 
 * @Date: 2021-01-29 11:39:22 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-17 17:28:31
 */

import React from 'react';
import { MobXProviderContext  } from 'mobx-react';
import Home from './page/home';
import GlobalStore from './store';
import CreateAccount from './page/createAccount';
import CreateAccountStore from './page/createAccount/store';
import UserAgreement from './page/userAgreement';
import Recient from './page/receipt';
import Transfer from './page/transfer';
import SetPanel from './page/setPanel';
import WalletManage from './page/walletManage';
import RetrieveWallet from './page/retriveWallet/entry';
import RW_MNEMONIC from './page/retriveWallet/mnemonic';
import RetrieveStore from './page/retriveWallet/store';
import { PAGE_NAME } from '@constants/app';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function AppRouter() {
    const storeObj = {
        GlobalStore,
        CreateAccountStore,
        RetrieveStore,
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
                {/* 转账页 */}
                <Route exact path={PAGE_NAME.TRANSFER} component={Transfer} />
                {/* 设置 */}
                <Route exact path={PAGE_NAME.SET_PANEL} component={SetPanel} />
                {/* 钱包管理 */}
                <Route exact path={PAGE_NAME.WALLET_MANAGE} component={WalletManage} />
                {/* 恢复钱包 */}
                <Route path={PAGE_NAME.RETRIEVE_WALLET} render={() => {
                    return <>
                        <Route exact path={PAGE_NAME.RETRIEVE_WALLET} component={RetrieveWallet}/>
                        <Route exact path={PAGE_NAME.RW_MNEMONIC} component={RW_MNEMONIC}/>
                    </>
                }} />
                {/* 首页 */}
                <Route path='' exact component={Home} />
            </Switch>
        </Router>
    </MobXProviderContext.Provider>
}

export default AppRouter;
