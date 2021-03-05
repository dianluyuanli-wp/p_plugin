import { formatBalance, isHex } from '@polkadot/util';
import { SEED_LENGTHS } from '@constants/chain';
import type { KeyringPair$Json } from '@polkadot/keyring/types';
import keyring from '@polkadot/ui-keyring';
import { keyExtractSuri, mnemonicValidate } from '@polkadot/util-crypto';
import { ADDRESS_ARRAY } from '@constants/chrome';
import { getStorage, setStorage } from '@utils/chrome';
import { globalStoreType } from '@entry/store';
import type { CreateResult } from '@polkadot/ui-keyring/types';
import { runInAction } from 'mobx';
import globalStore from '@entry/store';
import type BN from 'bn.js';

export interface addressArrayObj {
    accountAddress: Array<string>
}

//  这玩意不知道怎么用，先手动拼一下吧
export function myFormatBalance(balance: number | string | BN | BigInt ) {
    return (parseFloat(formatBalance(balance, { withSi: false })) / 10).toFixed(5);
}

//  将地址处理成有好一点的形式xxx....xxx
export function addressFormat(address: string) {
    return address.slice(0, 4) + '....' + address.slice(address.length - 4);
}

//  校验助记词输入
export function validateMnemonicOrHexSeed(inputValue: string) {
    let result = {
        success: true,
        errMsg: ''
    };
    let parsedAns;
    try {
        parsedAns = keyExtractSuri(inputValue);
    } catch {
        result.success = false;
        result.errMsg = '错误的输入'
        return result
    }
    const { phrase } = parsedAns;

    if (isHex(phrase)) {
        if (!isHex(phrase, 256)) {
            result.success = false;
            result.errMsg = 'Hex seed needs to be 256-bits'
        }
    } else {
        //  判断助记词个数
        if (!SEED_LENGTHS.includes((phrase as string).split(' ').length)) {
            result.success = false;
            result.errMsg = `Mnemonic needs to contain ${SEED_LENGTHS.join(', ')} words`
        } else if (!mnemonicValidate(phrase)) {
            //  助记词校验
            result.success = false;
            result.errMsg = 'Not a valid mnemonic seed'
        }
    }
    return result;
}

//  校验keyStore输入
export function validateKeyStoreJsonStr(content: string) {
    let result = {
        success: true,
        errMsg: ''
    };
    let json: KeyringPair$Json;
    try {
        json = JSON.parse(content) as KeyringPair$Json;
        keyring.createFromJson(json);
    } catch {
        result.success = false;
        result.errMsg = '错误的输入';
        return;
    }
    return result;
}

//  添加新账号，同步store和chrome storage
export async function addNewAccount(result: CreateResult) {
    const { json } = result;
    const { address } = json
    const saveKey = json.address;
    let origin = await getStorage({ [ADDRESS_ARRAY]: [] }) as addressArrayObj;
    let newArray = origin[ADDRESS_ARRAY];
    //  本地存储的账号信息,看来不需要脱敏，因为polkadot.js直接放在localstorage里面
    const localSaveObj = json;
    newArray.push(saveKey);
    //  同步本地的store状态
    runInAction(() => {
        globalStore.addressArr = newArray,
        globalStore.favoriteAccount = globalStore.favoriteAccount || address;
        globalStore.accountObj = Object.assign({}, globalStore.accountObj, { [address]: localSaveObj })
    })
    //  修改chromeStorage
    await setStorage({
        [ADDRESS_ARRAY]: newArray,
        [address]: localSaveObj
    })
}

//  更新账号信息，内存和chrome存储都更新
export async function updateAccountInfo(result: CreateResult) {
    const { json } = result;
    const { address } = json
    //  同步本地的store状态
    runInAction(() => {
        globalStore.accountObj = Object.assign({}, globalStore.accountObj, { [address]: json })
    })
    //  修改chromeStorage
    await setStorage({
        [address]: json
    })
}

//  将canvas转换成dataUrl
export function canvasToDataURL(canvas: any){
	return canvas.toDataURL('image/png', 1.0);
}

//  将dataUrl转换成blob
export function dataURLToBlob(dataurl: string){
	var arr = dataurl.split(',');
	var mime = arr[0].match(/:(.*?);/)[1];
	var bstr = atob(arr[1]);
	var n = bstr.length;
	var u8arr = new Uint8Array(n);
	while(n--){
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], {type:mime});
}

//  将字符串转化成转账金额
export function dotStrToTransferAmount(amount: string) {
    return parseFloat(amount) * Math.pow(10, 10)
}
