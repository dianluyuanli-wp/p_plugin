/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-03 10:57:31 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-06 13:59:13
 */
import React, { FC, useReducer } from 'react';
import s from './index.css';
import './index.antd.css';
import { Input, Form, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { useStores } from '@utils/useStore';
import { changeInput } from '@utils/input';

interface CreateStateObj {
    sectStatus?: 'weak' | 'strong',
    userArgeementStatus?: boolean,
    showSec?: boolean
}

const SecretPart:FC = function() {
    let { t } = useTranslation();
    
    //  状态管理
    function stateReducer(state: Object, action: CreateStateObj) {
        return Object.assign({}, state, action);
    }
    const [stateObj, setState] = useReducer(stateReducer, {} as CreateStateObj);
    const createStore = useStores('CreateAccountStore');
    const { createTag } = createStore;

    //  切换用户协议状态
    function changeAgreeSta() {
        let currentStatus = stateObj.userArgeementStatus;
        setState({
            userArgeementStatus: !currentStatus
        })
    }
    console.log(createTag);
    //  accountName
    return (
        <div className={s.contentWrap}>
            <div className={cx(s.formTitle, s.topT)}>钱包名称</div>
            <Form.Item >
                <Input onChange={(e) => changeInput(createStore, 'accountName', e)} className={s.input} maxLength={12} placeholder={'1-12位字符'}/>
            </Form.Item>
            <div className={cx(s.formTitle, s.midT)}>密码</div>
            <Form.Item>
                <Input.Password onChange={(e) => changeInput(createStore, 'inputSec', e)} className={cx(s.input, 'myInput')} placeholder={'钱包密码'} iconRender={show => null}/>
                <Input.Password onChange={(e) => changeInput(createStore, 'inputSecConfirm', e)} className={cx(s.input, 'myInput')} placeholder={'重复输入密码'}/>
            </Form.Item>
            <div className={s.explainInfo}>
                <div className={s.info}>不少于8位字符，建议混合大小写字母、数字、符号</div>
                <div className={s.info}>改密码将作为钱包的交易密码。Kiter无法提供找回密码功能，请务必妥善保管钱包密码！</div>
            </div>
            <div className={s.agreeWrap} onClick={changeAgreeSta}>
                <div className={cx(s.check, stateObj.userArgeementStatus ? s.accept : s.notAccept)}/>
                <div className={s.agrCon}>我已阅读并同意用户协议<span className={s.agreement}>《用户协议》</span></div>
            </div>
            <div className={s.createBtn}>创建钱包</div>
        </div>
    )
}

export default SecretPart;