import { GameObject } from "../GameObject";

export class NamedObject extends GameObject {
  constructor(name) {
    super();
    this.setType("NamedObject");
    this.setName(name);
    this.setFontSize(20);
  }

  setFontSize(size) {
    this._fontSize = size;
    this._el.style.fontSize = size + "px";
    return this;
  }

  getFontSize() {
    return this._fontSize;
  }

  createElement() {
    super.createElement();
    this.setColor();
    return this;
  }

  setColor(fg = "#fff", bg = "#000") {
    this._el.style.backgroundColor = bg;
    this._el.style.color = fg;
    return this;
  }

  setName(name) {
    this._name = name;
    this._el.innerText = this._name;
    return this;
  }

  getName() {
    return this._name;
  }
}
