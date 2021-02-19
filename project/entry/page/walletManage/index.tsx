/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-15 22:25:13 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-16 18:04:07
 */

import React, { FC, useEffect } from 'react';
import s from './index.css';
import HeadBar from '@widgets/headBar';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import cx from 'classnames';
import { PAGE_NAME } from '@constants/app';
import { addressFormat } from '@utils/tools';
import { removeStorage, setStorage, getStorage } from '@utils/chrome';
import { useStores } from '@utils/useStore';
import { ADDRESS_ARRAY } from '@constants/chrome';
import type { KeyringPair$Json } from '@polkadot/keyring/types';
import { globalStoreType } from '../../store';

const WalletManage:FC = function() {
    let { t } = useTranslation();
    const globalStore = useStores('GlobalStore') as globalStoreType;
    const { currentAccount, favoriteAccount } = globalStore;
    const history = useHistory();

    useEffect(() => {
        console.log(globalStore.accountObj);
    },[])

    function jump(path: string) {
        history.push(path);
    }

    function changeFavorite(address: string) {
        runInAction(() => {
            globalStore.favoriteAccount = address;
        })
    }

    async function deleteAccount(e: React.MouseEvent<HTMLSpanElement, MouseEvent>, add: string) {
        //  避免冒泡
        e.stopPropagation();
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

    function renderAccount() {
        const target = globalStore.accountObj;
        return Object.keys(target).map((item, index) => {
            const { address, meta } = target[item] as KeyringPair$Json;
            return <div key={index} className={s.accountWrap} onClick={() => changeFavorite(address)}>
                <div className={s.firRow}>
                    <div className={s.ffRow}>
                        <div className={cx(s.point, address === globalStore.favoriteAccount ? s.activePoint : '')}/>
                        <div className={s.aName}>{meta.name}</div>
                    </div>
                    <div className={s.tail} onClick={(e) => deleteAccount(e, address)}>···</div>
                </div>
                <div className={s.secAdd}>{addressFormat(address)}</div>
            </div>
        })
    }

    return (
        <div className={s.wrap}>
            <HeadBar word={'钱包管理'}/>
            <div className={s.leftBar}>
                <div className={s.tab}>
                    <div className={s.blueBlock}/>
                    <div className={s.polkadotIcon}></div>
                </div>
            </div>
            <div className={s.rigthContent}>
                <div className={s.title}>Polkadot <div className={s.addIcon} onClick={() => jump(PAGE_NAME.RETRIEVE_WALLET)}/></div>
                {renderAccount()}
            </div>
        </div>
    )
}

export default observer(WalletManage);