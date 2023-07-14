export class WithState {
  protected _state: Record<string, any>;

  constructor() {
    this._state = {};
  }

  setState(name: string, setter: (state: Record<string, any>) => any): this {
    this._state[name] = setter(this._state);
    return this;
  }

  setStateIfNotExist(
    name: string,
    setter: (state: Record<string, any>) => any
  ): this {
    this._state[name] ??= setter(this._state);
    return this;
  }

  getState(name: string): any {
    return this._state[name];
  }
}
