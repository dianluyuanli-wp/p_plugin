export const OFFICAL_END_POINT = 'wss://rpc.polkadot.io';

export const SEED_LENGTHS = [12, 15, 18, 21, 24];

//  subscan的域名
export const SUBSCAN_DOMAIN = 'https://polkadot.subscan.io';

//  投票锁定与倍率
export const WEIGHT_ARR = [{
    text: '×0.1(不锁定)',
    ratio: 0.1
}, {
    text: '×1(需锁定28天)',
    ratio: 1
}, {
    text: '×2(需锁定56天)',
    ratio: 2
}, {
    text: '×3(需锁定112天)',
    ratio: 3
}, {
    text: '×4(需锁定224天)',
    ratio: 4
}, {
    text: '×5(需锁定448天)',
    ratio: 5
}, {
    text: '×6(需锁定896天)',
    ratio: 6
}]