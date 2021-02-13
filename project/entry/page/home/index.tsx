/*
 * @Author: guanlanluditie 
 * @Date: 2021-01-22 22:36:26 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-13 15:30:29
 */
import React, { FC, useEffect, useReducer, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ADDRESS_ARRAY } from '@constants/chrome';
import { useStores } from '@utils/useStore';
import { globalStoreType } from '../../store';
import { observer } from 'mobx-react';
import { formatBalance } from '@polkadot/util';
import { myFormatBalance } from '@utils/tools';
import { Spin } from 'antd';
import { getStorage, setStorage } from '@utils/chrome';
import s from './index.css';
import cx from 'classnames';

const mock = {
    '5EhmYogkqoyHiCDEfMWvQkEBcJjuaaZ4chW5K1z3TuioHTP7': {
        address: '5EhmYogkqoyHiCDEfMWvQkEBcJjuaaZ4chW5K1z3TuioHTP7',
        meta: {
            name: "wang",
            whenCreated: 1613125836858
        }
    }
}

const ad = '5EhmYogkqoyHiCDEfMWvQkEBcJjuaaZ4chW5K1z3TuioHTP7';

interface homeStatus {
    balance?: string
}

const HomePage:FC = function() {
    const history = useHistory();
    let { t ,i18n} = useTranslation();
    const globalStore = useStores('GlobalStore') as globalStoreType;

    function stateReducer(state: Object, action: homeStatus) {
        return Object.assign({}, state, action);
    }
    const [stateObj, setState] = useReducer(stateReducer, {} as homeStatus);
    //  是否初始化完成
    const hasInit = useMemo(() => globalStore.hasInit, [globalStore.hasInit]);
    function jump() {
        history.push('/createAccount');
    }
    function changeLanguage() {
        i18n.changeLanguage(i18n.language=='en'?'zh':'en')
    }
    function testFun() {
        setStorage({ 'www': 1});
    }
    async function xx() {
        let abb = '5EHZ7yCT4KgTs79UBcEtfEbJhLYsHD6gazSjk6Yhs8jeCNun';
        let a = await globalStore.api.query.system.account(abb);
        console.log(formatBalance(a.data.free, { withSi: false }));
        console.log(`balance free is ${a.data.free}`);
        setState({
            balance: myFormatBalance(a.data.free)
        })
    }
    useEffect(() => {
        console.log('in effect');
        if(globalStore.hasInit) {
            xx()
        }
    }, [globalStore.hasInit])
    useEffect(() => {
        async function test() {
            let a = await getStorage({ [ADDRESS_ARRAY]: []}) as any;
            const accountsPro = a.accountAddress.map((item: any) => getStorage({ [item]: {}}));
            const accountDeatil = await Promise.all(accountsPro);
            console.log(a, accountDeatil);
            xx();
        }
        //  test();
    }, [])

    function statusIcon() {
        return !hasInit ? <div className={s.connetIcon}>连接中</div> : null;
    }

    function AccountPage() {
        const target = mock['5EhmYogkqoyHiCDEfMWvQkEBcJjuaaZ4chW5K1z3TuioHTP7'];
        const { address, meta } = target;
        return (
            <>
                <div className={s.head}>Kitter {statusIcon()}</div>
                <div className={s.account}>
                    <div className={s.aName}>{meta.name}</div>
                    <div className={s.address}>{address.slice(0, 4) + '....' + address.slice(address.length - 4)}</div>
                </div>
                <div className={s.pIcon}/>
                <Spin spinning={!globalStore.hasInit}>
                    <div className={s.balance}>{stateObj.balance} DOT</div>
                    <div className={s.usd}>$0.00 USD</div>
                </Spin>
                <div className={s.tWrap}>
                    <div>
                        <div className={s.inAccount}/>
                        收款
                    </div>
                    <div>
                        <div className={s.out}/>
                        转账
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
            <div className={cx(s.btn, s.create)} onClick={jump}>{t('home:create wallet')}</div>
            <div className={cx(s.btn, s.importIcon)} onClick={testFun}>{t('home:import wallet')}</div>
        </>
    }
    const hasAccount = mock;
    return (
        <div>
            {hasAccount ? AccountPage() : homeWithoutAccount()}
        </div>
    )
}

export default observer(HomePage);