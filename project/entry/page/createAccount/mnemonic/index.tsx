/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-08 11:23:37 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-10 23:12:59
 */

import React, { FC, useEffect, useReducer, useMemo } from 'react';
import s from './index.css';
import { Input, Form, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { mnemonicGenerate, cryptoWaitReady } from '@polkadot/util-crypto';
// import { } from '../'
import cx from 'classnames';

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
    pickWords?: Array<WordObj>
}
//      "content_security_policy": "script-src 'self' 'unsafe-eval' https://baidu.com/; object-src 'self'",

const CreactMnemonic:FC = function() {
    let { t } = useTranslation();

    //  状态管理
    function stateReducer(state: Object, action: mnemonicStateObj) {
        return Object.assign({}, state, action);
    }
    const [stateObj, setState] = useReducer(stateReducer, { status: STATUS.ONE } as mnemonicStateObj);
    const isStepOne = useMemo(() => stateObj.status === STATUS.ONE, [stateObj.status]);
    useEffect(() => {
        async function init() {
            await cryptoWaitReady();
            const mnemonic = mnemonicGenerate();
            const wordsList = mnemonic.split(' ').map(item => ({ value: item, isPick: false } as WordObj))
            setState({
                words: wordsList,
                pickWords: [],
                randomSortWords: wordsList.sort(() => Math.random() - 0.5)
            })
            console.log(mnemonic, '111');
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
    //  渲染助记词区域
    function showArea() {
        const { status, words, randomSortWords, pickWords } = stateObj;
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

    function buttonClick() {
        const { status } = stateObj;
        if (isStepOne) {
            return;
        }
        if (status === STATUS.TWO) {
            setState({
                status: STATUS.THREE
            })
        } else {

        }
    }

    function button() {
        const { status } = stateObj;
        const isAble = !isStepOne;
        return <div className={cx(s.bottomBtn, isAble ? s.ableBtn : '')} onClick={buttonClick}>
            {status !== STATUS.THREE ? '确认备份' : '完成备份'}
        </div>
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
                <div className={s.info}>请按顺序点点击助记词，已确认您备份正确</div>
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