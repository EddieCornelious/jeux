export default class Cat {
  constructor() {
    this._name = 'Cat';
  }
  name() {
    const name = this._name;

    if (!name) {
      return 1;
    }

    return name;
  }
}
