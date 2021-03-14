/*
 * @Author: guanlanluditie 
 * @Date: 2021-03-07 15:32:20 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-03-14 20:45:53
 */

import React, { FC, useEffect, useState } from 'react';
import s from './index.css';
import './index.antd.css';
import HeadBar from '@widgets/headBar';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStores } from '@utils/useStore';
import { globalStoreType } from '@entry/store';
import { Tabs } from 'antd';
import { addressFormat } from '@utils/tools';
import { PAGE_NAME } from '@constants/app';
import { getTransRecord } from './service';
import moment from 'moment';


const { TabPane } = Tabs;

const TAB_MAP = {
    ALL: '0',
    INCOME: '1',
    OUT: '2'
}

const Entry:FC = function() {
    let { t } = useTranslation();
    const globalStore = useStores('GlobalStore') as globalStoreType;
    const history = useHistory();
    const [actTab, setTab] = useState(TAB_MAP.ALL);

    //  国际化的包裹函数
    const lanWrap = (input: string) => t(`democracy:${input}`);

    const TargetAdd = '165ketsk66SBVQi7d8w2z1McVnUNkJzbWVqpA9hRanznigDV';

    function getTransArr() {
        const [traArr, setTraArr] = useState([]);
        useEffect(() => {
            async function getRecord() {
                const res = await getTransRecord(TargetAdd);
                const { count, transfers } = res.data || {};
                console.log(res);
                setTraArr(transfers);
            }
            getRecord()
        }, [])
        return traArr;
    }

    function List(tarr: Array<Record<string, any>>) {
        return tarr.map((item, index) => {
            const { amount, block_timestamp, from, to, success, hash } = item;
            const isIn = from !== TargetAdd;
            return <div className={s.singleItem} onClick={() => history.push(PAGE_NAME.TRANSFER_RECORD_DETAIL, { hash })}>
                <div className={s.firstRow}>
                    <div className={s.frLeft}>
                        <div className={cx(s.icon, isIn ? '' : s.outIcon)} />
                        <div>{addressFormat(from)}</div>
                    </div>
                    <div className={s.amout}>{isIn ? '+' : '-'}{amount}</div>
                </div>
                <div className={s.time}>{moment(block_timestamp * 1000).format('DD/MM/YYYY hh:mm:ss')}</div>
            </div>
        })
    }

    const AllAry = getTransArr();
    const outArr = AllAry.filter(item => item.from === TargetAdd);
    const inArr = AllAry.filter(item => item.from !== TargetAdd)


    return (
        <div className={s.wrap}>
            <HeadBar word={'交易记录'}/>
            <Tabs defaultActiveKey={TAB_MAP.ALL} onChange={setTab} centered className='TRtabWrap'>
                <TabPane tab="全部" key={TAB_MAP.ALL}>
                    {List(AllAry)}
                </TabPane>
                <TabPane tab="转入" key={TAB_MAP.INCOME}>
                    {List(inArr)}
                </TabPane>
                <TabPane tab="转出" key={TAB_MAP.OUT}>
                    {List(outArr)}
                </TabPane>
            </Tabs>
        </div>
    )
}

export default observer(Entry);