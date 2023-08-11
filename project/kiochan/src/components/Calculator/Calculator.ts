export enum Operator {
  none,
  add,
  minus,
  multiply,
  divide,
  percent,
  negate,
  point,
  equal,
  clear,
}

export class Calculator {
  // 累加器
  protected acc: number = 0;
  // 当前值
  protected crt: number = 0;
  // 运算符
  protected opt: Operator = Operator.none;

  // 显示值变化回调
  protected displayChangeCallback: (value: string) => void = () => {};

  // 显示值
  protected _display: string = "0";

  protected set display(value: string) {
    this._display = value;
    this.displayChangeCallback(value);
  }
  protected get display() {
    return this._display;
  }

  constructor() {}

  protected calculate() {
    if (this.opt === Operator.none) {
      return;
    }

    if (this.opt === Operator.add) {
      this.acc = this.acc + this.crt;
    }
    if (this.opt === Operator.minus) {
      this.acc = this.acc - this.crt;
    }
    if (this.opt === Operator.multiply) {
      this.acc = this.acc * this.crt;
    }
    if (this.opt === Operator.divide) {
      this.acc = this.acc / this.crt;
    }

    return;
  }

  pushNumber(num: number) {
    if (this.opt !== Operator.none) {
      this.calculate();
      this.display = "0";
    }
    if (this.display === "0") {
      this.display = num.toString();
      return;
    }
    this.display = this.display + num.toString();

    this.crt = Number(this.display);
  }

  setOperator(opt: Operator) {
    if (
      [
        Operator.add,
        Operator.minus,
        Operator.multiply,
        Operator.divide,
      ].includes(opt)
    ) {
      this.opt = opt;
      this.acc = this.crt;
      return;
    }

    if (opt === Operator.percent) {
      this.crt = this.crt / 100;
      this.display = this.crt.toString();
      return;
    }

    if (opt === Operator.negate) {
      this.crt = -this.crt;
      this.display = this.crt.toString();
      return;
    }

    if (opt === Operator.point) {
      if (this.display.includes(".")) {
        return;
      }
      this.display = this.display + ".";
      return;
    }

    if (opt === Operator.equal) {
      this.calculate();
      this.display = this.acc.toString();
      this.opt = Operator.none;
      return;
    }

    if (opt === Operator.clear) {
      this.display = "0";
      this.acc = 0;
      this.crt = 0;
      this.opt = Operator.none;
      return;
    }
  }

  getDisplay() {
    return this.display;
  }

  onDisplayChange(callback: (value: string) => void) {
    this.displayChangeCallback = callback;
  }
}
