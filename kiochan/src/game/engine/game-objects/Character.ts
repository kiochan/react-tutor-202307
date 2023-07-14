import { NamedObject } from "./NamedObject";

// 这个类用于表示角色
export class Character extends NamedObject {
  protected _speed: number = 5;

  // 这个函数用于初始化角色
  constructor(name: string) {
    super(name);
    this.setType("Character");
    this.setState("point", () => 0);
    this.setState("alive", () => false);
  }

  spawn(): this {
    super.spawn();
    this.setState("alive", () => true);
    this.setColor("#fff", "#000");
    return this;
  }

  update(): this {
    super.update();
    const { _speed: speed } = this;
    const game = this.getGame()!;
    const { w, h } = this.getSize();
    const keyMap = game!.getKeyMap();
    const { w: pw, h: ph } = game.getPlaygroundSize();
    const xMax = pw - w;
    const yMax = ph - h;

    let { x, y } = this.getPosition();
    x +=
      speed *
      (Number(Boolean(keyMap.ArrowRight)) - Number(Boolean(keyMap.ArrowLeft)));
    y +=
      speed *
      (Number(Boolean(keyMap.ArrowDown)) - Number(Boolean(keyMap.ArrowUp)));
    if (x < 0) x = 0;
    if (x > xMax) x = xMax;
    if (y < 0) y = 0;
    if (y > yMax) y = yMax;

    return this.moveTo(x, y);
  }

  grow(): this {
    this.setState("point", (state) => state.point + 1);
    this.setFontSize(this.getFontSize() + 1);
    return this;
  }

  dead(): this {
    this.setState("alive", () => false);
    this.setColor("#aaa", "#f00");
    return this;
  }
}
