/*
 * @Author: guanlanluditie 
 * @Date: 2021-03-07 15:32:20 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-03-13 22:48:02
 */

import React, { FC, useReducer } from 'react';
import s from './index.css';
import './index.antd.css';
import HeadBar from '@widgets/headBar';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useStores } from '@utils/useStore';
import { globalStoreType } from '@entry/store';
import DotInput from '@widgets/balanceDotInput';
import { Select, message } from 'antd';
import { useLocalObservable, Observer } from 'mobx-react';
import democrcacyStore, { CreateStoreType } from '../store';
import { WEIGHT_ARR } from '@constants/chain';
import { runInAction } from 'mobx';
import { PAGE_NAME } from '@constants/app';
import BottonBtn from '@widgets/bottomBtn';

interface infoVote {
    errStr?: string;
    ableDot?: number;
}

const Entry = function() {
    let { t } = useTranslation();
    const globalStore = useStores('GlobalStore') as globalStoreType;
    const history = useHistory();
    function stateReducer(state: Object, action: infoVote) {
        return Object.assign({}, state, action);
    }
    const [stateObj, setState] = useReducer(stateReducer, {} as infoVote);

    //  国际化的包裹函数
    const lanWrap = (input: string) => t(`democracy:${input}`);

    function cInput(value: string) {
        runInAction(() => {
            democrcacyStore.voteDot = value;
        })
        //  forceUpdate
        setState({
            ableDot: stateObj.ableDot
        })
    }

    function changeRatio(value: number) {
        runInAction(() => {
            democrcacyStore.voteRatio = value;
        })
    }

    function nextSetp() {
        if (stateObj.errStr || !democrcacyStore.voteDot) {
            message.error('错误的投票额')
        } else {
            history.push(PAGE_NAME.DEMOCRACY_CHECK)
        }
    }

    function setErrStr(value: string) {
        setState({
            errStr: value
        })
    }
    const { voteDot = '0', voteRatio} = democrcacyStore;

    return (
        <Observer>{
            () => <div className={s.wrap}>
                <HeadBar word={'链上公投'}/>
                <div className={s.contentWrap}>
                    <div className={s.bWapr}>
                        <div className={s.title}>投票数量</div>
                        <div className={s.dot}>{globalStore.ableBalance} DOT 可用{globalStore.lockBalance}</div>
                    </div>
                    <DotInput changeInputFn={cInput} controlValue={voteDot} setErr={setErrStr} allDot={globalStore.ableBalance}/>
                    <div className={cx(s.bWapr, s.weight)}>
                        <div className={s.title}>投票权重</div>
                    </div>
                    <Select onChange={changeRatio} className={cx(s.select, 'reSelect')} defaultValue={WEIGHT_ARR[0].ratio}>
                        {WEIGHT_ARR.map((item, index) => {
                            const { text, ratio } = item;
                            return <Select.Option key={index} value={ratio}>{text}</Select.Option>
                        })}
                    </Select>
                    <div className={s.allVote}>总计<div className={s.voteNum}>{parseFloat(democrcacyStore.voteDot || '0') * voteRatio}</div>票</div>
                    <div className={s.split}/>
                    <BottonBtn word='下一步' cb={nextSetp}/>
                </div>
        </div>
        }
        </Observer>

    )
}

export default Entry;