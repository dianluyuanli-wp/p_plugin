/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-07 11:50:33 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-03-06 12:32:13
 */

import React, { FC } from 'react';
import s from './index.css';
import HeadBar from '@widgets/headBar';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

const CreactAccount:FC = function() {
    let { t } = useTranslation();
    //  国际化的包裹函数
    const lanWrap = (input: string) => t(`userAgreement:${input}`);
    return (
        <div className={s.wrap}>
            <HeadBar word={lanWrap('User agreement')}/>
            <div className={s.title}>kitter用户协议</div>
            <div className={s.content}>
                <div className={s.tag}>最新更新时间：2020年12月15日</div>
                <div className={s.tag}>尊敬的用户</div>
                <div>感谢您选择Kiter的服务。《Kiter服务协议》（以下简称“本协议”）由CHAINBRIDGE PTE. LTD.（以下简称“本公司”，公司注册号：202000958N，注册地址：9 Temasek Boulevard #04-02 Suntec Tower Two Singapore 038989）和您（以下简称“用户”）签订，本协议在您与本公司之间具有合同上的法律效力。在本协议中：（1）“我们”指代本公司，“我们的”应据此解释；（2）“您”指代用户，“您的”应据此解释。您和本公司单独称为“一方”，合称为“双方”。
本公司在此特别提醒您，在使用Kiter应用（以下简称“Kiter” 或“本软件”，Kiter可在各移动应用平台上下载，包括但不限于Google Play和Apple App Store）之前，请认真阅读本协议及后文提及的相关协议，尤其是本协议中“免责及责任限制”等以加粗形式体现的条款，确保您充分理解本协议中各条款，并自主考虑风险。
一、 关于本协议的确认与接纳
1.您理解本协议及有关协议适用于Kiter及Kiter上本公司所自主开发和拥有的去中心化
</div>
            </div>
        </div>
    )
}

export default CreactAccount;