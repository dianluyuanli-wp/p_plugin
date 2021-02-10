/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-08 11:23:37 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-09 11:46:36
 */

import React, { FC, useEffect } from 'react';
import s from './index.css';
import { Input, Form, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { mnemonicGenerate, cryptoWaitReady } from '@polkadot/util-crypto';
// import { } from '../'
import cx from 'classnames';
//      "content_security_policy": "script-src 'self' 'unsafe-eval' https://baidu.com/; object-src 'self'",
let mnemonic = '';
const CreactMnemonic:FC = function() {
    let { t } = useTranslation();
    useEffect(() => {
        async function init() {
            await cryptoWaitReady();
            mnemonic = mnemonicGenerate();
            console.log(mnemonic, '111');
        }
        init();
    }, []);
    console.log(mnemonic, '222');
    return (
        <div className={s.wrap}>
            <div>
                <div className={s.title}>备份助记词</div>
                <div className={s.info}>请按书序手动抄写下面助记词，确保备份正确</div>
                <div className={s.info}>获得助记词等同于拥有钱包资产所有权</div>
                <div className={s.info}>不要截屏或复制，否则可能会造成资产损失</div>
            </div>
        </div>
    )
}

export default CreactMnemonic;