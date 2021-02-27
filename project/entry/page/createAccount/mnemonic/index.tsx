/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-08 11:23:37 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-27 20:52:03
 */

import React, { FC, useEffect, useReducer, useMemo } from 'react';
import s from './index.css';
import { useTranslation } from 'react-i18next';
import keyring from '@polkadot/ui-keyring';
import { useStores } from '@utils/useStore';
import { CreateStoreType } from '../store';
import { globalStoreType } from '@entry/store';
import { useHistory } from 'react-router-dom';
import { mnemonicGenerate, cryptoWaitReady } from '@polkadot/util-crypto';
import cx from 'classnames';
import { Spin } from 'antd';
import { addNewAccount } from '@utils/tools';

const STATUS = {
    ONE: 0,
    TWO: 1,
    THREE: 2
}

interface WordObj {
    value: string,
    isPick: boolean
}
interface mnemonicStateObj {
    status?: number,
    words?: Array<WordObj>,
    randomSortWords?: Array<WordObj>,
    pickWords?: Array<WordObj>,
    showLoading?: boolean
}

export interface addressArrayObj {
    accountAddress: Array<string>
}
//      "content_security_policy": "script-src 'self' 'unsafe-eval' https://baidu.com/; object-src 'self'",

const CreactMnemonic:FC = function() {
    let { t } = useTranslation();
    const history = useHistory();
    const createStore = useStores('CreateAccountStore') as CreateStoreType;
    const globalStore = useStores('GlobalStore') as globalStoreType;

    //  状态管理
    function stateReducer(state: Object, action: mnemonicStateObj) {
        return Object.assign({}, state, action);
    }
    const [stateObj, setState] = useReducer(stateReducer, { status: STATUS.ONE, words: [], pickWords: [], showLoading: false } as mnemonicStateObj);
    //  是否第一阶段
    const isStepOne = useMemo(() => stateObj.status === STATUS.ONE, [stateObj.status]);
    //  是否正确恢复的顺序
    const isRightOrder = useMemo(() => {
        const { words, pickWords } = stateObj;
        return (words.length === pickWords.length) && words.every((item, index) => item.value === pickWords[index].value);
    }, [stateObj.words, stateObj.pickWords]);
    useEffect(() => {
        async function init() {
            await cryptoWaitReady();
            const mnemonic = mnemonicGenerate() as string;
            const wordsList = mnemonic.split(' ').map((item) => ({ value: item, isPick: false } as WordObj))
            setState({
                words: wordsList,
                pickWords: [],
                randomSortWords: wordsList.slice()
                //  .sort(() => Math.random() - 0.5)
            })
        }
        init();
    }, []);

    //  选择助记词
    function pickWord(value: string, isCancel = false) {
        const { randomSortWords, pickWords } = stateObj;
        const targetIndex = randomSortWords.findIndex(item => item.value === value);
        if (randomSortWords[targetIndex].isPick && !isCancel) {
            return;
        }
        const copyList = randomSortWords.slice();
        const copyPickList = pickWords.slice();
        if (isCancel) {
            //  如果是删除
            copyList[targetIndex].isPick = false;
            const pcikIndex = pickWords.findIndex(item => item.value === value);
            copyPickList.splice(pcikIndex, 1);
        } else {
            copyList[targetIndex].isPick = true;
            copyPickList.push(randomSortWords[targetIndex]);
        }
        //  设置状态
        setState({
            randomSortWords: copyList,
            pickWords: copyPickList
        })
    }
    
    function reset() {
        const { randomSortWords } = stateObj;
        setState({
            pickWords: [],
            randomSortWords: randomSortWords.map(item => { 
                item.isPick = false;
                return item;
            })
        })
    }
    //  渲染助记词区域
    function showArea() {
        const { status, words, randomSortWords, pickWords = [] } = stateObj;
        const contentMap = {
            [STATUS.ONE]: () => <>
                <div className={s.mask} onClick={() => setState({ status: STATUS.TWO })}>
                    <div className={s.lock}/>
                    <div className={s.btnTip}>点击显示助记词</div>
                </div>
            </>,
            [STATUS.TWO]: () => <>
                <div className={s.showContent}>
                    {words.map(item => {
                        const { value } = item;
                        return <div className={s.tag} key={value}>{value}</div>
                    })}
                </div>
            </>,
            [STATUS.THREE]: () => <>
                <div className={s.showContent}>
                    {pickWords.map(item => {
                        const { value } = item;
                        return <div className={s.tag} key={value} onClick={() => pickWord(value, true)}>{value}</div>
                    })}
                </div>
                <div className={s.check}>
                    {(!isRightOrder && (pickWords.length === words.length)) ?
                        <>顺序不正确,<span className={s.deLine} onClick={reset}>点击重试</span></>
                        : null
                    }
                </div>
                <div className={s.pickContent}>
                    {randomSortWords.map(item => {
                        const { value, isPick } = item;
                        return <div className={cx(s.tag, isPick ? s.grayTag : '')} key={value} onClick={() => pickWord(value)}>{value}</div>
                    })}
                </div>
            </>
        }
        return contentMap[status]();
    }

    async function buttonClick() {
        const { status, words } = stateObj;
        //  第一阶段直接返回
        if (isStepOne) {
            return;
        }
        //  第二阶段就切换阶段
        if (status === STATUS.TWO) {
            setState({
                status: STATUS.THREE
            })
        } else {
            setState({
                showLoading: true
            })
            setTimeout(async () => {
                const { inputSec, accountName } = createStore;
                const originMnemonic = words.map(item => item.value).join(' ');
                //  创建新账号
                const result = keyring.addUri(originMnemonic, inputSec, { name: accountName });
                await addNewAccount(result);
                setState({
                    showLoading: false
                })
                history.goBack();
            }, 0)

        }
    }

    function button() {
        const { status } = stateObj;
        const isAble = status === STATUS.TWO || isRightOrder;
        return <Spin spinning={stateObj.showLoading}>
            <div className={cx(s.bottomBtn, isAble ? s.ableBtn : '')} onClick={buttonClick}>
                {status !== STATUS.THREE ? '确认备份' : '完成备份'}
            </div>
        </Spin>
    }

    function headInfo() {
        const { status } = stateObj;
        return status !== STATUS.THREE ? <>
                <div className={s.title}>备份助记词</div>
                <div className={s.info}>请按书序手动抄写下面助记词，确保备份正确</div>
                <div className={s.info}><span className={s.point}>·</span> 获得助记词等同于拥有钱包资产所有权</div>
                <div className={s.info}><span className={s.point}>·</span> 不要截屏或复制，否则可能会造成资产损失</div>
            </> :
            <>
                <div className={s.title}>确认助记词</div>
                <div className={s.info}>请按顺序点击助记词，已确认您备份正确</div>
            </>
    }
    return (
        <div className={s.wrap}>
            <div>
                {headInfo()}
                {showArea()}
                {button()}
            </div>
        </div>
    )
}

export default CreactMnemonic;