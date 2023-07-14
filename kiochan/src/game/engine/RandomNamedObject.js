import { NamedObject } from "./NamedObject.js";

export class RandomNamedObject extends NamedObject {
  constructor(name) {
    super(name);
    this.setType("RandomNamedObject");
  }

  spawn() {
    super.spawn();
    const game = this.getGame();
    const { width, height } = game.getPlaygroundSize();
    const { w, h } = this.getSize();
    let i = 0;
    do {
      this.moveTo(Math.random() * (width - w), Math.random() * (height - h));
      i++;
    } while (
      i < 100 &&
      game
        .getGameObjects()
        .filter((o) => o !== this)
        .some((gameObject) => gameObject.isIntersectedWith(this))
    );
    if (i >= 100) this.delete();
    return this;
  }
}
