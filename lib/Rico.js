(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Rico", [], factory);
	else if(typeof exports === 'object')
		exports["Rico"] = factory();
	else
		root["Rico"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/chain.js":
/*!**********************!*\
  !*** ./src/chain.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var chainer = function chainer(starter, mw) {
  var args = [starter].concat(_toConsumableArray(mw));
  var functions = [];

  for (var i = 0; i < args.length; i++) {
    functions[i] = args[i];
  }

  return function (action) {
    return functions.reduce(function (value, func) {
      if (value === undefined) {
        return function () {
          return undefined;
        }();
      }

      return func(value);
    }, action);
  };
};

exports["default"] = chainer;

/***/ }),

/***/ "./src/createStore.js":
/*!****************************!*\
  !*** ./src/createStore.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _chain = __webpack_require__(/*! ./chain.js */ "./src/chain.js");

var _chain2 = _interopRequireDefault(_chain);

var _updateStoreFromReducers = __webpack_require__(/*! ./updateStoreFromReducers.js */ "./src/updateStoreFromReducers.js");

var _updateStoreFromReducers2 = _interopRequireDefault(_updateStoreFromReducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function createStore(reducers) {
  var state, dispatch, getState, subscribe;
  var subscribers = [];

  for (var _len = arguments.length, middleware = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    middleware[_key - 1] = arguments[_key];
  }

  var middlewareChain = (0, _chain2["default"])(function (action) {
    return action;
  }, middleware.map(function (e) {
    return e(dispatch)(getState);
  }));
  var reducerKeys = Object.keys(reducers);
  state = (0, _updateStoreFromReducers2["default"])(undefined, reducers, reducerKeys, undefined);

  getState = function getState() {
    return state;
  };

  dispatch = function dispatch(action) {
    var chainResult = middlewareChain(action);

    if (chainResult === undefined) {
      return action;
    }

    var storeChanged = (0, _updateStoreFromReducers2["default"])(state, reducers, reducerKeys, action);

    if (storeChanged) {
      state = Object.assign({}, state);
    }

    subscribers ? subscribers.forEach(function (subscriber) {
      return subscriber(state);
    }) : null;
    return chainResult;
  };

  subscribe = function subscribe(listener) {
    subscribers.push(listener);
    return function () {
      subscribers.splice(subscribers.indexOf(listener, 1));
    };
  };

  return {
    getState: getState,
    dispatch: dispatch,
    subscribe: subscribe
  };
}

exports["default"] = createStore;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.createStore = undefined;

var _createStore = __webpack_require__(/*! ./createStore.js */ "./src/createStore.js");

var _createStore2 = _interopRequireDefault(_createStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.createStore = _createStore2["default"];

/***/ }),

/***/ "./src/updateStoreFromReducers.js":
/*!****************************************!*\
  !*** ./src/updateStoreFromReducers.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function updateStoreFromReducers() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var reducers = arguments[1];
  var reducerKeys = arguments[2];
  var action = arguments[3];
  var injectedAction = action || '$__DEFAULTACTION$__';
  var storeHasChanged = false;

  for (var i = 0; i < reducerKeys.length; i += 1) {
    var reducerKey = reducerKeys[i];
    var reducerFunc = reducers[reducerKey];

    if (typeof reducerFunc !== 'function') {
      throw new TypeError('Reducer keys must map to functions');
    }

    var knownResult = state[reducerKey];
    var reducerRes = reducerFunc(state[reducerKey], injectedAction);

    if (reducerRes === undefined) {
      throw new TypeError('Reducer initial state cannot be undefined, try using a default arguments');
    }

    if (knownResult !== reducerRes) {
      storeHasChanged = true;
    }

    state[reducerKey] = reducerRes;
  }

  return storeHasChanged;
}

exports["default"] = updateStoreFromReducers;

/***/ })

/******/ });
});
//# sourceMappingURL=Rico.js.map