/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-06 12:01:27 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-06 12:26:28
 */

// import React from 'react';
import { runInAction } from 'mobx';

export function changeInput(store: any, key: string, e: React.ChangeEvent<HTMLInputElement>) {
    runInAction(() => {
        store[key] = e.target.value;
    })
}

