/*
 * @Author: guanlanluditie 
 * @Date: 2021-01-22 22:36:26 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-03-07 16:04:23
 */
import React, { FC, useEffect, useReducer, useMemo } from 'react';
import { runInAction } from 'mobx';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PAGE_NAME } from '@constants/app';
import { useStores } from '@utils/useStore';
import { globalStoreType } from '../../store';
import { observer } from 'mobx-react';
import { myFormatBalance, addressFormat } from '@utils/tools';
import { Spin, message } from 'antd';
import copyContent from 'copy-to-clipboard';
import s from './index.css';
import cx from 'classnames';

interface homeStatus {
    balance?: string,
    balanceHasInit?: boolean
}

const HomePage:FC = function() {
    const history = useHistory();
    let { t ,i18n} = useTranslation();
    const globalStore = useStores('GlobalStore') as globalStoreType;
    const { balance, currentAccount } = globalStore;

    function stateReducer(state: Object, action: homeStatus) {
        return Object.assign({}, state, action);
    }
    const [stateObj, setState] = useReducer(stateReducer, { balance, balanceHasInit: false } as homeStatus);
    //  是否初始化完成
    const hasInit = useMemo(() => globalStore.hasInit, [globalStore.hasInit]);
    function jump(path: string) {
        console.log(path, 'path');
        history.push(path);
    }
    function changeLanguage() {
        i18n.changeLanguage(i18n.language=='en'?'zh':'en')
    }

    useEffect(() => {
        if(globalStore.hasInit && currentAccount?.address) {
            globalStore.api.query.system.account(currentAccount.address).then(a => {
                runInAction(() => {
                    globalStore.balance = myFormatBalance(a.data.free);
                })
                setState({
                    balance: myFormatBalance(a.data.free),
                    balanceHasInit: true
                })
            })
        }
    }, [globalStore.hasInit])

    function statusIcon() {
        return !hasInit ? <div className={s.connetIcon}>{t('home:connecting')}</div> : null;
    }

    function copyClick() {
        const { address } = currentAccount;
        copyContent(address);
        message.success(t('home:copy success'));
    }

    function AccountPage() {
        const target = currentAccount;
        const { address, meta } = target;
        return (
            <>
                <div className={s.head}>
                    <div className={s.leftTitle}>
                        <div className={s.titleIcon} />
                        <div>Kitter {statusIcon()}</div>
                    </div>
                    <div className={s.toolIcon} onClick={() => jump(PAGE_NAME.SET_PANEL)}/>
                </div>
                <div className={s.account}>
                    <div className={s.aName}>{meta.name}</div>
                    <div>
                        <div className={s.address}>{addressFormat(address)}</div>
                        <div className={s.copyIcon} onClick={() => copyClick()}/>
                    </div>
                </div>
                <div className={s.pIcon}/>
                <Spin spinning={!stateObj.balanceHasInit}>
                    <div className={s.balance}>{stateObj.balance} DOT</div>
                    <div className={s.usd}>$0.00 USD</div>
                </Spin>
                <div className={s.tWrap}>
                    <div onClick={() => jump(PAGE_NAME.RECIENT)}>
                        <div className={s.inAccount} />
                        {t('home:receiving')}
                    </div>
                    <div onClick={() => jump(PAGE_NAME.TRANSFER)}>
                        <div className={s.out}/>
                        {t('home:transfer')}
                    </div>
                </div>
                <div className={s.bottomRouter}>
                    <div className={s.iconWrap} onClick={() => jump(PAGE_NAME.DEMOCRACY)}>
                        <div className={cx(s.img, s.democracy)}/>
                        <div className={s.bTitle}>网络治理</div>
                    </div>
                    <div className={s.iconWrap}>
                        <div className={cx(s.img, s.record)}/>
                        <div className={s.bTitle}>交易记录</div>
                    </div>
                    <div className={s.iconWrap}>
                        <div className={cx(s.img, s.browser)}/>
                        <div className={s.bTitle}>区块浏览器</div>
                    </div>
                </div>
            </>
        )
    }
    function homeWithoutAccount() {
        return <>
            <div className={s.wrap}>
                <div className={s.loggo} onClick={changeLanguage}/>
            </div>
            <div className={s.word}>{t('home:kitter is a polkadot wallet')}</div>
            <div className={s.word}>{t('home:welcome to use')}</div>
            <div className={cx(s.btn, s.create)} onClick={() => jump(PAGE_NAME.CREATE_ACCOUNT)}>{t('home:create wallet')}</div>
            <div className={cx(s.btn, s.importIcon)} onClick={() => jump(PAGE_NAME.RETRIEVE_WALLET)}>{t('home:import wallet')}</div>
        </>
    }
    const hasAccount = currentAccount.address;
    console.log(hasAccount, currentAccount);
    return (
        <div>
            {hasAccount ? AccountPage() : homeWithoutAccount()}
        </div>
    )
}

export default observer(HomePage);