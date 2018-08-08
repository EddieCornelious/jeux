const counterReducer = (state = 0, action) => {
  if (action.type === 'INC') {
    return state + 1;
  }
  return state;
};

const listReducer = (state = [], action) => {
  if (action.type === 'ADD_USER') {
    return [...state, action.user];
  }
  return state;
};

export {
  counterReducer,
  listReducer
};
