/*
 * @Author: guanlanluditie 
 * @Date: 2021-01-27 00:18:06 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-01-27 23:25:29
 */
import React, { FC } from 'react';
import s from './index.css';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';

interface BarProps {
    word: string
}
const HeadBar:FC<BarProps> = function(props:BarProps) {
    const history = useHistory();
    function back() {
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