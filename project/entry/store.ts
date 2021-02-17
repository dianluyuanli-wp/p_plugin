/*
 * @Author: guanlanluditie 
 * @Date: 2021-01-28 00:13:41 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-16 19:55:33
 */
import { observable, runInAction, action, makeAutoObservable, computed } from 'mobx';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { ADDRESS_ARRAY } from '@constants/chrome';
import keyring from '@polkadot/ui-keyring';
import { getStorage } from '@utils/chrome';
import { OFFICAL_END_POINT } from '@constants/chain';
import type { KeyringPair$Json } from '@polkadot/keyring/types';
import type BN from 'bn.js';

export interface globalStoreType {
    hasInit: boolean,
    api: ApiPromise,
    addressArr: Array<string>,
    favoriteAccount: string,
    accountObj: Record<string, Object>,
    balance: number | string | BN | BigInt,
    currentAccount: KeyringPair$Json
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
        return this.accountObj[this.favoriteAccount] || {}
    }

    @action.bound
    async prepareAccount(): Promise<void> {
        // let ans = await getStorage({ [ADDRESS_ARRAY]: [], favoriteAccount: '' }) as any || {};
        // const queryAccObj = {} as Record<string, string>;
        // (ans.accountAddress || []).forEach((item: string) => {
        //     queryAccObj[item] = '';
        // })
        // const accountDeatil = await getStorage(queryAccObj) as any;
        // console.log(accountDeatil, 'deatil');
        // const firsetAcc = Object.keys(accountDeatil)[0];
        runInAction(() => {
            //  this.addressArr = a.accountAddress,
            // this.favoriteAccount = ans.favoriteAccount || firsetAcc;
            // this.accountObj = Object.assign.call(null, {}, accountDeatil)
            this.favoriteAccount = add;
            this.accountObj = Object.assign.apply(null, [{}, mock])
        });
    }

    //  初始化api
    @action.bound
    async init(): Promise<void> {
        //  keyring初始化
        keyring.loadAll({
            //  genesisHash: this.api.genesisHash as any,
            ss58Format: 0,
            store: undefined,
            type: 'ed25519'
        }, [])
        const provider = new WsProvider(OFFICAL_END_POINT);
        let initSuccess = true;
        this.api = await (ApiPromise.create({
            provider
        }).catch(e => {
            console.log(e);
            initSuccess = false;
            return {} as ApiPromise;
        }));

        console.log('api init');
        runInAction(() => {
            this.hasInit = initSuccess;
        })
    }
}

export default new AppStore();
