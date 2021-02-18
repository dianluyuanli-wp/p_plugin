/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-17 15:46:34 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-17 16:01:56
 */

import React, { FC, useState } from 'react';
import s from './index.css';
import { PAGE_NAME } from '@constants/app';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';

interface BarProps {
    isCheck: boolean,
    externalCallBack?: Function
}
const HeadBar:FC<BarProps> = function(props:BarProps) {
    const history = useHistory();

    function changeAgreeStatus() {
        props.externalCallBack?.();
    }

    //  跳转到用户协议
    function toAgreement(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        e.stopPropagation();
        history.push(PAGE_NAME.USER_AGREEMENT);
    }
    return (
        <>
            <div className={s.agreeWrap} onClick={changeAgreeStatus}>
                <div className={cx(s.check, props.isCheck ? s.accept : s.notAccept)}/>
                <div className={s.agrCon}>我已阅读并同意用户协议<span className={s.agreement} onClick={toAgreement}>《用户协议》</span></div>
            </div>
        </>
    )
}

export default HeadBar;