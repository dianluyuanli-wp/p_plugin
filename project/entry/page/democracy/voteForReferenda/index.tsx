/*
 * @Author: guanlanluditie 
 * @Date: 2021-03-07 15:32:20 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-03-12 23:43:12
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
import { keyring } from '@polkadot/ui-keyring';
import { globalStoreType } from '@entry/store';
import { getAddInfo } from '@entry/service';
import DotInput from '@widgets/balanceDotInput';
import { Select } from 'antd';
import { WEIGHT_ARR } from '@constants/chain';



const Entry:FC = function() {
    let { t } = useTranslation();
    const globalStore = useStores('GlobalStore') as globalStoreType;
    const history = useHistory();

    //  国际化的包裹函数
    const lanWrap = (input: string) => t(`democracy:${input}`);

    //     //  
    //     useEffect(() => {
    //         let a = keyring.encodeAddress('5EHZ7yCT4KgTs79UBcEtfEbJhLYsHD6gazSjk6Yhs8jeCNun');
    //         console.log(a, 1);
    //     }, [])

    function getAbleBalance() {
        const [aBlance, setAb] = useState(0);
        useEffect(() => {
            async function com() {
                const { address } = globalStore.currentAccount;
                const endoceAdd = keyring.encodeAddress(address);
                const res = await getAddInfo(endoceAdd);
                const { balance, lock } = res.account || {};
                setAb(parseInt(balance || 0) - parseInt(lock || 0));
            }
            com();
        })
        return aBlance;
    }

    function cInput(value: string) {
        console.log(value);
    }

    function changeRatio() {

    }

    const ableBalance = getAbleBalance()

    return (
        <div className={s.wrap}>
            <HeadBar word={'链上公投'}/>
            <div className={s.contentWrap}>
                <div className={s.bWapr}>
                    <div className={s.title}>投票数量</div>
                    <div className={s.dot}>{ableBalance} DOT 可用</div>
                </div>
                <DotInput changeInputFn={cInput}/>
                <div className={cx(s.bWapr, s.weight)}>
                    <div className={s.title}>投票权重</div>
                </div>
                <Select onChange={changeRatio} className={cx(s.select, 'reSelect')} dropdownClassName='rePopSelect'>
                    {WEIGHT_ARR.map((item, index) => {
                        const { text, ratio } = item;
                        return <Select.Option key={index} value={ratio}>{text}</Select.Option>
                    })}
                </Select>
            </div>

        </div>
    )
}

export default observer(Entry);