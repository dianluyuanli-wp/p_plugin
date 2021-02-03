/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-03 11:30:55 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-03 11:44:33
 */
import { observable, runInAction, action, makeAutoObservable } from 'mobx';
import { ApiPromise, WsProvider } from '@polkadot/api'
import keyring from '@polkadot/ui-keyring';
//  import { OFFICAL_END_POINT } from '@constants/url';

class CreateAccountStore {
    @observable createTag: string = 'false';
}

export default new CreateAccountStore();