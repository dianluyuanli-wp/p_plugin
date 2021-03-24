/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-07 11:50:33 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-03-24 20:46:44
 */

import React, { FC } from 'react';
import s from './index.css';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import cx from 'classnames';

const Authorize:FC = function() {
    let { t } = useTranslation();
    //  国际化的包裹函数
    const lanWrap = (input: string) => t(`userAgreement:${input}`);

    return (
        <div className={s.wrap}>
            我来了
        </div>
    )
}

export default observer(Authorize);