import { NamedObject } from "./NamedObject";

// 这个类用于表示角色
export class Character extends NamedObject {
  // 这个函数用于初始化角色
  constructor(name) {
    super();
    this.setType("Character");
    this.setName(name);
    this._speed = 5;
    this.setState("point", () => 0);
    this.setState("alive", () => false);
  }

  spown() {
    super.spown();
    this.setState("alive", () => true);
    this.setColor("#fff", "#000");
    return this;
  }

  update() {
    super.update();
    const { _speed: speed } = this;
    const game = this.getGame();
    const { w, h } = this.getSize();
    const keyMap = game.getKeyMap();
    const { width, height } = game.getPlaygroundSize();
    const xMax = width - w;
    const yMax = height - h;

    let { x, y } = this.getPosition();
    x += speed * (+Boolean(keyMap.ArrowRight) - Boolean(keyMap.ArrowLeft));
    y += speed * (+Boolean(keyMap.ArrowDown) - Boolean(keyMap.ArrowUp));
    if (x < 0) x = 0;
    if (x > xMax) x = xMax;
    if (y < 0) y = 0;
    if (y > yMax) y = yMax;

    return this.moveTo(x, y);
  }

  grow() {
    this.setState("point", (state) => state.point + 1);
    this.setFontSize(this.getFontSize() + 1);
    return this;
  }

  dead() {
    this.setState("alive", () => false);
    this.setColor("#aaa", "#f00");
    return this;
  }
}
