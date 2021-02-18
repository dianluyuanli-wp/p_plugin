/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-17 17:20:34 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-17 20:29:09
 */

import React, { FC } from 'react';
import s from './index.css';
import './index.antd.css';
import { useTranslation } from 'react-i18next';
import { Input } from 'antd';
import cx from 'classnames';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import { changeInput } from '@utils/input';
import { keyring } from '@polkadot/ui-keyring';
import UserAgreement from '@widgets/userAgreement';
import type { retrieveStoreType } from '../store';
import { useStores } from '@utils/useStore';

const CommonPart:FC = function() {
    let { t } = useTranslation();
    const RetrieveStore = useStores('RetrieveStore') as retrieveStoreType;

    function changeStatus() {
        runInAction(() => {
            RetrieveStore.checkAgreement = !RetrieveStore.checkAgreement;
        })
    }

    function importAccount() {
        const { name, mnemonicWords, secret } = RetrieveStore;
        const result = keyring.addUri(mnemonicWords, secret, { name });
        console.log(result);
    }

    const { name, secret, checkAgreement, buttonActive } = RetrieveStore;
    return (
        <>
            <div className={cx(s.title, s.topTitle)}>用户名</div>
            <Input
                value={name}
                onChange={(e) => changeInput(RetrieveStore, 'name', e)}
                className={cx(s.secInput, 'retrieveInput')} placeholder={'账户名称'}
            />
            <div className={cx(s.title, s.topTitle)}>密码</div>
            <Input.Password
                value={secret}
                onChange={(e) => changeInput(RetrieveStore, 'secret', e)}
                className={cx(s.secInput, 'retrieveInput')} placeholder={'钱包密码'}
            />
            <div className={s.forAgree}>{!checkAgreement ? '请勾选用户协议' : ''}</div>
            <UserAgreement isCheck={checkAgreement} externalCallBack={changeStatus}/>
            <div className={cx(s.btn, buttonActive ? s.btnActive : '')} onClick={importAccount}>导入钱包</div>
        </>
    )
}

export default observer(CommonPart);