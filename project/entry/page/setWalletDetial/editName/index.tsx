/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-26 08:53:09 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-26 09:18:24
 */

import React, { FC } from 'react';
import s from './index.css';
import HeadBar from '@widgets/headBar';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';
import { useStores } from '@utils/useStore';
import { PAGE_NAME } from '@constants/app';
import { globalStoreType } from '@entry/store';
import { Input } from 'antd';
import { setStorage } from '@utils/chrome';
//  import RetrieveStore from '../store';

interface HState {
    address?: string;
}

const Entry:FC = function() {
    let { t } = useTranslation();
    const globalStore = useStores('GlobalStore') as globalStoreType;
    const history = useHistory();

    function jump(path: string) {
        //  重新进入的时候要重置数据
        // RetrieveStore.resetStore();
        history.push(path);
    }

    const { address } = history.location.state as HState;
    const configAccount = globalStore.accountObj[address] as Record<string, any>;
    console.log(address, 'dsfe');

    return (
        <div className={s.wrap}>
            <HeadBar word={'修改钱包名称'}/>
            <Input onChange={(e) => {}} className={s.input} placeholder={'请输入新的名字'}/>
            <div className={s.confirm}>确认</div>
        </div>
    )
}

export default Entry;