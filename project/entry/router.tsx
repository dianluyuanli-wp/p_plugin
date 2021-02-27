/*
 * @Author: guanlanluditie 
 * @Date: 2021-01-29 11:39:22 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-27 21:37:19
 */

import React from 'react';
import { MobXProviderContext  } from 'mobx-react';
import Home from './page/home';
import GlobalStore from './store';
import CreateAccount from './page/createAccount'; //    创建账号
import CreateAccountStore from './page/createAccount/store'; // 
import UserAgreement from './page/userAgreement'; //    用户协议
import Recient from './page/receipt'; //    收款
import Transfer from './page/transfer'; //  转账
import SetPanel from './page/setPanel'; //  设置面板
import WalletManage from './page/walletManage'; //  钱包入口
import RetrieveWallet from './page/retriveWallet/entry'; // 恢复账号-入口
import RW_MNEMONIC from './page/retriveWallet/mnemonic'; // 助记词恢复账号
import S_W_M_ENTRY from './page/setWalletDetial/entry'; //  钱包设置-入口
import SW_EDIT_NAME from './page/setWalletDetial/editName'; //  单个账号-修改名字
import SW_EDIT_SECRET from './page/setWalletDetial/changeSecret'; //    单个账号-改密码
import SW_EDIT_BACKUP  from './page/setWalletDetial/backupKeyStore'; // 单个账号-备份keyStore文件
import SW_EDIT_DELETE from './page/setWalletDetial/deletaAccount'; //   单个账号-删除账号
import RW_KEYSTORE from './page/retriveWallet/keyStore'; // 恢复钱包-keystore
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
                        <Route exact path={PAGE_NAME.RW_KEYSTORE} component={RW_KEYSTORE}/>
                    </>
                }} />
                {/* 单个钱包配置 */}
                <Route path={PAGE_NAME.SINGLE_WALLTE_MANAGE} render={() => {
                    return <>
                        <Route exact path={PAGE_NAME.SINGLE_WALLTE_MANAGE} component={S_W_M_ENTRY}/>
                        <Route exact path={PAGE_NAME.SW_EDIT_NAME} component={SW_EDIT_NAME}/>
                        <Route exact path={PAGE_NAME.SW_EDIT_SECRET} component={SW_EDIT_SECRET}/>
                        <Route exact path={PAGE_NAME.SW_EDIT_BACKUP} component={SW_EDIT_BACKUP}/>
                        <Route exact path={PAGE_NAME.SW_EDIT_DELETE} component={SW_EDIT_DELETE}/>
                    </>
                }} />
                {/* 首页 */}
                <Route path='' exact component={Home} />
            </Switch>
        </Router>
    </MobXProviderContext.Provider>
}

export default AppRouter;
