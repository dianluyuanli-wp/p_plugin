/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-26 09:24:07 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-26 09:58:30
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
import SecretInput from '@widgets/secretInput';
import SWStore from '../store';
//  import RetrieveStore from '../store';

interface HState {
    address?: string;
}

const Entry:FC = function() {
    let { t } = useTranslation();
    const globalStore = useStores('GlobalStore') as globalStoreType;
    const history = useHistory();

    function jump(path: string) {
        history.push(path);
    }

    const { address } = history.location.state as HState;

    return (
        <div className={s.wrap}>
            <HeadBar word={'修改钱包密码'}/>
            <div className={s.contentWrap}>
                <div className={s.topTitle}>旧的密码</div>
                <Input onChange={(e) => {}} className={s.input} placeholder={'钱包密码'}/>
                <SecretInput title={'新的密码'} secretKey='secret' checkSecretKey='confirmSecret' store={SWStore}/>
                <div className={s.confirm}>确认</div>
            </div>

        </div>
    )
}

export default Entry;