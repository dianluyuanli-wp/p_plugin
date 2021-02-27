/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-25 09:53:26 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-27 21:34:14
 */


import React, { FC } from 'react';
import s from './index.css';
import HeadBar from '@widgets/headBar';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';
import { useStores } from '@utils/useStore';
import { PAGE_NAME } from '@constants/app';
import { globalStoreType } from '@entry/store';
import { setStorage } from '@utils/chrome';
//  import RetrieveStore from '../store';

interface HState {
    address?: string;
}

const Entry:FC = function() {
    let { t } = useTranslation();
    const globalStore = useStores('GlobalStore') as globalStoreType;
    const history = useHistory();

    const { address } = history.location.state as HState;
    const configAccount = globalStore.accountObj[address] as Record<string, any>;

    function jump(path: string) {
        //  重新进入的时候要重置数据
        // RetrieveStore.resetStore();
        history.push(path, { address });
    }

    return (
        <div className={s.wrap}>
            <HeadBar word={'钱包管理'}/>
            <div className={cx(s.item, s.topItem)}>
                <div>钱包地址</div>
                <div className={s.addressItem}>{address}</div>
            </div>
            <div className={s.item} onClick={() => jump(PAGE_NAME.SW_EDIT_NAME)}>
                <div>钱包名称</div>
                <div className={s.aName}>
                    <div className={s.conName}>{configAccount.meta.name}</div>
                    <div className={s.arrow}/>
                </div>
            </div>
            <div className={s.item} onClick={() => jump(PAGE_NAME.SW_EDIT_SECRET)}>
                <div>钱包密码</div>
                <div className={s.aName}>
                    <div className={s.arrow}/>
                </div>
            </div>
            <div className={s.bottonTitle}>钱包备份</div>
            <div className={s.item} onClick={() => jump(PAGE_NAME.SW_EDIT_BACKUP)}>
                <div>备份keyStore</div>
                <div className={s.aName}>
                    <div className={s.arrow}/>
                </div>
            </div>
            <div className={s.btn} onClick={() => jump(PAGE_NAME.SW_EDIT_DELETE)}>删除</div>
        </div>
    )
}

export default Entry;