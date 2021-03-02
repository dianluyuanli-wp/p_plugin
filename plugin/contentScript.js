const actionMap = {
    setStorage: function(input, sendRes) {
        return new Promise((res, rej) => {
            chrome.storage.sync.set(input, function() {
                console.log('set success');
                Init();
                res(void 0);
            });
        })
    },
    getStorage: function(input, sendRes) {
        return new Promise((res, rej) => {
            chrome.storage.sync.get(input, function(ans) {
                console.log(ans, 'get success');
                res(ans);
            });
        })
    },
    removeStorage: function(input) {
        return new Promise((res, rej) => {
            chrome.storage.sync.remove(input, function() {
                res();
            });
        })
    }
}

let chromeStorage = {};
async function Init() {
    const dataObj = await actionMap.getStorage({
        accountAddress: [],
        favoriteAccount: '',
        recipientArr: [],
        local_config: {
            language: 'english',
            autoLockTime: 0,
            lastInSTM: 0
        }
    });
    const { accountAddress } = dataObj;
    let queryObj = {};
    accountAddress.forEach(item => {
        queryObj[item] = {};
    })
    let ansObj = await actionMap.getStorage(queryObj);
    chromeStorage = Object.assign({}, ansObj, dataObj);
    console.log(chromeStorage, 'hahah')
}
Init();

//  这个api貌似对异步支持的不好，await之后sendResponse直接返回undefined，
chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse)
{
	// console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
	// if(request.cmd == 'test') alert(request.value);
    const { method, payLoad } = request || {};
    let ans = {};
    if (method === 'getStorage') {
        for(let key in payLoad) {
            if(payLoad.hasOwnProperty(key)) {
                ans[key] = chromeStorage[key];
            }
        }
        sendResponse(ans);
    } else {
        actionMap[method](payLoad);
    }
});