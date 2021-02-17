/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-17 16:39:13 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-17 20:34:02
 */

import React, { FC, useEffect, useReducer } from 'react';
import s from './index.css';
import HeadBar from '@widgets/headBar';
import { useTranslation } from 'react-i18next';
import { Input } from 'antd';
import cx from 'classnames';
import { observer } from 'mobx-react';
import './index.antd.css';
import { useStores } from '@utils/useStore';
import { globalStoreType } from '@entry/store';
import { validateMnemonicOrHexSeed } from '@utils/tools';
import CommonPart from '../commonPart';
import { changeInput } from '@utils/input';
import ReStore, { retrieveStoreType } from '../store';

interface retrieveStatus {
    mnemoErrMsg?: string,
    userArgeementStatus?: boolean,
}

const Mnemonic:FC = function() {
    let { t } = useTranslation();
    const globalStore = useStores('GlobalStore') as globalStoreType;
    const RetrieveStore = useStores('RetrieveStore') as retrieveStoreType;
    function stateReducer(state: Object, action: retrieveStatus) {
        return Object.assign({}, state, action);
    }
    const [stateObj, setState] = useReducer(stateReducer, {mnemoErrMsg: '' } as retrieveStatus);
    const { currentAccount } = globalStore;

    function inputMnemonic(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const inputValue = e.target.value;
        const validateRes = validateMnemonicOrHexSeed(inputValue);
        if (!validateRes.success) {
            setState({ mnemoErrMsg: validateRes.errMsg });
            return;
        } else {
            changeInput(RetrieveStore, 'mnemonicWords', e);
        }
    }
    console.log(ReStore, '22');

    return (
        <div className={s.wrap}>
            <HeadBar word={'创建钱包'}/>
            <div className={s.wordsWrap}>
                <div className={cx(s.title, s.topTitle)}>助记词</div>
                <Input.TextArea autoSize={{ minRows: 2 }} value={RetrieveStore.mnemonicWords} onChange={(e) => inputMnemonic(e)} className={s.textArea} placeholder={'请输入助记词,并使用空格分隔'}/>
                <div className={s.addressError}>{stateObj.mnemoErrMsg}</div>
                <CommonPart />
            </div>
        </div>
    )
}

export default observer(Mnemonic);