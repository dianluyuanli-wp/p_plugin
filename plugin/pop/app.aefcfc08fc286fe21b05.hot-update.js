webpackHotUpdate("app",{

/***/ "./project/entry/store.ts":
/*!********************************!*\
  !*** ./project/entry/store.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mobx */ \"./node_modules/mobx/dist/mobx.esm.js\");\n/* harmony import */ var _polkadot_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @polkadot/api */ \"./node_modules/@polkadot/api/index.js\");\n/* harmony import */ var _polkadot_api__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_polkadot_api__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _constants_chrome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @constants/chrome */ \"./project/constants/chrome.tsx\");\n/* harmony import */ var _polkadot_ui_keyring__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @polkadot/ui-keyring */ \"./node_modules/@polkadot/ui-keyring/index.js\");\n/* harmony import */ var _polkadot_ui_keyring__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_polkadot_ui_keyring__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _utils_chrome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @utils/chrome */ \"./project/utils/chrome.tsx\");\n/* harmony import */ var _constants_chain__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @constants/chain */ \"./project/constants/chain.tsx\");\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n/*\r\n * @Author: guanlanluditie\r\n * @Date: 2021-01-28 00:13:41\r\n * @Last Modified by: guanlanluditie\r\n * @Last Modified time: 2021-02-16 19:55:33\r\n */\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst mock = {\r\n    '5EhmYogkqoyHiCDEfMWvQkEBcJjuaaZ4chW5K1z3TuioHTP7': {\r\n        address: '5EhmYogkqoyHiCDEfMWvQkEBcJjuaaZ4chW5K1z3TuioHTP7',\r\n        meta: {\r\n            name: \"wang\",\r\n            whenCreated: 1613125836858\r\n        }\r\n    }\r\n};\r\nconst add = '5EhmYogkqoyHiCDEfMWvQkEBcJjuaaZ4chW5K1z3TuioHTP7';\r\nclass AppStore {\r\n    constructor() {\r\n        this.hasInit = false;\r\n        //  地址列表\r\n        this.addressArr = [];\r\n        //  当前地址\r\n        this.favoriteAccount = '';\r\n        //  账号映射\r\n        this.accountObj = {};\r\n        //  当前账户余额\r\n        this.balance = 0;\r\n        Object(mobx__WEBPACK_IMPORTED_MODULE_0__[\"makeAutoObservable\"])(this);\r\n    }\r\n    get currentAccount() {\r\n        return this.accountObj[this.favoriteAccount] || {};\r\n    }\r\n    prepareAccount() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            let ans = (yield Object(_utils_chrome__WEBPACK_IMPORTED_MODULE_4__[\"getStorage\"])({ [_constants_chrome__WEBPACK_IMPORTED_MODULE_2__[\"ADDRESS_ARRAY\"]]: [], [_constants_chrome__WEBPACK_IMPORTED_MODULE_2__[\"FAVORITE_ACCOUNT\"]]: '' })) || {};\r\n            const queryAccObj = {};\r\n            (ans.accountAddress || []).forEach((item) => {\r\n                queryAccObj[item] = '';\r\n            });\r\n            const accountDeatil = yield Object(_utils_chrome__WEBPACK_IMPORTED_MODULE_4__[\"getStorage\"])(queryAccObj);\r\n            const firsetAcc = Object.keys(accountDeatil)[0];\r\n            Object(mobx__WEBPACK_IMPORTED_MODULE_0__[\"runInAction\"])(() => {\r\n                this.addressArr = ans.accountAddress,\r\n                    this.favoriteAccount = ans.favoriteAccount || firsetAcc;\r\n                this.accountObj = Object.assign.call(null, {}, accountDeatil);\r\n                // this.favoriteAccount = add;\r\n                // this.accountObj = Object.assign.apply(null, [{}, mock])\r\n            });\r\n        });\r\n    }\r\n    //  初始化api\r\n    init() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            //  keyring初始化\r\n            _polkadot_ui_keyring__WEBPACK_IMPORTED_MODULE_3___default.a.loadAll({\r\n                //  genesisHash: this.api.genesisHash as any,\r\n                ss58Format: 0,\r\n                store: undefined,\r\n                type: 'ed25519'\r\n            }, []);\r\n            const provider = new _polkadot_api__WEBPACK_IMPORTED_MODULE_1__[\"WsProvider\"](_constants_chain__WEBPACK_IMPORTED_MODULE_5__[\"OFFICAL_END_POINT\"]);\r\n            let initSuccess = true;\r\n            this.api = yield (_polkadot_api__WEBPACK_IMPORTED_MODULE_1__[\"ApiPromise\"].create({\r\n                provider\r\n            }).catch(e => {\r\n                console.log(e);\r\n                initSuccess = false;\r\n                return {};\r\n            }));\r\n            console.log('api init');\r\n            Object(mobx__WEBPACK_IMPORTED_MODULE_0__[\"runInAction\"])(() => {\r\n                this.hasInit = initSuccess;\r\n            });\r\n        });\r\n    }\r\n}\r\n__decorate([\r\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"observable\"]\r\n], AppStore.prototype, \"hasInit\", void 0);\r\n__decorate([\r\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"observable\"]\r\n], AppStore.prototype, \"api\", void 0);\r\n__decorate([\r\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"observable\"]\r\n], AppStore.prototype, \"addressArr\", void 0);\r\n__decorate([\r\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"observable\"]\r\n], AppStore.prototype, \"favoriteAccount\", void 0);\r\n__decorate([\r\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"observable\"]\r\n], AppStore.prototype, \"accountObj\", void 0);\r\n__decorate([\r\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"observable\"]\r\n], AppStore.prototype, \"balance\", void 0);\r\n__decorate([\r\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"computed\"]\r\n], AppStore.prototype, \"currentAccount\", null);\r\n__decorate([\r\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"action\"].bound\r\n], AppStore.prototype, \"prepareAccount\", null);\r\n__decorate([\r\n    mobx__WEBPACK_IMPORTED_MODULE_0__[\"action\"].bound\r\n], AppStore.prototype, \"init\", null);\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (new AppStore());\r\n\n\n//# sourceURL=webpack:///./project/entry/store.ts?");

/***/ })

})