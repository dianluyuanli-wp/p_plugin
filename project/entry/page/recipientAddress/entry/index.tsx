/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-28 09:30:32 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-28 10:04:43
 */

import React, { FC } from 'react';
import s from './index.css';
import HeadBar from '@widgets/headBar';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';
import { useStores } from '@utils/useStore';
import { PAGE_NAME } from '@constants/app';
import { globalStoreType } from '@entry/store';

const Entry:FC = function() {
    let { t } = useTranslation();
    const globalStore = useStores('GlobalStore') as globalStoreType;
    const history = useHistory();

    function jump(path: string) {
        history.push(path);
    }

    return (
        <div className={s.wrap}>
            <HeadBar word={'转账地址'} showRightIcon rightIconCB={() => jump(PAGE_NAME.RECIPIENT_ADD_NEW)}/>
        </div>
    )
}

export default Entry;