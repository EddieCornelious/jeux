import chainer from './chain.js';
import updateStoreFromReducers from './updateStoreFromReducers.js';

function createStore(reducers, ...middleware) {
  let state, dispatch, getState, subscribe;
  const subscribers = [];
  const middlewareChain = chainer((action) => action, middleware.map(e => e(dispatch)(getState)));
  const reducerKeys = Object.keys(reducers);

  state = updateStoreFromReducers(undefined, reducers, reducerKeys, undefined);

  getState = function getState() {
    return state;
  };

  dispatch = function dispatch(action) {
    let chainResult = middlewareChain(action);

    if (chainResult === undefined) {
      return action;
    }

    let storeChanged = updateStoreFromReducers(state, reducers, reducerKeys, action);

    if (storeChanged) {
      state = Object.assign({}, state);
    }
    subscribers ? subscribers.forEach(subscriber => subscriber(state)) : null;
    return chainResult;
  };

  subscribe = function subscribe(listener) {
    subscribers.push(listener);
    return () => {
      subscribers.splice(subscribers.indexOf(listener, 1));
    };
  };

  return {
    getState,
    dispatch,
    subscribe
  };

}

export default createStore;
