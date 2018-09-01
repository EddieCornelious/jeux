import chainer from './chain.js';
import updateStoreFromReducers from './updateStoreFromReducers.js';
import isPlainObject from './isPlainObject.js';
import notifySubscribers from './notifySubscribers.js';

function createStore(reducers, ...middleware) {
  if (!isPlainObject(reducers)) {
    throw new TypeError('Expected reducers to be a plain object');
  }
  let state = {};
  const subscribers = [];
  const reducerKeys = Object.keys(reducers);

  updateStoreFromReducers(state, reducers, reducerKeys, undefined);

  function getState() {
    return state;
  }

  let middlewareChain;

  function dispatch(action) {
    let chainResult = middlewareChain(action);

    if (chainResult === undefined) {
      return action;
    }

    let storeChanged = updateStoreFromReducers(state, reducers, reducerKeys, action);

    if (storeChanged) {
      state = {...state};
      notifySubscribers(subscribers, state);
    }
    return chainResult;
  }

  function subscribe(listener) {
    subscribers.push(listener);
    return () => {
      subscribers.splice(subscribers.indexOf(listener, 1));
    };
  }
  const middlewareInvokedWithArgs = middleware.map(middleware => middleware(dispatch)(getState));

  middlewareChain = chainer(action => action, middlewareInvokedWithArgs);
  return {
    getState,
    dispatch,
    subscribe
  };

}

export default createStore;
