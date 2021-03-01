/*
 * @Author: guanlanluditie 
 * @Date: 2021-03-01 09:40:07 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-03-01 09:55:48
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
import { addressFormat } from '@utils/tools';

const Entry:FC = function() {
    let { t } = useTranslation();
    const globalStore = useStores('GlobalStore') as globalStoreType;
    const history = useHistory();

    function jump(path: string, state?: Record<string, any>) {
        history.push(path, state);
    }

    return (
        <div className={s.wrap}>
            <HeadBar word={'语言'}/>
            <div className={s.item}>
                <div>简体中文</div>
                <div className={s.right}>
                    <div className={s.arrow}/>
                </div>
            </div>
            <div className={s.item}>
                <div>English</div>
                <div className={s.right}>
                    <div className={s.arrow}/>
                </div>
            </div>
            <div className={s.btn}>保存</div>
        </div>
    )
}

export default Entry;