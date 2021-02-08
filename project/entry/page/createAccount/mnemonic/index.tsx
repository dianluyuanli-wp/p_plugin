/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-08 11:23:37 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-08 12:08:48
 */

import React, { FC } from 'react';
import s from './index.css';
import { Input, Form, Button } from 'antd';
import { useTranslation } from 'react-i18next';
// import { } from '../'
import cx from 'classnames';

const CreactAccount:FC = function() {
    let { t } = useTranslation()
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

export default CreactAccount;