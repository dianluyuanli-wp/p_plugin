/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-08 11:23:37 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-13 23:36:15
 */

import React, { FC, useEffect, useReducer, useMemo } from 'react';
import s from './index.css';
import { Input, Form, Button, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import keyring from '@polkadot/ui-keyring';
//  import { Keyring } from '@polkadot/api'
import { useStores } from '@utils/useStore';
import { CreateStoreType } from '../store';
import { ADDRESS_ARRAY } from '@constants/chrome';
import { getStorage, setStorage } from '@utils/chrome';
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
    pickWords?: Array<WordObj>,
    showLoading?: boolean
}

interface addressArrayObj {
    accountAddress: Array<string>
}
//      "content_security_policy": "script-src 'self' 'unsafe-eval' https://baidu.com/; object-src 'self'",

const CreactMnemonic:FC = function() {
    let { t } = useTranslation();
    const createStore = useStores('CreateAccountStore') as CreateStoreType;

    //  状态管理
    function stateReducer(state: Object, action: mnemonicStateObj) {
        return Object.assign({}, state, action);
    }
    const [stateObj, setState] = useReducer(stateReducer, { status: STATUS.ONE, words: [], pickWords: [] } as mnemonicStateObj);
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
        if (isStepOne) {
            return;
        }
        if (status === STATUS.TWO) {
            setState({
                status: STATUS.THREE
            })
        } else {
            setState({
                showLoading: true
            })
            const { inputSec, accountName } = createStore;
            const originMnemonic = words.map(item => item.value).join(' ');
            const result = keyring.addUri(originMnemonic, inputSec, { name: accountName });
            console.log(result, 111);
            const { json } = result;
            const { address, meta } = json
            const saveKey = json.address;
            const saveObj = { address, meta }
            let origin = await getStorage({ [ADDRESS_ARRAY]: [] }) as addressArrayObj;
            let newArray = origin[ADDRESS_ARRAY];
            newArray.push(saveKey);
            await setStorage({
                [ADDRESS_ARRAY]: newArray,
                [saveKey]: saveObj
            })
            setState({
                showLoading: false
            })
            //  const keyring = new Keyring({ type: 'sr25519' });
            //  const result = keyring.addFromUri(`${originMnemonic}///${inputSec}`);
        }
    }

    function button() {
        const { status } = stateObj;
        const isAble = status === STATUS.TWO || isRightOrder;
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
                <div className={s.info}>请按顺序点击助记词，已确认您备份正确</div>
            </>
    }
    return (
        <div className={s.wrap}>
            {stateObj.showLoading ? <Spin /> : null}
            <div>
                {headInfo()}
                {showArea()}
                {button()}
            </div>
        </div>
    )
}

export default CreactMnemonic;