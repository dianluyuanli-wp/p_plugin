/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-27 21:17:37 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-27 23:08:07
 */

import React, { FC, useReducer } from 'react';
import s from './index.css';
import HeadBar from '@widgets/headBar';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useStores } from '@utils/useStore';
import { globalStoreType } from '@entry/store';
import { Input, message, Spin } from 'antd';
import { keyring } from '@polkadot/ui-keyring';
import { runInAction } from 'mobx';
import { PAGE_NAME } from '@constants/app';
import { removeStorage, setStorage, getStorage } from '@utils/chrome';
import { ADDRESS_ARRAY } from '@constants/chrome';

interface HState {
    address?: string;
}

interface SecState {
    secret?: string,
    errorInfo?: string,
    isSpining?: boolean,
}

const DeleteAccount:FC = function() {
    let { t } = useTranslation();
    const globalStore = useStores('GlobalStore') as globalStoreType;
    const { favoriteAccount } = globalStore;
    const history = useHistory();

    //  状态管理
    function stateReducer(state: Object, action: SecState) {
        return Object.assign({}, state, action);
    }
    const [stateObj, setState] = useReducer(stateReducer, { secret: '', errorInfo: '', isSpining: false } as SecState);

    const { address } = history.location.state as HState;
    const configAccount = globalStore.accountObj[address];

    function enterSec(e: React.ChangeEvent<HTMLInputElement>) {
        setState({
            secret: e.target.value
        });
    }

    async function deleteAccount(add: string) {
        //  避免冒泡
        let ans = await getStorage({ [ADDRESS_ARRAY]: [] }) as any;
        let addArr = ans[ADDRESS_ARRAY];
        console.log(ans, addArr);
        const targetIndex = addArr.indexOf(add);
        addArr.splice(targetIndex, 1)
        setStorage({
            [ADDRESS_ARRAY]: addArr
        })
        if (add === favoriteAccount) {
            runInAction(() => {
                globalStore.favoriteAccount = addArr[0];
            })
        }
        //  同步自己store的内容
        runInAction(() => {
            globalStore.addressArr = addArr;
            delete globalStore.accountObj[add];
        })
        removeStorage(add);
    }

    async function confirm() {
        setState({
            isSpining: true
        });
        setTimeout(async () => {
            try {
                keyring.restoreAccount(configAccount, stateObj.secret);
            } catch(e) {
                return setState({
                    errorInfo: '密码错误',
                    isSpining: false
                })
            }
            setState({
                isSpining: false,
                errorInfo: '',
            })
            await deleteAccount(address);
            message.info('已删除账号');
            history.push(PAGE_NAME.HOME);
        }, 0)
    }

    return (
        <div className={s.wrap}>
            <HeadBar word={'删除钱包'}/>
            <Input.Password onChange={enterSec} className={s.input} placeholder={'请输入密码'}/>
            <div className={s.info}>{stateObj.errorInfo}</div>
            <Spin spinning={stateObj.isSpining}>
                <div className={s.confirm} onClick={confirm}>确认</div>
            </Spin>
        </div>
    )
}

export default DeleteAccount;