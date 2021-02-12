/*
 * @Author: guanlanluditie 
 * @Date: 2021-01-22 22:36:26 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-12 19:00:25
 */
import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ADDRESS_ARRAY } from '@constants/chrome';
import { getStorage, sendMessageToContentScript, setStorage } from '@utils/chrome';
import s from './index.css';
import cx from 'classnames';

const HomePage:FC = function() {
    const history = useHistory();
    let { t ,i18n} = useTranslation()
    function jump() {
        history.push('/createAccount');
    }
    function changeLanguage() {
        i18n.changeLanguage(i18n.language=='en'?'zh':'en')
    }
    function testFun() {
        setStorage({ 'www': 1});
    }
    useEffect(() => {
        async function test() {
            let a = await getStorage({ [ADDRESS_ARRAY]: []});
            let b = await getStorage({ www: 0 });
            //  let b = await getStorage({ })
            console.log(a, b);
        }
        test();
    }, [])
    return (
        <div>
            <div className={s.wrap}>
                <div className={s.loggo} onClick={changeLanguage}/>
            </div>
            <div className={s.word}>{t('home:kitter is a polkadot wallet')}</div>
            <div className={s.word}>{t('home:welcome to use')}</div>
            <div className={cx(s.btn, s.create)} onClick={jump}>{t('home:create wallet')}</div>
            <div className={cx(s.btn, s.importIcon)} onClick={testFun}>{t('home:import wallet')}</div>
        </div>
    )
}

export default HomePage;