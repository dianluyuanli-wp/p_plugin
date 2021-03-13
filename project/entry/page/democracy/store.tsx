/*
 * @Author: guanlanluditie 
 * @Date: 2021-03-10 08:39:34 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-03-12 22:45:49
 */

import { observable, runInAction, action, makeAutoObservable } from 'mobx';
import { ApiPromise, WsProvider } from '@polkadot/api';
import type { DeriveReferendumExt } from '@polkadot/api-derive/types';
import keyring from '@polkadot/ui-keyring';
//  import { OFFICAL_END_POINT } from '@constants/url';

export interface CreateStoreType {
    referenda: DeriveReferendumExt;
    reScanDetial: Record<string, any>;
    action: 'support' | 'reject';
}

class Democry {
    constructor() {
        makeAutoObservable(this);
    }
    //  官方api的公投详情
    @observable referenda: DeriveReferendumExt;
    //  subscan的公投详情
    @observable reScanDetial: Record<string, any> = {};
    @observable action: 'support' | 'reject';

    //  重置store,方便下次创建
    // @action.bound
    // resetStore() {
    //     this.createStage = 0;
    //     this.inputSec = '';
    //     this.inputSecConfirm = '';
    //     this.accountName = '';
    // }
}

export default new Democry();