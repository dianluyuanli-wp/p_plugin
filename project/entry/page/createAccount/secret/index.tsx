/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-03 10:57:31 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-16 15:03:23
 */
import React, { FC, useReducer } from 'react';
import s from './index.css';
import './index.antd.css';
import { Input, Form, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { useStores } from '@utils/useStore';
import { changeInput } from '@utils/input';
import { useHistory } from 'react-router-dom';
import { CREAT_STAGE } from '../contants';
import { PAGE_NAME } from '@constants/app';
import { runInAction } from 'mobx';

const CREATE_STORE_KEY = {
    INPUT_SEC: 'inputSec',
    INPUT_SEC_CONFIRM: 'inputSecConfirm'
};

const INFO_STATUS = {
    COMMON: 0,
    CHECK_AGREEMENT: 1,
    SECRET_NOT_EQUAL: 2
}

interface CreateStateObj {
    sectStatus?: 'weak' | 'strong',
    userArgeementStatus?: boolean,
    showSec?: boolean,
    infoStatus?: number
}

function infoPart(type: number) {
    const contentMap = {
        [INFO_STATUS.COMMON]: () => <>
            <div className={s.info}>不少于8位字符，建议混合大小写字母、数字、符号</div>
            <div className={s.info}>改密码将作为钱包的交易密码。Kiter无法提供找回密码功能，请务必妥善保管钱包密码！</div>
        </>,
        [INFO_STATUS.CHECK_AGREEMENT]: () => <>
            <div className={s.info}>请勾选用户协议</div>
        </>,
        [INFO_STATUS.SECRET_NOT_EQUAL]: () => <>
            <div className={s.info}>密码不一致</div>
        </>
    }
    return contentMap[type]();
}

const SecretPart:FC = function() {
    let { t } = useTranslation();
    const history = useHistory();
    
    //  状态管理
    function stateReducer(state: Object, action: CreateStateObj) {
        return Object.assign({}, state, action);
    }
    const [stateObj, setState] = useReducer(stateReducer, { infoStatus: INFO_STATUS.COMMON } as CreateStateObj);
    const createStore = useStores('CreateAccountStore');

    //  切换用户协议状态
    function changeAgreeSta() {
        let currentStatus = stateObj.userArgeementStatus;
        setState({
            userArgeementStatus: !currentStatus
        })
    }
    //  修改两个密码
    function changeSecret(e: React.ChangeEvent<HTMLInputElement>, key: string) {
        changeInput(createStore, key, e);
        if (key === CREATE_STORE_KEY.INPUT_SEC) {
            const value = e.target.value;
            const hasCapitalLetter = /[A-Z]/.test(value);
            const hasLowcaseLetter = /[a-z]/.test(value);
            const hasNumber = /[0-9]/.test(value);
            const moreThan8 = value.length > 7;
            const res = [hasCapitalLetter, hasLowcaseLetter, hasNumber, moreThan8].reduce((origin, item) => origin + (item ? 1 : 0), 0);
            setState({
                sectStatus: res === 4 ? 'strong' : 'weak'
            })
        }
    }
    //  创建账户
    function createAccount() {
        const { inputSec, inputSecConfirm } = createStore;
        //  密码不一致
        if (inputSec !== inputSecConfirm) {
            return setState({
                infoStatus: INFO_STATUS.SECRET_NOT_EQUAL
            })
        }
        //  没有勾选用户协议
        if (!stateObj.userArgeementStatus) {
            return setState({
                infoStatus: INFO_STATUS.CHECK_AGREEMENT
            })
        }
        //  进入下一阶段
        runInAction(() => {
            createStore.createStage = CREAT_STAGE.MNEMONIC;
        })
    }
    //  跳转到用户协议
    function toAgreement(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        e.stopPropagation();
        history.push(PAGE_NAME.USER_AGREEMENT);
    }
    //  修改眼睛内容，antd有点问题没有办法传入node节点的时候带上类名
    // function secretIcon(show) {
    //     const styleObj = {
    //         width: '0.18rem',
    //         height: '0.18rem',
    //         backgroundSize: '100% 100%',
    //         backgroundImage: "url('./img/openEye.png')"
    //     }
    //     return (show ? <div className={cx(s.secretIcon, s.canSee)} style={{color: 'red'}}>1</div> : <span className={cx(s.secretIcon, s.canNotSee)} style={styleObj}>2</span>)
    // }
    return (
        <div className={s.contentWrap}>
            <div className={cx(s.formTitle, s.topT)}>钱包名称</div>
            <Form.Item >
                <Input onChange={(e) => changeInput(createStore, 'accountName', e)} className={s.input} maxLength={12} placeholder={'1-12位字符'}/>
            </Form.Item>
            <div className={cx(s.formTitle, s.midT)}>密码 <div className={cx(s.secWrap, stateObj.sectStatus === 'strong' ? s.strongSec : s.weatSec)} /></div>
            <Form.Item>
                <Input.Password
                    onChange={(e) => changeSecret(e, CREATE_STORE_KEY.INPUT_SEC)}
                    className={cx(s.input, 'myInput')} placeholder={'钱包密码'}
                    // iconRender={secretIcon}
                />
                <Input.Password onChange={(e) => changeSecret(e, CREATE_STORE_KEY.INPUT_SEC_CONFIRM)} className={cx(s.input, 'myInput')} placeholder={'重复输入密码'}/>
            </Form.Item>
            <div className={s.explainInfo}>
                {infoPart(stateObj.infoStatus)}
            </div>
            <div className={s.agreeWrap} onClick={changeAgreeSta}>
                <div className={cx(s.check, stateObj.userArgeementStatus ? s.accept : s.notAccept)}/>
                <div className={s.agrCon}>我已阅读并同意用户协议<span className={s.agreement} onClick={toAgreement}>《用户协议》</span></div>
            </div>
            <div className={s.createBtn} onClick={createAccount}>创建钱包</div>
        </div>
    )
}

export default SecretPart;