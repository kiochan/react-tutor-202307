import { GameObject } from "../GameObject";

const DefaultName = "Unnamed";
const DefaultFontSize = 20;

export class NamedObject extends GameObject {
  protected _fontSize: number = DefaultFontSize;
  protected _name: string = DefaultName;

  constructor(name: string = DefaultName) {
    super();
    this.setType("NamedObject");
    this.setName(name);
    this.setFontSize(DefaultFontSize);
  }

  setFontSize(size: number): this {
    const el = this._el;
    this._fontSize = size;
    el.style.fontSize = String(size) + "px";
    return this;
  }

  getFontSize(): number {
    return this._fontSize;
  }

  createElement(): this {
    super.createElement();
    this.setColor();
    return this;
  }

  setColor(fg = "#fff", bg = "#000"): this {
    const el = this._el;
    el.style.backgroundColor = bg;
    el.style.color = fg;
    return this;
  }

  setName(name: string): this {
    this._name = name;
    this._el.innerText = this._name;
    return this;
  }

  getName(): string {
    return this._name;
  }
}
