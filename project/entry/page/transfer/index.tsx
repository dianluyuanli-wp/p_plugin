/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-13 23:57:28 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-13 23:59:22
 */
import React, { FC, useEffect, useReducer, useMemo } from 'react';
import s from './index.css';
import './index.antd.css';
import HeadBar from '@widgets/headBar';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { useStores } from '@utils/useStore';
import { globalStoreType } from '../../store';
import { keyring } from '@polkadot/ui-keyring';
import { message, Input, Form } from 'antd';

const  TRANSFER_STEP = {
    ONE: 0,
    TWO: 1
}

interface transferStateObj {
    addressErrMsg?: string,
    transAmountErrMsg?: string,
    status?: number,
    targetAdd?: string,
    transferAmount?: string,
    secret?: string,
    buttonActive?: boolean
}
const Transfer:FC = function() {
    //  状态管理
    function stateReducer(state: Object, action: transferStateObj) {
        return Object.assign({}, state, action);
    }
    const [stateObj, setState] = useReducer(stateReducer, { 
        addressErrMsg: '',
        transAmountErrMsg: '',
        status: TRANSFER_STEP.ONE,
        transferAmount: '0',
        targetAdd: '',
        buttonActive: false,
        secret: '' } as transferStateObj
    );
    const globalStore = useStores('GlobalStore') as globalStoreType;
    const { balance, currentAccount } = globalStore;
    //  判断当前阶段
    const isStepOne = useMemo(() => stateObj.status === TRANSFER_STEP.ONE, [stateObj.status]);
    //  判断摁钮是否可点击
    const buttonIsAcctive = useMemo(() => {
        const { transAmountErrMsg, addressErrMsg, targetAdd, transferAmount, secret } = stateObj;
        if (isStepOne) {
            return !!(!transAmountErrMsg && !addressErrMsg && targetAdd && transferAmount)
        } else {
            return !!secret
        }
    }, [stateObj.transferAmount, stateObj.transAmountErrMsg, stateObj.addressErrMsg, stateObj.targetAdd])
    const aferIcon = (
        <div className={s.icon}/>
    )

    const amountIcon = (
        <div className={s.amountIconWrap}>
            DOT<div className={s.split} /><div>全部</div>
        </div>
    )

    const fee = (
        <div className={s.fee}>0.1118 DOT</div>
    )
    //  校验地址
    function addressInput(e: React.ChangeEvent<HTMLInputElement>) {
        let inputValue = e.target.value;
        try {
            const publicKey = keyring.decodeAddress(inputValue);
            keyring.encodeAddress(publicKey);
        } catch(e) {
            return setState({
                addressErrMsg: '错误的地址'
            })
        }
        setState({
            addressErrMsg: inputValue === currentAccount.address ? '收款地址和付款地址不能相同' : '',
            targetAdd: inputValue
        })
    }
    //  验证输入金额
    function inputAmount(e: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = e.target.value;
        const intReg = /^([0-9]{1,})$/; // 判断整数的正则
        const floatReg = /^([0-9]{1,}[.][0-9]*)$/; //   判断小数的正则
        if (intReg.test(inputValue) || floatReg.test(inputValue)) {
            if (parseFloat(inputValue) > parseFloat(balance as string)) {
                setState({
                    transAmountErrMsg: '余额不足'
                })
            } else {
                setState({ transAmountErrMsg: '', transferAmount: inputValue })
            }
        } else {
            setState({
                transAmountErrMsg: '错误的格式'
            })
        }
    }

    function inputSec(e: React.ChangeEvent<HTMLInputElement>) {
        setState({
            secret: e.target.value
        })
    }

    function buttonClick() {
        if (buttonIsAcctive) {
            if (isStepOne) {
                setState({
                    status: TRANSFER_STEP.TWO
                })  
            } else {
                //  let sendPair = keyring.createFromUri();
            }
        }
    }

    function renderStepOne() {
        return <div className={s.contentWrap}>
            <div className={cx(s.formTitle, s.topT)}>收款地址</div>
            <Input onChange={(e) => addressInput(e)}
                addonAfter={aferIcon}
                className={cx(s.input, 'tInput')} placeholder={'输入地址'}/>
            <div className={s.addressError}>{stateObj.addressErrMsg}</div>
            <div className={cx(s.formTitle, s.mid)}>金额 <span className={s.tAmount}>{balance} DOT 可用</span></div>
            <Input onChange={(e) => inputAmount(e)}
                addonAfter={amountIcon}
                className={cx('tInput', 'tMInput')} placeholder={'0'}/>
            <div className={s.addressError}>{stateObj.transAmountErrMsg}</div>
            <div className={s.feeWrap}>
                <Input
                    disabled
                    value={'矿工费'}
                    addonAfter={fee}
                    className={cx('feeInput', 'tInput')}/>
            </div>
        </div>
    }

    function isStepTwo() {
        return <div className={s.contentWrap}>
            <div className={cx(s.formTitle, s.topT)}>转账信息</div>
            <div className={s.tableWrap}>
                <div className={s.sTd}>
                    <div>转账金额</div><div className={s.tContent}>{stateObj.transferAmount} DOT</div>
                </div>
                <div className={s.sTd}>
                    <div>收款地址</div><div className={cx(s.tContent, s.tCAdd)}>{stateObj.targetAdd}</div>
                </div>
                <div className={s.sTd}>
                    <div>付款地址</div><div className={cx(s.tContent, s.tCAdd)}>{currentAccount.address}</div>
                </div>
                <div className={s.sTd}>
                    <div>矿工费</div><div className={s.tContent}>1.22 DOT</div>
                </div>
            </div>
            <div className={cx(s.formTitle, s.topT)}>密码确认</div>
            <Input.Password onChange={(e) => inputSec(e)} className={cx(s.input, 'sInput')} placeholder={'请输入密码'}/>
            <div className={s.addressError}></div>
        </div>
    }
    return (
        <div className={s.wrap}>
            <HeadBar word={'转账'}/>
            {isStepOne ? renderStepOne() : isStepTwo()}
            <div className={s.button} onClick={buttonClick}>{isStepOne ? '下一步' : '确认'}</div>
        </div>
    )
}

export default Transfer;