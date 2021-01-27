/*
 * @Author: guanlanluditie 
 * @Date: 2021-01-27 00:17:53 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-01-28 00:11:54
 */

import React, { FC } from 'react';
import s from './index.css';
import HeadBar from '@widgets/headBar';
import { useTranslation } from 'react-i18next'
import cx from 'classnames';

const CreactAccount:FC = function() {
    let { t } = useTranslation()
    return (
        <div className={s.wrap}>
            <HeadBar word={t('createAccount:create wallet')}/>
        </div>
    )
}

export default CreactAccount;