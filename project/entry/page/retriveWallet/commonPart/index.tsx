/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-17 17:20:34 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-17 20:29:09
 */

import React, { FC } from 'react';
import s from './index.css';
import './index.antd.css';
import { useTranslation } from 'react-i18next';
import { Input } from 'antd';
import cx from 'classnames';
import { observer } from 'mobx-react';
import { changeInput } from '@utils/input';
import UserAgreement from '@widgets/userAgreement';
import type { retrieveStoreType } from '../store';
import { useStores } from '@utils/useStore';

const CommonPart:FC = function() {
    let { t } = useTranslation();
    const RetrieveStore = useStores('RetrieveStore') as retrieveStoreType;

    return (
        <>
            <div className={cx(s.title, s.topTitle)}>用户名</div>
            <Input
                value={RetrieveStore.name}
                onChange={(e) => changeInput(RetrieveStore, 'name', e)}
                className={cx(s.secInput, 'retrieveInput')} placeholder={'账户名称'}
            />
            <div className={cx(s.title, s.topTitle)}>密码</div>
            <Input.Password
                value={RetrieveStore.secret}
                onChange={(e) => changeInput(RetrieveStore, 'secret', e)}
                className={cx(s.secInput, 'retrieveInput')} placeholder={'钱包密码'}
            />
            <UserAgreement />
        </>
    )
}

export default observer(CommonPart);