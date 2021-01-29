/*
 * @Author: guanlanluditie 
 * @Date: 2021-01-27 00:17:53 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-01-28 00:46:05
 */

import React, { FC } from 'react';
import s from './index.css';
import HeadBar from '@widgets/headBar';
import { Input, Form, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

const CreactAccount:FC = function() {
    let { t } = useTranslation()
    return (
        <div className={s.wrap}>
            <HeadBar word={t('createAccount:create wallet')}/>
            <div className={s.formTitle}>钱包名称</div>
            <Form.Item>
                <Input />
            </Form.Item>
        </div>
    )
}

export default CreactAccount;