/*
 * @Author: guanlanluditie 
 * @Date: 2021-01-22 22:36:26 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-01-29 12:00:16
 */
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
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
    return (
        <div>
            <div className={s.wrap}>
                <div className={s.loggo} onClick={changeLanguage}/>
            </div>
            <div className={s.word}>{t('home:kitter is a polkadot wallet')}</div>
            <div className={s.word}>{t('home:welcome to use')}</div>
            <div className={cx(s.btn, s.create)} onClick={jump}>{t('home:create wallet')}</div>
            <div className={cx(s.btn, s.importIcon)}>{t('home:import wallet')}</div>
        </div>
    )
}

export default HomePage;