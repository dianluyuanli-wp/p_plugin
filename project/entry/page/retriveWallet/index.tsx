/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-16 17:54:00 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-17 16:18:04
 */

import React, { FC, useEffect, useReducer } from 'react';
import s from './index.css';
import HeadBar from '@widgets/headBar';
import UserAgreement from '@widgets/userAgreement';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Input } from 'antd';
import cx from 'classnames';
import './index.antd.css';
import { PAGE_NAME } from '@constants/app';
import { useStores } from '@utils/useStore';
import { globalStoreType } from '@entry/store';
import { validateMnemonicOrHexSeed } from '@utils/tools';


const RETRIEVE_STATUS = {
    ENTRY: 0,
    MNEMONIC: 1,
    PRIVITE_KEY: 2,
    STORE: 3
}

interface retrieveStatus {
    status?: number,
    secret?: string,
    name?: string,
    mnemonic?: string,
    mnemoErrMsg?: string,
    priviteKey?: string,
    userArgeementStatus?: boolean,
    store?: string
}

const SetPanel:FC = function() {
    let { t } = useTranslation();
    const globalStore = useStores('GlobalStore') as globalStoreType;
    function stateReducer(state: Object, action: retrieveStatus) {
        return Object.assign({}, state, action);
    }
    const [stateObj, setState] = useReducer(stateReducer, { status: RETRIEVE_STATUS.ENTRY, secret: '', mnemonic: '', store: '', mnemoErrMsg: '', name: '' } as retrieveStatus);
    const { currentAccount } = globalStore;
    const history = useHistory();

    function jump(path: string) {
        history.push(path);
    }

    function changeStatus(status: number) {
        setState({
            status
        })
    }

    function commonPart() {
        return <>
            <div className={cx(s.title, s.topTitle)}>用户名</div>
            <Input
                onChange={(e) => setState({ name: e.target.value })}
                className={cx(s.secInput, 'retrieveInput')} placeholder={'账户名称'}
            />
            <div className={cx(s.title, s.topTitle)}>密码</div>
            <Input.Password
                onChange={(e) => setState({ secret: e.target.value })}
                className={cx(s.secInput, 'retrieveInput')} placeholder={'钱包密码'}
            />
            <UserAgreement />
        </>
    }

    function renderEntry() {
        return <>
            <div className={cx(s.item, s.wallet)} onClick={() => jump(PAGE_NAME.CREATE_ACCOUNT)}>创建钱包</div>
            <div className={cx(s.title, s.titlePadding)}>导入钱包</div>
            <div className={cx(s.item, s.word)} onClick={() => changeStatus(RETRIEVE_STATUS.MNEMONIC)}>助记词</div>
            <div className={cx(s.item, s.key)} onClick={() => changeStatus(RETRIEVE_STATUS.PRIVITE_KEY)}>私钥</div>
            <div className={cx(s.item, s.store)} onClick={() => changeStatus(RETRIEVE_STATUS.STORE)}>KeyStore</div>
        </>
    }

    function inputMnemonic(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const inputValue = e.target.value;
        console.log(inputValue);
        const validateRes = validateMnemonicOrHexSeed(inputValue);
        if (!validateRes.success) {
            setState({ mnemoErrMsg: validateRes.errMsg });
            return;
        } else {
            setState({ mnemonic: inputValue })
        }
    }

    function renderWords() {
        return <div className={s.wordsWrap}>
            <div className={cx(s.title, s.topTitle)} onClick={() => jump(PAGE_NAME.PART_ONE)}>助记词</div>
            <Input.TextArea autoSize={{ minRows: 2 }} onChange={(e) => inputMnemonic(e)} className={s.textArea} placeholder={'请输入助记词,并使用空格分隔'}/>
            <div className={s.addressError}>{stateObj.mnemoErrMsg}</div>
            {commonPart()}
        </div>
    }

    function ContentRender() {
        const contentMap = {
            [RETRIEVE_STATUS.ENTRY]: renderEntry,
            [RETRIEVE_STATUS.MNEMONIC]: renderWords,
            [RETRIEVE_STATUS.PRIVITE_KEY]: (): any => null,
            [RETRIEVE_STATUS.STORE]: (): any => null
        }
        return contentMap[stateObj.status]();
    }

    return (
        <div className={s.wrap}>
            <HeadBar word={'创建钱包'}/>
            {ContentRender()}
        </div>
    )
}

export default SetPanel;