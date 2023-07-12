export class WithState {
  constructor() {
    this._state = {};
  }

  setState(name, setter) {
    this._state[name] = setter(this._state);
    return this;
  }

  setStateIfNotExist(name, setter) {
    this._state[name] ??= setter(this._state);
    return this;
  }

  getState(name) {
    return this._state[name];
  }
}
