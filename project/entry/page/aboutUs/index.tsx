/*
 * @Author: guanlanluditie 
 * @Date: 2021-03-03 09:12:31 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-03-03 09:59:00
 */

import React, { FC } from 'react';
import s from './index.css';
import HeadBar from '@widgets/headBar';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { runInAction } from 'mobx';
import { LOCAL_CONFIG } from '@constants/chrome';
import { useStores } from '@utils/useStore';
import { globalStoreType } from '@entry/store';
import { setStorage } from '@utils/chrome';

const Entry:FC = function() {
    let { t } = useTranslation();
    const globalStore = useStores('GlobalStore') as globalStoreType;
    const history = useHistory();

    function test() {
        window.open('https://www.baidu.com/?tn=98012088_10_dg&ch=3',"_blank")
    }

    function renderItem() {
        const array = [{ text: '网站', link: 'https://chainbridge.network'}, { text: 'Twitter', link: '@ChainBridgeNetwork'},
            { text: '微信公众号', link: 'ChainBridgeNetwork'}];
        return array.map(item => {
            const { text, link } = item;
            return <div className={s.itemWrap} onClick={test}>
                <div>{text}</div>
                <div className={s.link}>{link}</div>
            </div>
        })
    }

    return (
        <div className={s.wrap}>
            <HeadBar word={'关于kitter'}/>
            <div className={s.logo} />
            <div className={s.title}>Kiter</div>
            <div className={s.title}>v0.1.0</div>
            {renderItem()}
        </div>
    )
}

export default observer(Entry);