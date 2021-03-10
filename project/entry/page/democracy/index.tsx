/*
 * @Author: guanlanluditie 
 * @Date: 2021-03-07 15:32:20 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-03-10 10:02:07
 */

import React, { FC, useEffect, useState } from 'react';
import s from './index.css';
import './index.antd.css';
import HeadBar from '@widgets/headBar';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStores } from '@utils/useStore';
import request from 'umi-request';
import { globalStoreType } from '@entry/store';
import { Tabs } from 'antd';
import { runInAction } from 'mobx';
import Referenda from './referenda';
import DemocrayStore from './store';
import { getReferendas, getReferDetail } from './service';
import type { DeriveReferendumExt } from '@polkadot/api-derive/types';

const { TabPane } = Tabs;

const TAB_MAP = {
    REFERENDA: '0',
    PROPOSAL: '1',
    CANDIDATE: '2'
}

const Entry:FC = function() {
    let { t } = useTranslation();
    const globalStore = useStores('GlobalStore') as globalStoreType;
    const history = useHistory();
    const [actTab, setTab] = useState(TAB_MAP.REFERENDA);

    //  国际化的包裹函数
    const lanWrap = (input: string) => t(`democracy:${input}`);

    useEffect(() => {
        async function res() {
            let rank = 0;
            try {
                const res = await getReferendas();
                rank = res.data.list[0].referendum_index as number;
            } catch {}

            const subRes = await getReferDetail(rank);
            runInAction(() => {
                DemocrayStore.reScanDetial = subRes.data.info;
            })
            console.log(subRes, 'few');
        }
        res();
    }, [])

    return (
        <div className={s.wrap}>
            <HeadBar word={'民主治理'}/>
            <Tabs defaultActiveKey={TAB_MAP.REFERENDA} onChange={setTab} centered className='DEtabWrap'>
                <TabPane tab="链上公投" key={TAB_MAP.REFERENDA}>
                    <Referenda />
                </TabPane>
                <TabPane tab="社区提案" key={TAB_MAP.PROPOSAL}>
                    Content of Tab Pane 2
                </TabPane>
                <TabPane tab="理事会选举" key={TAB_MAP.CANDIDATE}>
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        </div>
    )
}

export default observer(Entry);