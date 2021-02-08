/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-03 11:30:55 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-08 12:07:37
 */
import { observable, runInAction, action, makeAutoObservable } from 'mobx';
import { ApiPromise, WsProvider } from '@polkadot/api'
import keyring from '@polkadot/ui-keyring';
//  import { OFFICAL_END_POINT } from '@constants/url';

class CreateAccountStore {
    constructor() {
        makeAutoObservable(this);
    }
    //  用户名
    @observable accountName: string = '';
    //  注册输入密码
    @observable inputSec: string = '';
    //  密码确认
    @observable inputSecConfirm: string = '';
    //  注册阶段
    @observable createStage: number = 0;
}

export default new CreateAccountStore();