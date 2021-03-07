/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-26 08:53:09 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-03-06 11:52:40
 */

import React, { FC, useState } from 'react';
import s from './index.css';
import { toJS } from 'mobx';
import HeadBar from '@widgets/headBar';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';
import { useStores } from '@utils/useStore';
import { globalStoreType } from '@entry/store';
import { Input, message } from 'antd';
import { updateAccountInfo } from '@utils/tools';
import type { CreateResult } from '@polkadot/ui-keyring/types';

interface HState {
    address?: string;
}

const Entry:FC = function() {
    let { t } = useTranslation();
    const globalStore = useStores('GlobalStore') as globalStoreType;
    const history = useHistory();

    const [newName, setNewName] = useState('');

    //  国际化的包裹函数
    const lanWrap = (input: string) => t(`setWalletDetial:${input}`);

    const { address } = history.location.state as HState;
    const configAccount = globalStore.accountObj[address];

    function enterNewName(e: React.ChangeEvent<HTMLInputElement>) {
        setNewName(e.target.value);
    }

    async function confirm() {
        if (newName.length === 0) {
            return;
        }
        const originJson = toJS(configAccount);
        originJson.meta.name = newName;
        await updateAccountInfo({ json: originJson} as CreateResult);
        message.info(lanWrap('Name updated'));
    }

    return (
        <div className={s.wrap}>
            <HeadBar word={lanWrap('Change wallet name')}/>
            <Input onChange={enterNewName} className={s.input} placeholder={lanWrap('1-12 characters')} maxLength={12}/>
            <div className={cx(s.confirm, newName.length > 0 ? s.heighLight : '')} onClick={confirm}>{lanWrap('confirm')}</div>
        </div>
    )
}

export default Entry;