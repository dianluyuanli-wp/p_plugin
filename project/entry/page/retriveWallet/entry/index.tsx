/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-16 17:54:00 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-20 09:32:09
 */

import React, { FC } from 'react';
import s from './index.css';
import HeadBar from '@widgets/headBar';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';
import { PAGE_NAME } from '@constants/app';

const Entry:FC = function() {
    let { t } = useTranslation();
    const history = useHistory();

    function jump(path: string) {
        history.push(path);
    }

    return (
        <div className={s.wrap}>
            <HeadBar word={'创建钱包'}/>
            <div className={cx(s.item, s.wallet)} onClick={() => jump(PAGE_NAME.CREATE_ACCOUNT)}>创建钱包</div>
            <div className={cx(s.title, s.titlePadding)}>导入钱包</div>
            <div className={cx(s.item, s.word)} onClick={() => jump(PAGE_NAME.RW_MNEMONIC)}>助记词</div>
            <div className={cx(s.item, s.key)} onClick={() => {}}>私钥</div>
            <div className={cx(s.item, s.store)} onClick={() => jump(PAGE_NAME.RW_KEYSTORE)}>KeyStore</div>
        </div>
    )
}

export default Entry;