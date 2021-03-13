/*
 * @Author: guanlanluditie 
 * @Date: 2021-03-12 23:35:58 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-03-12 23:37:16
 */

import { postReq } from '@utils/request';
import { SUBSCAN_DOMAIN } from '@constants/chain';

//  拉取用户信息
export function getAddInfo(address: string) {
    return postReq(`${SUBSCAN_DOMAIN}/api/v2/scan/search`, {
        key: address,
        page: 0,
        row: 1
    })
}

