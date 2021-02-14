/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-13 15:55:08 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-13 23:57:10
 */

import React, { FC, useEffect } from 'react';
import s from './index.css';
import HeadBar from '@widgets/headBar';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import Qrcode from 'qrcode';
import { useStores } from '@utils/useStore';
import { globalStoreType } from '../../store';
import { message } from 'antd';
import copyContent from 'copy-to-clipboard';

const Recient:FC = function() {
    let { t } = useTranslation();
    const globalStore = useStores('GlobalStore') as globalStoreType;
    const { currentAccount } = globalStore;

    useEffect(() => {
        Qrcode.toCanvas(document.getElementById('qrcode'), currentAccount.address)
    }, [])

    function copyAdd() {
        message.success('复制成功');
        copyContent(currentAccount.address);
    }

    return (
        <div className={s.wrap}>
            <HeadBar word={'收款'}/>
            <div className={s.content}>
                <div className={s.topTip}>扫二维码，向我转账</div>
                <canvas className={s.qrCode} id='qrcode'/>
                <div className={s.topTip}>钱包地址</div>
                <div className={s.address}>{currentAccount.address}</div>
            </div>
            <div className={s.bottm}>
                <div className={cx(s.buttonWord, s.copy)} onClick={copyAdd}>复制地址</div>
                <div className={s.split}/>
                <div className={cx(s.buttonWord, s.downLoad)}>下载收款码</div>
            </div>
        </div>
    )
}

export default Recient;