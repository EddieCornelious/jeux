const chainer = (starter, middleware) => {
  const args = [starter, ...middleware];
  const functions = [];

  for (let i = 0; i < args.length; i += 1) {
    functions[i] = args[i];
  }

  return action => {
    return functions.reduce((value, func) => {
      if (value === undefined) {
        return (() => undefined)();
      }
      return func(value);
    }, action);
  };
};

export default chainer;
