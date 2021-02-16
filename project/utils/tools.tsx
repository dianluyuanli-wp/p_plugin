import { formatBalance } from '@polkadot/util';
import type BN from 'bn.js';

//  这玩意不知道怎么用，先手动拼一下吧
export function myFormatBalance(balance: number | string | BN | BigInt ) {
    return (parseFloat(formatBalance(balance, { withSi: false })) / 10).toFixed(5);
}

//  将地址处理成有好一点的形式xxx....xxx
export function addressFormat(address: string) {
    return address.slice(0, 4) + '....' + address.slice(address.length - 4);
}