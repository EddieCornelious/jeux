import chainer from './chain.js';
import updateStateFromReducers from './updateStateFromReducers.js';
import isPlainObject from './isPlainObject.js';
import notifySubscribers from './notifySubscribers.js';

function createStore(reducers, ...middleware) {
  if (!isPlainObject(reducers)) {
    throw new TypeError('Expected reducers to be a plain object');
  }
  let state = {};
  const subscribers = [];
  const reducerKeys = Object.keys(reducers);

  updateStateFromReducers(state, reducers, reducerKeys, undefined);

  function getState() {
    return state;
  }

  let middlewareChain;

  function dispatch(action) {
    const chainResult = middlewareChain(action);

    if (chainResult === undefined) {
      return action;
    }

    const stateHasChanged = updateStateFromReducers(
      state,
      reducers,
      reducerKeys,
      action
    );

    if (stateHasChanged) {
      state = Object.assign({}, state);
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
  const middlewareInvokedWithArgs = middleware.map(middleware =>
    middleware(dispatch)(getState)
  );

  middlewareChain = chainer(action => action, middlewareInvokedWithArgs);
  return {
    getState,
    dispatch,
    subscribe
  };
}

export default createStore;
