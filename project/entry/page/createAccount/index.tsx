/*
 * @Author: guanlanluditie 
 * @Date: 2021-01-27 00:17:53 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-02 10:47:59
 */

import React, { FC } from 'react';
import s from './index.css';
import HeadBar from '@widgets/headBar';
import './index.antd.css';
import { Input, Form, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

const CreactAccount:FC = function() {
    let { t } = useTranslation()
    return (
        <div className={s.wrap}>
            <HeadBar word={t('createAccount:create wallet')}/>
            <div className={s.contentWrap}>
                <div className={cx(s.formTitle, s.topT)}>钱包名称</div>
                <Form.Item >
                    <Input className={s.input} maxLength={12} placeholder={'1-12位字符'}/>
                </Form.Item>
                <div className={cx(s.formTitle, s.midT)}>密码</div>
                <Form.Item>
                    <Input.Password className={cx(s.input, 'myInput')} placeholder={'钱包密码'}/>
                    <Input.Password className={cx(s.input, 'myInput')} placeholder={'重复输入密码'}/>
                </Form.Item>
            </div>
        </div>
    )
}

export default CreactAccount;