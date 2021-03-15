/*
 * @Author: guanlanluditie 
 * @Date: 2021-03-12 23:53:03 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-03-13 00:04:56
 */

import React, { FC, useReducer } from 'react';
import s from './index.css';
import './index.antd.css';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { useStores } from '@utils/useStore';
import { globalStoreType } from '@entry/store';
import { Input } from 'antd';

interface BarProps {
    changeInputFn: Function,
    setErr: Function,
    wrapCls?: string,
    allDot?: string;
}

interface InputStatus {
    transAmountErrMsg: string;
    wrapCls?: string;
}

const DotInput:FC<BarProps> = function(props:BarProps) {
    let { t } = useTranslation();
    //  国际化的包裹函数
    const lanWrap = (input: string) => t(`widgets:${input}`);
    const { changeInputFn, wrapCls, setErr, allDot } = props;

    const globalStore = useStores('GlobalStore') as globalStoreType;
    const { balance } = globalStore;

    //  状态管理
    function stateReducer(state: Object, action: InputStatus) {
        return Object.assign({}, state, action);
    }
    const [stateObj, setState] = useReducer(stateReducer, {
        transAmountErrMsg: ''
    } as InputStatus
    );

    //  验证输入金额
    function inputAmount(e: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = e.target.value;
        const intReg = /^([0-9]{1,})$/; // 判断整数的正则
        const floatReg = /^([0-9]{1,}[.][0-9]*)$/; //   判断小数的正则
        if (intReg.test(inputValue) || floatReg.test(inputValue)) {
            if (parseFloat(inputValue) > parseFloat(balance as string)) {
                const errStr = lanWrap('your credit is running low');
                setState({
                    transAmountErrMsg: errStr
                })
                setErr(errStr)
                changeInputFn(inputValue, '');
            } else {
                setState({ transAmountErrMsg: '' })
                changeInputFn(inputValue);
                setErr('')
            }
        } else {
            const errStr = lanWrap('Wrong format');
            setState({
                transAmountErrMsg: errStr
            })
            setErr(errStr)
        }
    }

    const amountIcon = (
        <div className={s.amountIconWrap} onClick={() => changeInputFn(allDot)}>
            DOT<div className={s.split} /><div>{lanWrap('all')}</div>
        </div>
    )

    return (
        <div className={wrapCls}>
            <Input onChange={(e) => inputAmount(e)}
                addonAfter={amountIcon}
                className={cx('tInput', 'tMInput')} placeholder={'0'}/>
            <div className={s.addressError}>{stateObj.transAmountErrMsg}</div>
        </div>
    )
}

export default DotInput;