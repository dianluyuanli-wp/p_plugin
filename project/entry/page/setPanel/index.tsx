/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-15 21:55:52 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-16 18:03:53
 */

import React, { FC, useEffect } from 'react';
import s from './index.css';
import HeadBar from '@widgets/headBar';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';
import { PAGE_NAME } from '@constants/app';
import { useStores } from '@utils/useStore';
import { globalStoreType } from '../../store';

const SetPanel:FC = function() {
    let { t } = useTranslation();
    const globalStore = useStores('GlobalStore') as globalStoreType;
    const { currentAccount } = globalStore;
    const history = useHistory();

    function jump(path: string) {
        history.push(path);
    }

    return (
        <div className={s.wrap}>
            <HeadBar word={'设置'}/>
            <div className={cx(s.item, s.wallet)} onClick={() => jump(PAGE_NAME.WALLET_MANAGE)}>钱包管理</div>
            <div className={cx(s.item, s.add)}>转账地址</div>
            <div className={cx(s.item, s.common)}>通用</div>
            <div className={cx(s.item, s.about)}>关于Kitter</div>
            <div className={cx(s.item, s.agreement)}>用户协议</div>
        </div>
    )
}

export default SetPanel;