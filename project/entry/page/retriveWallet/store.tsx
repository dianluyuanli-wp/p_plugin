/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-17 17:24:57 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-20 09:35:49
 */

import { observable, runInAction, action, makeAutoObservable } from 'mobx';

export interface retrieveStoreType {
    name: string;
    secret: string;
    checkAgreement: boolean;
    mnemonicWords: string;
    mnemonicErrMsg: string;
    buttonActive: boolean;
}

class RetrieveStore {
    constructor() {
        makeAutoObservable(this);
    }
    //  用户名
    @observable name: string = '';
    //  注册输入密码
    @observable secret: string = '';
    //  用户协议是否选中
    @observable checkAgreement: boolean = false;
    //  输入助记词
    @observable mnemonicWords: string = '';
    //  助记词错误
    @observable mnemonicErrMsg: string = '';
    //  keyStore json内容
    @observable keyStoreJsonStr: string = '';
    //  keyStore errMsg
    @observable keyStoreErrMsg: string = '';
    //  是否可以创建
    @observable buttonActive: boolean = false;

    //  重置store,方便下次创建
    @action.bound
    resetStore() {
        this.name = '';
        this.secret = '';
        this.checkAgreement = false;
    }
}

export default new RetrieveStore();