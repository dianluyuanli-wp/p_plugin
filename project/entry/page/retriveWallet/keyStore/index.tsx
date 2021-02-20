/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-20 09:07:13 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-20 09:15:56
 */

import React, { FC, useEffect, useReducer } from 'react';
import s from './index.css';
import HeadBar from '@widgets/headBar';
import { useTranslation } from 'react-i18next';
import { Input } from 'antd';
import cx from 'classnames';
import { observer } from 'mobx-react';
import { runInAction } from 'mobx';
import './index.antd.css';
import { useStores } from '@utils/useStore';
import { globalStoreType } from '@entry/store';
import { validateMnemonicOrHexSeed } from '@utils/tools';
import CommonPart from '../commonPart';
import { changeInput } from '@utils/input';
import { retrieveStoreType } from '../store';

const Mnemonic:FC = function() {
    let { t } = useTranslation();
    const globalStore = useStores('GlobalStore') as globalStoreType;
    const RetrieveStore = useStores('RetrieveStore') as retrieveStoreType;
    const { currentAccount } = globalStore;

    function inputMnemonic(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const inputValue = e.target.value;
        changeInput(RetrieveStore, 'mnemonicWords', e);
        const validateRes = validateMnemonicOrHexSeed(inputValue);
        runInAction(() => {
            RetrieveStore.mnemonicErrMsg = validateRes.errMsg;
        })
    }

    useEffect(() => {
        const { name, mnemonicErrMsg, mnemonicWords, checkAgreement } = RetrieveStore;
        runInAction(() => {
            RetrieveStore.buttonActive = (name && mnemonicWords && !mnemonicErrMsg && checkAgreement)
        })
    }, [RetrieveStore.name, RetrieveStore.mnemonicWords, RetrieveStore.mnemonicErrMsg, RetrieveStore.checkAgreement])

    return (
        <div className={s.wrap}>
            <HeadBar word={'创建钱包'}/>
            <div className={s.wordsWrap}>
                <div className={cx(s.title, s.topTitle)}>助记词</div>
                <Input.TextArea autoSize={{ minRows: 2 }} value={RetrieveStore.mnemonicWords} onChange={(e) => inputMnemonic(e)} className={s.textArea} placeholder={'请粘贴keyStore json文件内容'}/>
                {/* <div className={s.addressError}>{RetrieveStore.mnemonicErrMsg}</div> */}
                <CommonPart />
            </div>
        </div>
    )
}

export default observer(Mnemonic);