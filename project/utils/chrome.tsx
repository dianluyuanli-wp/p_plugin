//  chrome本地存储相关
export function getStorage(obj: Object) {
    return new Promise((res, rej) => {
        sendMessageToContentScript({
            method: 'getStorage',
            payLoad: obj,
        }, function(response: Object) {
            console.log(response, 'yyy')
            res(response);
        })
    })
}

export function setStorage(obj: Object) {
    return new Promise((res, rej) => {
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
