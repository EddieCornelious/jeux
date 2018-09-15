function updateStateFromReducers(state, reducers, reducerKeys, action) {
  const injectedAction = action || '$__DEFAULTACTION$__';
  let stateHasChanged = false;

  for (let i = 0; i < reducerKeys.length; i += 1) {
    const reducerKey = reducerKeys[i];
    const reducer = reducers[reducerKey];

    if (typeof reducer !== 'function') {
      throw new TypeError('Reducer keys must map to functions');
    }
    const previousState = state[reducerKey];
    const nextState = reducer(state[reducerKey], injectedAction);

    if (nextState === undefined) {
      throw new TypeError(
        'Reducer initial state cannot be undefined, try using a default arguments'
      );
    }

    if (previousState !== nextState) {
      stateHasChanged = true;
    }

    state[reducerKey] = nextState;
  }
  return stateHasChanged;
}

export default updateStateFromReducers;
