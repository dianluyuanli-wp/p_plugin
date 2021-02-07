/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-07 11:50:33 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-07 12:01:35
 */

import React, { FC } from 'react';
import s from './index.css';
import HeadBar from '@widgets/headBar';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

const CreactAccount:FC = function() {
    let { t } = useTranslation()
    return (
        <div className={s.wrap}>
            <HeadBar word={t('createAccount:create wallet')}/>
            <div className={s.title}>kitter用户协议</div>
        </div>
    )
}

export default CreactAccount;