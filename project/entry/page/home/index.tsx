/*
 * @Author: guanlanluditie 
 * @Date: 2021-01-22 22:36:26 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-01-26 10:29:56
 */
import React, { FC } from 'react';
import s from './index.css';
import cx from 'classnames';

const HomePage:FC = function() {
    return (
        <div>
            <div className={s.loggo} />
            <div className={s.word}>Kiter是波卡网络的治理钱包</div>
            <div className={s.word}>欢迎使用</div>
            <div className={cx(s.btn, s.create)}>创建钱包</div>
            <div className={cx(s.btn, s.importIcon)}>导入钱包</div>
        </div>
    )
}

export default HomePage;