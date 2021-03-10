/*
 * @Author: guanlanluditie 
 * @Date: 2021-03-09 23:37:26 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-03-10 09:58:22
 */

import React, { FC, useEffect, useState } from 'react';
import s from './index.css';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStores } from '@utils/useStore';
import { globalStoreType } from '@entry/store';
import democrcacyStore from '../store';
import { myFormatBalance, addressFormat } from '@utils/tools';


const TAB_MAP = {
    REFERENDA: '0',
    PROPOSAL: '1',
    CANDIDATE: '2'
}

const Referenda:FC = function() {
    let { t } = useTranslation();
    const globalStore = useStores('GlobalStore') as globalStoreType;
    const history = useHistory();
    const [actTab, setTab] = useState(TAB_MAP.REFERENDA);

    //  国际化的包裹函数
    const lanWrap = (input: string) => t(`democracy:${input}`);
    const { referendum_index, pre_image } = democrcacyStore.reScanDetial;

    const { call_module, call_name, author } = pre_image;
    return (
        <div className={s.wrap}>
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
            {/* <div className={s.leftTime}>
                <div className={s.author}>{addressFormat(author.address, 8)}</div>
                <div className={s.ddetial}>提案详情</div>
            </div> */}
        </div>
    )
}

export default observer(Referenda);