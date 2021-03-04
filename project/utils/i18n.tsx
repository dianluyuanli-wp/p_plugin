/*
 * @Author: guanlanluditie 
 * @Date: 2021-01-28 00:12:30 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-03-04 09:40:52
 */
//  import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from "i18next";
//  import { homeCn, homeEn } from '../locales/home';
import { homeCn, homeEn } from '@entry/page/home/language';
import { createACN, createAEN } from '../locales/createAccount';
import { LOCAL_LANGUAGE } from '@constants/app';
import {
  initReactI18next
} from 'react-i18next';

const language = window.localStorage.getItem(LOCAL_LANGUAGE) || 'en';

//  i18n.use(LanguageDetector) //嗅探当前浏览器语言
i18n.use(initReactI18next) //init i18next
.init({
  //引入资源文件
  resources: {
    en: {
        home: homeEn,
        createAccount: createAEN
    },
    zh: {
      home: homeCn,
      createAccount: createACN
    },
  },
  //选择默认语言，选择内容为上述配置中的key，即en/zh
  fallbackLng: language,
  debug: false,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
})

export default i18n;