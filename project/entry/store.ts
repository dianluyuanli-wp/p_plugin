/*
 * @Author: guanlanluditie 
 * @Date: 2021-01-28 00:13:41 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-13 19:43:36
 */
import { observable, runInAction, action, makeAutoObservable, computed } from 'mobx';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { ADDRESS_ARRAY } from '@constants/chrome';
import keyring from '@polkadot/ui-keyring';
import { getStorage } from '@utils/chrome';
import { OFFICAL_END_POINT } from '@constants/chain';
import type BN from 'bn.js';

export interface globalStoreType {
    hasInit: boolean,
    api: ApiPromise,
    addressArr: Array<string>,
    favoriteAccount: string,
    accountObj: Record<string, Object>,
    balance: number | string | BN | BigInt,
    currentAccount: account
}

interface metaData {
    name: string,
    whenCreated: number
}
export interface account {
    address: string,
    meta: metaData
}

const mock = {
    '5EhmYogkqoyHiCDEfMWvQkEBcJjuaaZ4chW5K1z3TuioHTP7': {
        address: '5EhmYogkqoyHiCDEfMWvQkEBcJjuaaZ4chW5K1z3TuioHTP7',
        meta: {
            name: "wang",
            whenCreated: 1613125836858
        }
    }
}

const add = '5EhmYogkqoyHiCDEfMWvQkEBcJjuaaZ4chW5K1z3TuioHTP7';

class AppStore {
    @observable hasInit: boolean = false;
    @observable api: ApiPromise;
    //  地址列表
    @observable addressArr: Array<string> = [];
    //  当前地址
    @observable favoriteAccount: string = '';
    //  账号映射
    @observable accountObj: Record<string, Object> = {};
    //  当前账户余额
    @observable balance: number | string | BN | BigInt = 0;

    constructor() {
        makeAutoObservable(this)
    }

    @computed
    get currentAccount() {
        console.log(this, 'xxx');
        return this.accountObj[this.favoriteAccount] || {}
    }

    @action.bound
    async prepareAccount(): Promise<void> {
        // let a = await getStorage({ [ADDRESS_ARRAY]: []}) as any;
        // const accountsPro = a.accountAddress.map((item: any) => getStorage({ [item]: {}}));
        // const accountDeatil = await Promise.all(accountsPro);
        runInAction(() => {
            //  this.addressArr = a.accountAddress,
            this.favoriteAccount = add;
            this.accountObj = Object.assign.apply(null, [{}, mock])
        });
    }

    //  初始化api
    @action.bound
    async init(): Promise<void> {
        const provider = new WsProvider(OFFICAL_END_POINT);
        this.api = await ApiPromise.create({
            provider
        });
        //  keyring初始化
        keyring.loadAll({
            genesisHash: this.api.genesisHash as any,
            ss58Format: 0,
            store: undefined,
            type: 'ed25519'
        }, [])
        console.log('api init');
        runInAction(() => {
            this.hasInit = true;
        })
    }
}

export default new AppStore();
