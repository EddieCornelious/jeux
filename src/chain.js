
const chainer = (starter, mw) => {
  const args = [starter, ...mw];
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
