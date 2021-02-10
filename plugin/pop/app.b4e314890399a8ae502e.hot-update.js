webpackHotUpdate("app",{

/***/ "./project/entry/page/createAccount/mnemonic/index.tsx":
/*!*************************************************************!*\
  !*** ./project/entry/page/createAccount/mnemonic/index.tsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.css */ \"./project/entry/page/createAccount/mnemonic/index.css\");\n/* harmony import */ var antd_lib_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd/lib/input */ \"./node_modules/antd/lib/input/index.js\");\n/* harmony import */ var antd_lib_input__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd_lib_input__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var antd_lib_input_style_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd/lib/input/style/index.js */ \"./node_modules/antd/lib/input/style/index.js\");\n/* harmony import */ var antd_lib_input_style_index_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd_lib_input_style_index_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var antd_lib_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd/lib/form */ \"./node_modules/antd/lib/form/index.js\");\n/* harmony import */ var antd_lib_form__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd_lib_form__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var antd_lib_form_style_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! antd/lib/form/style/index.js */ \"./node_modules/antd/lib/form/style/index.js\");\n/* harmony import */ var antd_lib_form_style_index_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(antd_lib_form_style_index_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var antd_lib_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! antd/lib/button */ \"./node_modules/antd/lib/button/index.js\");\n/* harmony import */ var antd_lib_button__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(antd_lib_button__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var antd_lib_button_style_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! antd/lib/button/style/index.js */ \"./node_modules/antd/lib/button/style/index.js\");\n/* harmony import */ var antd_lib_button_style_index_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(antd_lib_button_style_index_js__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-i18next */ \"./node_modules/react-i18next/dist/es/index.js\");\n/* harmony import */ var _polkadot_util_crypto__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @polkadot/util-crypto */ \"./node_modules/@polkadot/util-crypto/index.js\");\n/* harmony import */ var _polkadot_util_crypto__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_polkadot_util_crypto__WEBPACK_IMPORTED_MODULE_9__);\n/*\r\n * @Author: guanlanluditie\r\n * @Date: 2021-02-08 11:23:37\r\n * @Last Modified by: guanlanluditie\r\n * @Last Modified time: 2021-02-10 12:00:43\r\n */\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n//      \"content_security_policy\": \"script-src 'self' 'unsafe-eval' https://baidu.com/; object-src 'self'\",\r\nlet mnemonic = '';\r\nconst CreactMnemonic = function () {\r\n    let { t } = Object(react_i18next__WEBPACK_IMPORTED_MODULE_8__[\"useTranslation\"])();\r\n    Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\r\n        function init() {\r\n            return __awaiter(this, void 0, void 0, function* () {\r\n                yield Object(_polkadot_util_crypto__WEBPACK_IMPORTED_MODULE_9__[\"cryptoWaitReady\"])();\r\n                mnemonic = Object(_polkadot_util_crypto__WEBPACK_IMPORTED_MODULE_9__[\"mnemonicGenerate\"])();\r\n                console.log(mnemonic, '111');\r\n            });\r\n        }\r\n        init();\r\n    }, []);\r\n    console.log(mnemonic, '222');\r\n    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { className: _index_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"].wrap },\r\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null,\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { className: _index_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"].title }, \"\\u5907\\u4EFD\\u52A9\\u8BB0\\u8BCD\"),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { className: _index_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"].info }, \"\\u8BF7\\u6309\\u4E66\\u5E8F\\u624B\\u52A8\\u6284\\u5199\\u4E0B\\u9762\\u52A9\\u8BB0\\u8BCD\\uFF0C\\u786E\\u4FDD\\u5907\\u4EFD\\u6B63\\u786E\"),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { className: _index_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"].info }, \"\\u00B7 \\u83B7\\u5F97\\u52A9\\u8BB0\\u8BCD\\u7B49\\u540C\\u4E8E\\u62E5\\u6709\\u94B1\\u5305\\u8D44\\u4EA7\\u6240\\u6709\\u6743\"),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { className: _index_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"].info }, \"\\u00B7 \\u4E0D\\u8981\\u622A\\u5C4F\\u6216\\u590D\\u5236\\uFF0C\\u5426\\u5219\\u53EF\\u80FD\\u4F1A\\u9020\\u6210\\u8D44\\u4EA7\\u635F\\u5931\"))));\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (CreactMnemonic);\r\n\n\n//# sourceURL=webpack:///./project/entry/page/createAccount/mnemonic/index.tsx?");

/***/ })

})