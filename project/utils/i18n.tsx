//  import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from "i18next";
import { homeCn, homeEn } from '../locales/home';
import { createACN, createAEN } from '../locales/createAccount';
import {
  initReactI18next
} from 'react-i18next';

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
  fallbackLng: "en",
  debug: false,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
})

export default i18n;