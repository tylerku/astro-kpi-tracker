"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/auth/google";
exports.ids = ["pages/api/auth/google"];
exports.modules = {

/***/ "googleapis":
/*!*****************************!*\
  !*** external "googleapis" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("googleapis");

/***/ }),

/***/ "(api)/./src/googleConfig.ts":
/*!*****************************!*\
  !*** ./src/googleConfig.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getGoogleAuth: () => (/* binding */ getGoogleAuth),\n/* harmony export */   getGoogleAuthUrl: () => (/* binding */ getGoogleAuthUrl),\n/* harmony export */   googleConfig: () => (/* binding */ googleConfig)\n/* harmony export */ });\n/* harmony import */ var googleapis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! googleapis */ \"googleapis\");\n/* harmony import */ var googleapis__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(googleapis__WEBPACK_IMPORTED_MODULE_0__);\n\nconst googleConfig = {\n    clientId: process.env.GOOGLE_CLIENT_ID || \"\",\n    clientSecret: process.env.GOOGLE_CLIENT_SECRET || \"\",\n    redirectUri: process.env.GOOGLE_OAUTH_CALLBACK_URI || \"\"\n};\nconst defaultScope = [\n    \"https://www.googleapis.com/auth/spreadsheets\"\n];\nconst getConnectionUrl = (auth)=>{\n    return auth.generateAuthUrl({\n        access_type: \"offline\",\n        prompt: \"consent\",\n        scope: defaultScope\n    });\n};\nconst getGoogleAuthUrl = ()=>{\n    const auth = getGoogleAuth();\n    return getConnectionUrl(auth);\n};\nconst getGoogleAuth = ()=>{\n    return new googleapis__WEBPACK_IMPORTED_MODULE_0__.google.auth.OAuth2(googleConfig.clientId, googleConfig.clientSecret, googleConfig.redirectUri);\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvZ29vZ2xlQ29uZmlnLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQTBDO0FBUTFDLE1BQU1DLGVBQTZCO0lBQ2pDQyxVQUFVQyxRQUFRQyxHQUFHLENBQUNDLGdCQUFnQixJQUFJO0lBQzFDQyxjQUFjSCxRQUFRQyxHQUFHLENBQUNHLG9CQUFvQixJQUFJO0lBQ2xEQyxhQUFhTCxRQUFRQyxHQUFHLENBQUNLLHlCQUF5QixJQUFJO0FBQ3hEO0FBRUEsTUFBTUMsZUFBZTtJQUNuQjtDQUNEO0FBRUQsTUFBTUMsbUJBQW1CLENBQUNDO0lBQ3hCLE9BQU9BLEtBQUtDLGVBQWUsQ0FBQztRQUMxQkMsYUFBYTtRQUNiQyxRQUFRO1FBQ1JDLE9BQU9OO0lBQ1Q7QUFDRjtBQUVBLE1BQU1PLG1CQUFtQjtJQUN2QixNQUFNTCxPQUFPTTtJQUNiLE9BQU9QLGlCQUFpQkM7QUFDMUI7QUFFQSxNQUFNTSxnQkFBZ0I7SUFDcEIsT0FBTyxJQUFJbEIsOENBQU1BLENBQUNZLElBQUksQ0FBQ08sTUFBTSxDQUMzQmxCLGFBQWFDLFFBQVEsRUFDckJELGFBQWFLLFlBQVksRUFDekJMLGFBQWFPLFdBQVc7QUFFNUI7QUFFeUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hc3Ryby1rcGktdHJhY2tlci8uL3NyYy9nb29nbGVDb25maWcudHM/OGU2MiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnb29nbGUsIEF1dGggfSBmcm9tICdnb29nbGVhcGlzJztcblxuaW50ZXJmYWNlIEdvb2dsZUNvbmZpZyB7XG4gIGNsaWVudElkOiBzdHJpbmc7XG4gIGNsaWVudFNlY3JldDogc3RyaW5nO1xuICByZWRpcmVjdFVyaTogc3RyaW5nO1xufVxuXG5jb25zdCBnb29nbGVDb25maWc6IEdvb2dsZUNvbmZpZyA9IHtcbiAgY2xpZW50SWQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfSUQgfHwgJycsXG4gIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9TRUNSRVQgfHwgJycsXG4gIHJlZGlyZWN0VXJpOiBwcm9jZXNzLmVudi5HT09HTEVfT0FVVEhfQ0FMTEJBQ0tfVVJJIHx8ICcnLCAvLyBVcGRhdGUgd2l0aCB5b3VyIGNhbGxiYWNrIFVSTFxufTtcblxuY29uc3QgZGVmYXVsdFNjb3BlID0gW1xuICAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9zcHJlYWRzaGVldHMnLCAvLyBBZGQgYW55IGFkZGl0aW9uYWwgc2NvcGVzIHlvdSByZXF1aXJlXG5dO1xuXG5jb25zdCBnZXRDb25uZWN0aW9uVXJsID0gKGF1dGg6IEF1dGguT0F1dGgyQ2xpZW50KTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGF1dGguZ2VuZXJhdGVBdXRoVXJsKHtcbiAgICBhY2Nlc3NfdHlwZTogJ29mZmxpbmUnLFxuICAgIHByb21wdDogJ2NvbnNlbnQnLFxuICAgIHNjb3BlOiBkZWZhdWx0U2NvcGUsXG4gIH0pO1xufTtcblxuY29uc3QgZ2V0R29vZ2xlQXV0aFVybCA9ICgpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBhdXRoID0gZ2V0R29vZ2xlQXV0aCgpO1xuICByZXR1cm4gZ2V0Q29ubmVjdGlvblVybChhdXRoKTtcbn07XG5cbmNvbnN0IGdldEdvb2dsZUF1dGggPSAoKTogQXV0aC5PQXV0aDJDbGllbnQgPT4ge1xuICByZXR1cm4gbmV3IGdvb2dsZS5hdXRoLk9BdXRoMihcbiAgICBnb29nbGVDb25maWcuY2xpZW50SWQsXG4gICAgZ29vZ2xlQ29uZmlnLmNsaWVudFNlY3JldCxcbiAgICBnb29nbGVDb25maWcucmVkaXJlY3RVcmlcbiAgKTtcbn1cblxuZXhwb3J0IHsgZ2V0R29vZ2xlQXV0aFVybCwgZ2V0R29vZ2xlQXV0aCwgZ29vZ2xlQ29uZmlnIH07XG4iXSwibmFtZXMiOlsiZ29vZ2xlIiwiZ29vZ2xlQ29uZmlnIiwiY2xpZW50SWQiLCJwcm9jZXNzIiwiZW52IiwiR09PR0xFX0NMSUVOVF9JRCIsImNsaWVudFNlY3JldCIsIkdPT0dMRV9DTElFTlRfU0VDUkVUIiwicmVkaXJlY3RVcmkiLCJHT09HTEVfT0FVVEhfQ0FMTEJBQ0tfVVJJIiwiZGVmYXVsdFNjb3BlIiwiZ2V0Q29ubmVjdGlvblVybCIsImF1dGgiLCJnZW5lcmF0ZUF1dGhVcmwiLCJhY2Nlc3NfdHlwZSIsInByb21wdCIsInNjb3BlIiwiZ2V0R29vZ2xlQXV0aFVybCIsImdldEdvb2dsZUF1dGgiLCJPQXV0aDIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/googleConfig.ts\n");

/***/ }),

/***/ "(api)/./src/pages/api/auth/google.ts":
/*!**************************************!*\
  !*** ./src/pages/api/auth/google.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _googleConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../googleConfig */ \"(api)/./src/googleConfig.ts\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((req, res)=>{\n    const authUrl = (0,_googleConfig__WEBPACK_IMPORTED_MODULE_0__.getGoogleAuthUrl)();\n    res.redirect(authUrl);\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2F1dGgvZ29vZ2xlLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQ3lEO0FBRXpELGlFQUFlLENBQUNDLEtBQXFCQztJQUNuQyxNQUFNQyxVQUFrQkgsK0RBQWdCQTtJQUN4Q0UsSUFBSUUsUUFBUSxDQUFDRDtBQUNmLEdBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hc3Ryby1rcGktdHJhY2tlci8uL3NyYy9wYWdlcy9hcGkvYXV0aC9nb29nbGUudHM/NDA2NyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSAnbmV4dCc7XG5pbXBvcnQgeyBnZXRHb29nbGVBdXRoVXJsIH0gZnJvbSAnLi4vLi4vLi4vZ29vZ2xlQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgKHJlcTogTmV4dEFwaVJlcXVlc3QsIHJlczogTmV4dEFwaVJlc3BvbnNlKTogdm9pZCA9PiB7XG4gIGNvbnN0IGF1dGhVcmw6IHN0cmluZyA9IGdldEdvb2dsZUF1dGhVcmwoKTtcbiAgcmVzLnJlZGlyZWN0KGF1dGhVcmwpO1xufTsiXSwibmFtZXMiOlsiZ2V0R29vZ2xlQXV0aFVybCIsInJlcSIsInJlcyIsImF1dGhVcmwiLCJyZWRpcmVjdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/auth/google.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/auth/google.ts"));
module.exports = __webpack_exports__;

})();