/*
 * @Author: guanlanluditie 
 * @Date: 2021-03-07 15:32:20 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-03-08 09:27:21
 */

import React, { FC, useEffect } from 'react';
import s from './index.css';
import HeadBar from '@widgets/headBar';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStores } from '@utils/useStore';
import request from 'umi-request';
import { globalStoreType } from '@entry/store';

const Entry:FC = function() {
    let { t } = useTranslation();
    const globalStore = useStores('GlobalStore') as globalStoreType;
    const history = useHistory();

    //  国际化的包裹函数
    const lanWrap = (input: string) => t(`democracy:${input}`);

    useEffect(() => {
        async function res() {
            let ress = await globalStore.api.derive.democracy.referendums();
            console.log(ress);
            const xx = await request.post('https://polkadot.subscan.io/api/scan/democracy/referendum', {
                data: {
                    referendum_index: 18
                }
            })
            console.log(xx, 'few');
        }
        console.log(111);
        res();
    }, [])

    return (
        <div className={s.wrap}>
            <HeadBar word={'民主治理'}/>
        </div>
    )
}

export default observer(Entry);