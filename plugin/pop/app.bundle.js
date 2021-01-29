/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "C:\\Users\\xiaohuli\\Desktop\\code\\blockChain\\webPlugin\\plugin\\pop";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./project/entry/index.tsx":
/*!*********************************!*\
  !*** ./project/entry/index.tsx ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _page_home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page/home */ \"./project/entry/page/home/index.tsx\");\n/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @utils/i18n */ \"./project/utils/i18n.tsx\");\n/* harmony import */ var _page_createAccount__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./page/createAccount */ \"./project/entry/page/createAccount/index.tsx\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/*\r\n * @Author: guanlanluditie\r\n * @Date: 2021-01-28 00:13:03\r\n * @Last Modified by:   guanlanluditie\r\n * @Last Modified time: 2021-01-28 00:13:03\r\n */\r\n\r\n\r\n\r\n\r\n\r\n\r\n//  挂载组件\r\nconst mountNode = document.getElementById('app');\r\n//  原始前端渲染 在html的节点上挂载组件\r\nreact_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render((react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__[\"BrowserRouter\"], null,\r\n    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__[\"Switch\"], null,\r\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__[\"Route\"], { exact: true, path: '/createAccount', component: _page_createAccount__WEBPACK_IMPORTED_MODULE_4__[\"default\"] }),\r\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__[\"Route\"], { path: '', exact: true, component: _page_home__WEBPACK_IMPORTED_MODULE_2__[\"default\"] })))), mountNode);\r\n\n\n//# sourceURL=webpack:///./project/entry/index.tsx?");

/***/ }),

/***/ "./project/entry/page/createAccount/index.css":
/*!****************************************************!*\
  !*** ./project/entry/page/createAccount/index.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\nmodule.exports = {\"wrap\":\"_3Rc0PLx6l6UhYJdBMC2iVI\",\"formTitle\":\"_3HCFR8cKWapqVN3RJSttHW\"};\n\n//# sourceURL=webpack:///./project/entry/page/createAccount/index.css?");

/***/ }),

/***/ "./project/entry/page/createAccount/index.tsx":
/*!****************************************************!*\
  !*** ./project/entry/page/createAccount/index.tsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.css */ \"./project/entry/page/createAccount/index.css\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _widgets_headBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @widgets/headBar */ \"./project/entry/widgets/headBar/index.tsx\");\n/* harmony import */ var antd_lib_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd/lib/input */ \"./node_modules/antd/lib/input/index.js\");\n/* harmony import */ var antd_lib_input__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd_lib_input__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var antd_lib_input_style_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd/lib/input/style/index.js */ \"./node_modules/antd/lib/input/style/index.js\");\n/* harmony import */ var antd_lib_input_style_index_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd_lib_input_style_index_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var antd_lib_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! antd/lib/form */ \"./node_modules/antd/lib/form/index.js\");\n/* harmony import */ var antd_lib_form__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(antd_lib_form__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var antd_lib_form_style_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! antd/lib/form/style/index.js */ \"./node_modules/antd/lib/form/style/index.js\");\n/* harmony import */ var antd_lib_form_style_index_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(antd_lib_form_style_index_js__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var antd_lib_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! antd/lib/button */ \"./node_modules/antd/lib/button/index.js\");\n/* harmony import */ var antd_lib_button__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(antd_lib_button__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var antd_lib_button_style_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! antd/lib/button/style/index.js */ \"./node_modules/antd/lib/button/style/index.js\");\n/* harmony import */ var antd_lib_button_style_index_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(antd_lib_button_style_index_js__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-i18next */ \"./node_modules/react-i18next/dist/es/index.js\");\n/*\r\n * @Author: guanlanluditie\r\n * @Date: 2021-01-27 00:17:53\r\n * @Last Modified by: guanlanluditie\r\n * @Last Modified time: 2021-01-28 00:46:05\r\n */\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst CreactAccount = function () {\r\n    let { t } = Object(react_i18next__WEBPACK_IMPORTED_MODULE_9__[\"useTranslation\"])();\r\n    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { className: _index_css__WEBPACK_IMPORTED_MODULE_1___default.a.wrap },\r\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_widgets_headBar__WEBPACK_IMPORTED_MODULE_2__[\"default\"], { word: t('createAccount:create wallet') }),\r\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { className: _index_css__WEBPACK_IMPORTED_MODULE_1___default.a.formTitle }, \"\\u94B1\\u5305\\u540D\\u79F0\"),\r\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd_lib_form__WEBPACK_IMPORTED_MODULE_5___default.a.Item, null,\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd_lib_input__WEBPACK_IMPORTED_MODULE_3___default.a, null))));\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (CreactAccount);\r\n\n\n//# sourceURL=webpack:///./project/entry/page/createAccount/index.tsx?");

/***/ }),

/***/ "./project/entry/page/home/index.css":
/*!*******************************************!*\
  !*** ./project/entry/page/home/index.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\nmodule.exports = {\"color\":\"_1fPCmGOu9-zkqX8RvZF9IU\",\"loggo\":\"xyoUeVRvHzzQzkJqqkH9V\",\"word\":\"_3bAKaMjHa8wzB5BJLy6bf3\",\"btn\":\"_2zl8DozO9XT4VeZFfPkD_q\",\"create\":\"_1SZT_CEV5E-hHfmn9la3wM\",\"importIcon\":\"_1iki6v1i7D2F-sMsc-4W7t\",\"wrap\":\"_3_Y4spT0RdW3pwAy8trc2n\"};\n\n//# sourceURL=webpack:///./project/entry/page/home/index.css?");

/***/ }),

/***/ "./project/entry/page/home/index.tsx":
/*!*******************************************!*\
  !*** ./project/entry/page/home/index.tsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ \"./node_modules/react-i18next/dist/es/index.js\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.css */ \"./project/entry/page/home/index.css\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);\n/*\r\n * @Author: guanlanluditie\r\n * @Date: 2021-01-22 22:36:26\r\n * @Last Modified by: guanlanluditie\r\n * @Last Modified time: 2021-01-28 00:45:02\r\n */\r\n\r\n\r\n\r\n\r\n\r\nconst HomePage = function () {\r\n    const history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"useHistory\"])();\r\n    let { t, i18n } = Object(react_i18next__WEBPACK_IMPORTED_MODULE_2__[\"useTranslation\"])();\r\n    function jump() {\r\n        history.push('/createAccount');\r\n    }\r\n    function changeLanguage() {\r\n        i18n.changeLanguage(i18n.language == 'en' ? 'zh' : 'en');\r\n    }\r\n    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null,\r\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { className: _index_css__WEBPACK_IMPORTED_MODULE_3___default.a.wrap },\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { className: _index_css__WEBPACK_IMPORTED_MODULE_3___default.a.loggo, onClick: changeLanguage })),\r\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { className: _index_css__WEBPACK_IMPORTED_MODULE_3___default.a.word }, t('home:kitter is a polkadot wallet')),\r\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { className: _index_css__WEBPACK_IMPORTED_MODULE_3___default.a.word }, t('home:welcome to use')),\r\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(_index_css__WEBPACK_IMPORTED_MODULE_3___default.a.btn, _index_css__WEBPACK_IMPORTED_MODULE_3___default.a.create), onClick: jump }, t('home:create wallet')),\r\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(_index_css__WEBPACK_IMPORTED_MODULE_3___default.a.btn, _index_css__WEBPACK_IMPORTED_MODULE_3___default.a.importIcon) }, t('home:import wallet'))));\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (HomePage);\r\n\n\n//# sourceURL=webpack:///./project/entry/page/home/index.tsx?");

/***/ }),

/***/ "./project/entry/widgets/headBar/index.css":
/*!*************************************************!*\
  !*** ./project/entry/widgets/headBar/index.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\nmodule.exports = {\"content\":\"MnmeyyYcLlVgTE5DYBYYt\",\"backArrow\":\"_1ngRgSLHGt2SW4VjfCoV7x\"};\n\n//# sourceURL=webpack:///./project/entry/widgets/headBar/index.css?");

/***/ }),

/***/ "./project/entry/widgets/headBar/index.tsx":
/*!*************************************************!*\
  !*** ./project/entry/widgets/headBar/index.tsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.css */ \"./project/entry/widgets/headBar/index.css\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/*\r\n * @Author: guanlanluditie\r\n * @Date: 2021-01-27 00:18:06\r\n * @Last Modified by: guanlanluditie\r\n * @Last Modified time: 2021-01-27 23:25:29\r\n */\r\n\r\n\r\n\r\nconst HeadBar = function (props) {\r\n    const history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"useHistory\"])();\r\n    function back() {\r\n        history.goBack();\r\n    }\r\n    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { className: _index_css__WEBPACK_IMPORTED_MODULE_1___default.a.content },\r\n        props.word,\r\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { className: _index_css__WEBPACK_IMPORTED_MODULE_1___default.a.backArrow, onClick: back })));\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (HeadBar);\r\n\n\n//# sourceURL=webpack:///./project/entry/widgets/headBar/index.tsx?");

/***/ }),

/***/ "./project/locales/createAccount/index.tsx":
/*!*************************************************!*\
  !*** ./project/locales/createAccount/index.tsx ***!
  \*************************************************/
/*! exports provided: createAEN, createACN */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createAEN\", function() { return createAEN; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createACN\", function() { return createACN; });\n/*\r\n * @Author: guanlanluditie\r\n * @Date: 2021-01-28 00:12:48\r\n * @Last Modified by:   guanlanluditie\r\n * @Last Modified time: 2021-01-28 00:12:48\r\n */\r\nconst createAEN = {\r\n    'create wallet': 'create wallet'\r\n};\r\nconst createACN = {\r\n    'create wallet': '创建钱包'\r\n};\r\n\n\n//# sourceURL=webpack:///./project/locales/createAccount/index.tsx?");

/***/ }),

/***/ "./project/locales/home/index.tsx":
/*!****************************************!*\
  !*** ./project/locales/home/index.tsx ***!
  \****************************************/
/*! exports provided: homeEn, homeCn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"homeEn\", function() { return homeEn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"homeCn\", function() { return homeCn; });\n/*\r\n * @Author: guanlanluditie\r\n * @Date: 2021-01-28 00:12:41\r\n * @Last Modified by:   guanlanluditie\r\n * @Last Modified time: 2021-01-28 00:12:41\r\n */\r\nconst homeEn = {\r\n    'kitter is a polkadot wallet': 'kitter is a polkadot wallet',\r\n    'welcome to use': 'welcome to use',\r\n    'create wallet': 'create wallet',\r\n    'import wallet': 'import wallet'\r\n};\r\nconst homeCn = {\r\n    'kitter is a polkadot wallet': 'Kiter是波卡网络的治理钱包',\r\n    'welcome to use': '欢迎使用',\r\n    'create wallet': '创建钱包',\r\n    'import wallet': '导入钱包'\r\n};\r\n\n\n//# sourceURL=webpack:///./project/locales/home/index.tsx?");

/***/ }),

/***/ "./project/utils/i18n.tsx":
/*!********************************!*\
  !*** ./project/utils/i18n.tsx ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! i18next */ \"./node_modules/i18next/dist/esm/i18next.js\");\n/* harmony import */ var _locales_home__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../locales/home */ \"./project/locales/home/index.tsx\");\n/* harmony import */ var _locales_createAccount__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../locales/createAccount */ \"./project/locales/createAccount/index.tsx\");\n/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-i18next */ \"./node_modules/react-i18next/dist/es/index.js\");\n/*\r\n * @Author: guanlanluditie\r\n * @Date: 2021-01-28 00:12:30\r\n * @Last Modified by:   guanlanluditie\r\n * @Last Modified time: 2021-01-28 00:12:30\r\n */\r\n//  import LanguageDetector from 'i18next-browser-languagedetector';\r\n\r\n\r\n\r\n\r\n//  i18n.use(LanguageDetector) //嗅探当前浏览器语言\r\ni18next__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(react_i18next__WEBPACK_IMPORTED_MODULE_3__[\"initReactI18next\"]) //init i18next\r\n    .init({\r\n    //引入资源文件\r\n    resources: {\r\n        en: {\r\n            home: _locales_home__WEBPACK_IMPORTED_MODULE_1__[\"homeEn\"],\r\n            createAccount: _locales_createAccount__WEBPACK_IMPORTED_MODULE_2__[\"createAEN\"]\r\n        },\r\n        zh: {\r\n            home: _locales_home__WEBPACK_IMPORTED_MODULE_1__[\"homeCn\"],\r\n            createAccount: _locales_createAccount__WEBPACK_IMPORTED_MODULE_2__[\"createACN\"]\r\n        },\r\n    },\r\n    //选择默认语言，选择内容为上述配置中的key，即en/zh\r\n    fallbackLng: \"en\",\r\n    debug: false,\r\n    interpolation: {\r\n        escapeValue: false,\r\n    },\r\n});\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (i18next__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\r\n\n\n//# sourceURL=webpack:///./project/utils/i18n.tsx?");

/***/ }),

/***/ 0:
/*!***************************************!*\
  !*** multi ./project/entry/index.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./project/entry/index.tsx */\"./project/entry/index.tsx\");\n\n\n//# sourceURL=webpack:///multi_./project/entry/index.tsx?");

/***/ })

/******/ });