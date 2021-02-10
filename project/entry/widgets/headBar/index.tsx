/*
 * @Author: guanlanluditie 
 * @Date: 2021-01-27 00:18:06 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-11 00:21:41
 */
import React, { FC } from 'react';
import s from './index.css';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';

interface BarProps {
    word: string,
    externalCallBack?: Function
}
const HeadBar:FC<BarProps> = function(props:BarProps) {
    const history = useHistory();
    function back() {
        const { externalCallBack } = props;
        externalCallBack?.();
        history.goBack();
    }
    return (
        <div className={s.content}>
           {props.word}
           <div className={s.backArrow} onClick={back}/>
        </div>
    )
}

export default HeadBar;