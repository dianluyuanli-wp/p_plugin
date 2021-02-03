/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-03 10:57:31 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-03 12:00:39
 */
import React, { FC } from 'react';
import s from './index.css';
import './index.antd.css';
import { Input, Form, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { useStores } from '@utils/useStore';

const SecretPart:FC = function() {
    let { t } = useTranslation()
    const { createTag } = useStores('CreateAccountStore');
    console.log(createTag);
    return (
        <div className={s.contentWrap}>
            <div className={cx(s.formTitle, s.topT)}>钱包名称</div>
            <Form.Item >
                <Input className={s.input} maxLength={12} placeholder={'1-12位字符'}/>
            </Form.Item>
            <div className={cx(s.formTitle, s.midT)}>密码</div>
            <Form.Item>
                <Input.Password className={cx(s.input, 'myInput')} placeholder={'钱包密码'} iconRender={show => null}/>
                <Input.Password className={cx(s.input, 'myInput')} placeholder={'重复输入密码'}/>
            </Form.Item>
            <div>
                <div className={s.info}>不少于8位字符，建议混合大小写字母、数字、符号</div>
                <div className={s.info}>改密码将作为钱包的交易密码。Kiter无法提供找回密码功能，请务必妥善保管钱包密码！</div>
            </div>
        </div>
    )
}

export default SecretPart;