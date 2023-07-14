import { GameObject } from "../GameObject";
import { NamedObject } from "./NamedObject";

export class RandomNamedObject extends NamedObject {
  constructor(name: string) {
    super(name);
    this.setType("RandomNamedObject");
  }

  spawn(): this {
    super.spawn();
    const game = this.getGame()!;
    const { w: width, h: height } = game.getPlaygroundSize();
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
        .some((gameObject: GameObject) =>
          gameObject.isIntersectedWith(this as GameObject)
        )
    );

    if (i >= 100) this.delete();
    return this;
  }
}
