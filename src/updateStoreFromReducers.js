
function updateStoreFromReducers(state = {}, reducers, reducerKeys, action) {
  const injectedAction = action || '$__DEFAULTACTION$__';

  for (let i = 0; i < reducerKeys.length; i += 1) {
    const reducerKey = reducerKeys[i];
    const reducerFunc = reducers[reducerKey];

    if (typeof reducerFunc !== 'function') {
      throw new TypeError('Reducer keys must map to functions');
    }
    const reducerRes = reducerFunc(state[reducerKey], injectedAction);

    if (reducerRes === undefined) {
      throw new TypeError('Reducer initial state cannot be undefined, try using a default arguments');
    }
    state[reducerKey] = reducerRes;
  }
  return state;
}

export default updateStoreFromReducers;
