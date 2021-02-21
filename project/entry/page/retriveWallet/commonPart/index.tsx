/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-17 17:20:34 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-21 13:55:47
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
import SecretInput from '@widgets/secretInput';
import { useHistory } from 'react-router-dom';
import { CHECT_STATUS } from '../store';
import { useStores } from '@utils/useStore';
import type { KeyringPair$Json } from '@polkadot/keyring/types';
import { PAGE_NAME } from '@constants/app';

const CommonPart:FC = function() {
    let { t } = useTranslation();
    const history = useHistory();
    const RetrieveStore = useStores('RetrieveStore') as retrieveStoreType;

    function changeStatus() {
        runInAction(() => {
            RetrieveStore.checkAgreement = !RetrieveStore.checkAgreement;
        })
    }

    function importAccount() {
        //  history.location
        console.log(history.location.pathname);
        const {  name, mnemonicWords, checkAgreement, secret, confirmSecret, keyStoreJsonStr } = RetrieveStore;
        if (!checkAgreement) {
            return runInAction(() => RetrieveStore.checkStatus = CHECT_STATUS.NOT_CHECK_AGREEMETN)
        }
        if (secret.length < 8) {
            return runInAction(() => RetrieveStore.checkStatus = CHECT_STATUS.SECRET_TOO_SHORT);
        }
        if (confirmSecret !== secret) {
            return runInAction(() => RetrieveStore.checkStatus = CHECT_STATUS.SECRECT_NOT_EQUAL);
        }
        runInAction(() => RetrieveStore.checkStatus === CHECT_STATUS.PASS);
        let result;
        if (history.location.pathname === PAGE_NAME.RW_MNEMONIC) {
            const mnemoRes = keyring.addUri(mnemonicWords, secret, { name });
            const { json: { address, meta }} = mnemoRes;
            result = { address, meta }
        } else {
            const { address, meta } = keyring.createFromJson(JSON.parse(keyStoreJsonStr) as KeyringPair$Json);
            result = { address, meta }
        }
        
    }

    function checkInfo() {
        const contentMap = {
            [CHECT_STATUS.PASS]: '',
            [CHECT_STATUS.NOT_CHECK_AGREEMETN]: '请勾选用户协议',
            [CHECT_STATUS.SECRECT_NOT_EQUAL]: '密码输入不一致',
            [CHECT_STATUS.SECRET_TOO_SHORT]: '密码位数小于8位'
        }
        return <div className={s.checkInfo}>{contentMap[RetrieveStore.checkStatus]}</div>
    }

    const { name, checkAgreement, buttonActive } = RetrieveStore;
    return (
        <>
            <div className={cx(s.title, s.topTitle)}>用户名</div>
            <Input
                value={name}
                onChange={(e) => changeInput(RetrieveStore, 'name', e)}
                className={cx(s.secInput, 'retrieveInput')} placeholder={'账户名称'}
            />
            <SecretInput secretKey='secret' checkSecretKey='confirmSecret' store={RetrieveStore}/>
            {checkInfo()}
            {/* <div className={s.forAgree}>{!checkAgreement ? '请勾选用户协议' : ''}</div> */}
            <UserAgreement isCheck={checkAgreement} externalCallBack={changeStatus}/>
            <div className={cx(s.btn, buttonActive ? s.btnActive : '')} onClick={importAccount}>导入钱包</div>
        </>
    )
}

export default observer(CommonPart);