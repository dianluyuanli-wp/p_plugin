/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-26 09:24:07 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-27 23:00:24
 */

import React, { FC, useReducer, useEffect } from 'react';
import s from './index.css';
import HeadBar from '@widgets/headBar';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import cx from 'classnames';
import { useStores } from '@utils/useStore';
import { keyring } from '@polkadot/ui-keyring';
import { globalStoreType } from '@entry/store';
import { Input, Spin } from 'antd';
import SecretInput from '@widgets/secretInput';
import SWStore from '../store';
import type { CreateResult } from '@polkadot/ui-keyring/types';
import { updateAccountInfo } from '@utils/tools';

interface HState {
    address?: string;
}

const INFO_STATUS = {
    ONE: 0,
    TWO: 1,
    THREE: 2,
    FOUR: 3
}

interface SecState {
    oldSec?: string,
    infoStatus?: number,
    buttonActive?: boolean,
    isSpining?: boolean
}

const ChangeSec:FC = function() {
    let { t } = useTranslation();
    const globalStore = useStores('GlobalStore') as globalStoreType;
    const history = useHistory();

    //  状态管理
    function stateReducer(state: Object, action: SecState) {
        return Object.assign({}, state, action);
    }
    const [stateObj, setState] = useReducer(stateReducer, { infoStatus: INFO_STATUS.ONE, oldSec: '', isSpining: false } as SecState);

    const { address } = history.location.state as HState;
    const targetAccount = globalStore.accountObj[address];

    function oldSecInput(e: React.ChangeEvent<HTMLInputElement>) {
        setState({
            oldSec: e.target.value
        })
    }

    useEffect(() => {
        const { secret, confirmSecret } = SWStore;
        if (secret.length < 8) {
            return setState({
                infoStatus: INFO_STATUS.TWO,
                buttonActive: false
            })
        }
        if (secret !== confirmSecret) {
            return setState({
                infoStatus: INFO_STATUS.THREE,
                buttonActive: false
            })
        }
        setState({
            infoStatus: INFO_STATUS.ONE,
            buttonActive: true
        })
    }, [SWStore.secret, SWStore.confirmSecret])

    function btnCLick() {
        if (stateObj.buttonActive) {
            setState({
                isSpining: true
            })
            setTimeout(() => {
                try {
                    keyring.restoreAccount(targetAccount, stateObj.oldSec);
                } catch(e) {
                    return setState({
                        infoStatus: INFO_STATUS.FOUR,
                        isSpining: false
                    })
                }
                const keyPair = keyring.getPair(address);
                //  没有这一步无法改密，不知道为啥，这一步貌似会解出来私钥
                keyPair.decodePkcs8(stateObj.oldSec);
                const newJson = keyPair.toJson(SWStore.secret);
                newJson.meta.whenEdited = Date.now();
                setState({
                    isSpining: false
                })
                updateAccountInfo({ json: newJson } as CreateResult);
            }, 0)
        }
    } 

    function info() {
        const contentMap = {
            [INFO_STATUS.ONE]: '不少于8位字符,建议混合大小写字母、数字、符号',
            [INFO_STATUS.TWO]: '密码位数少于8位',
            [INFO_STATUS.THREE]: '两次密码输入不一致',
            [INFO_STATUS.FOUR]: '密码错误'
        }
        return <div className={s.info}>{contentMap[stateObj.infoStatus]}</div>
    }

    return (
        <div className={s.wrap}>
            <HeadBar word={'修改钱包密码'}/>
            <div className={s.contentWrap}>
                <div className={s.topTitle}>旧的密码</div>
                <Input.Password onChange={(e) => oldSecInput(e)} className={s.input} placeholder={'钱包密码'}/>
                <SecretInput title={'新的密码'} secretKey='secret' checkSecretKey='confirmSecret' store={SWStore}/>
                {info()}
                <Spin spinning={stateObj.isSpining}>
                    <div className={cx(s.confirm, stateObj.buttonActive ? s.active : '')} onClick={btnCLick}>确认</div>
                </Spin>
            </div>
        </div>
    )
}

export default observer(ChangeSec);