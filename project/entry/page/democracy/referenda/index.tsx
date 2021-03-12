/*
 * @Author: guanlanluditie 
 * @Date: 2021-03-09 23:37:26 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-03-10 09:58:22
 */

import React, { FC, useEffect, useState, useMemo } from 'react';
import s from './index.css';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStores } from '@utils/useStore';
import { globalStoreType } from '@entry/store';
import democrcacyStore from '../store';
import { runInAction } from 'mobx';
import { Spin } from 'antd';
import BN from 'bn.js';
import { BN_ONE, formatNumber, isBoolean } from '@polkadot/util';
import { myFormatBalance, addressFormat, useBlockTime } from '@utils/tools';
import { getReferendas, getReferDetail } from '../service';
import type { DeriveReferendumExt } from '@polkadot/api-derive/types';


const TAB_MAP = {
    REFERENDA: '0',
    PROPOSAL: '1',
    CANDIDATE: '2'
}

const Referenda:FC = function() {
    let { t } = useTranslation();
    const globalStore = useStores('GlobalStore') as globalStoreType;
    const history = useHistory();
    const [hasInit, setInit] = useState(false);
    const [oHasInit, setOInit] = useState(false);
    

    //  国际化的包裹函数
    const lanWrap = (input: string) => t(`democracy:${input}`);
    const { referendum_index, pre_image = {}, delay } = democrcacyStore.reScanDetial;

    //  subscan接口更新
    useEffect(() => {
        async function res() {
            let rank = 0;
            try {
                const res = await getReferendas();
                rank = res.data.list[0].referendum_index as number;
            } catch {}

            const subRes = await getReferDetail(rank);
            runInAction(() => {
                democrcacyStore.reScanDetial = subRes.data.info;
            })
            setInit(true);
            console.log(subRes, 'few');
        }
        res();
    }, [])

    //  官方api接口更新
    useEffect(() => {
        async function res() {
            try {
                const officalRes = await globalStore.api.derive.democracy.referendums();
                console.log(officalRes);
                runInAction(() => {
                    democrcacyStore.referenda = officalRes[0];
                })
                setOInit(true);
            } catch {}

        }
        globalStore.hasInit && res();
    }, [globalStore.hasInit])

    const { call_module, call_name, author } = pre_image;


    function comLeft() {
        const [value, setValue] = useState(new BN(0));
        useEffect(() => {
            async function comDetail() {
                const bestNum = await globalStore.api.derive.chain.bestNumber();
                const remainBlock = democrcacyStore.referenda.status.end.sub(bestNum).isub(BN_ONE);
                setValue(remainBlock);
            }
            globalStore.hasInit && oHasInit && comDetail();
        }, [oHasInit, globalStore.hasInit])
        return value;
    }
    const getLeftBlock = comLeft();
    const [, text] = useBlockTime(getLeftBlock);

    function comRate() {
        const [value, setValue] = useState('');
        useEffect(() => {
            async function comDetail() {
                const totalIssuance = await globalStore.api.query.balances.totalIssuance();
                const votedTotal = democrcacyStore.referenda.votedTotal;
                const res = `${((votedTotal.muln(10000).div(totalIssuance).toNumber()) / 100).toFixed(4)}%`
                setValue(res);
            }
            globalStore.hasInit && oHasInit && comDetail();
        }, [oHasInit, globalStore.hasInit])
        return value;
    }
    const joinRate = comRate();
    return (
        <div className={s.wrap}>
            {hasInit && globalStore.hasInit ?
                <>
                    <div className={s.title}>
                        <div className={s.rank}>#{referendum_index}</div>
                        <div>{`${call_module}.${call_name}`}</div>
                        <div className={s.img}/>
                    </div>
                    <div className={s.rowTitle}>提案人</div>
                    <div className={s.authorWrap}>
                        <div className={s.author}>{addressFormat(author.address, 8)}</div>
                        <div className={s.ddetial}>提案详情</div>
                    </div>
                    <div className={s.rowTitle}>投票剩余时间</div>
                    <div className={s.author}>{text}</div>
                    <div className={s.rowTitle}>投票参与度</div>
                    <div className={s.author}>{democrcacyStore.referenda?.votedTotal.div(new BN(Math.pow(10, 10))).toString() || '0'}DOT({joinRate})</div>
                </>
                : <Spin />
            }
        </div>
    )
}

export default observer(Referenda);