/*
 * @Author: guanlanluditie 
 * @Date: 2021-03-01 08:50:12 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-03-02 23:50:02
 */

import React, { FC } from 'react';
import s from './index.css';
import HeadBar from '@widgets/headBar';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useStores } from '@utils/useStore';
import { PAGE_NAME } from '@constants/app';
import { globalStoreType } from '@entry/store';

const Entry:FC = function() {
    let { t } = useTranslation();
    const globalStore = useStores('GlobalStore') as globalStoreType;
    const history = useHistory();

    function jump(path: string, state?: Record<string, any>) {
        history.push(path, state);
    }

    return (
        <div className={s.wrap}>
            <HeadBar word={'通用'}/>
            <div className={s.item} onClick={() => jump(PAGE_NAME.GENERAL_SETTING_LANGUAGE)}>
                <div>语言</div>
                <div className={s.right}>
                    <div className={s.mini}>简体中文</div>
                    <div className={s.arrow}/>
                </div>
            </div>
            <div className={s.item} onClick={() => jump(PAGE_NAME.GENERAL_SETTING_AUTOLOCK)}>
                <div>自动锁定</div>
                <div className={s.right}>
                    <div className={s.arrow}/>
                </div>
            </div>
        </div>
    )
}

export default Entry;