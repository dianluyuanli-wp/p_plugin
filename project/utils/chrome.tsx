/*
 * @Author: guanlanluditie 
 * @Date: 2021-02-12 19:59:05 
 * @Last Modified by: guanlanluditie
 * @Last Modified time: 2021-02-23 11:36:53
 */

 // 获取本地存储
function getLocalStorage(obj: Object) {
    let ans = {} as Record<string, any>;
    for(let key in obj) {
        ans[key] = JSON.parse(localStorage.getItem(key));
    }
    return ans;
}

//  设置本地存储
function setLocalStorage(obj: Record<string, any>) {
    for(let key in obj) {
        localStorage.setItem(key, JSON.stringify(obj[key]));
    }
}

//  移除本地存储
function removeLocalStorage(keys: string | Array<string>) {
    const keyArray = typeof keys === 'string' ? [keys] : keys;
    keyArray.forEach(item => {
        localStorage.removeItem(item);
    })
}
//  chrome本地存储相关
//  manifeast里面的all_url对于白板无效，还是需要搞localstorage缓存
export function getStorage(obj: Object) {
    return new Promise((res, rej) => {
        sendMessageToContentScript({
            method: 'getStorage',
            payLoad: obj,
        }, function(response: Object) {
            console.log(response, 'yyy')
            //  没有的话取localstorage
            if (!response) {
                res(getLocalStorage(obj));
            }
            res(response);
        })
    })
}

export function setStorage(obj: Object) {
    return new Promise((res, rej) => {
        //  同步本地存储
        //  setLocalStorage(obj);
        sendMessageToContentScript({
            method: 'setStorage',
            payLoad: obj,
        }, function(response: Object) {
            res(response);
        })
    })
}

export function removeStorage(keys: string | string[]) {
    return new Promise((res, rej) => {
        //  同步本地存储
        removeLocalStorage(keys);
        sendMessageToContentScript({
            method: 'removeStorage',
            payLoad: keys,
        }, function(response: Object) {
            res(response);
        })
    })
}

export function sendMessageToContentScript(message: Object, callback: Function)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		chrome.tabs.sendMessage(tabs[0].id, message, function(response)
		{
			if(callback) callback(response);
		});
	});
}
