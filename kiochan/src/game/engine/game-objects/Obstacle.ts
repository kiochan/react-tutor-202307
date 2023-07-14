import type { GameObject } from "../GameObject";
import type { Character } from "./Character";

import { RandomNamedObject } from "./RandomNamedObject";

// 障碍物类
export class Obstacle extends RandomNamedObject {
  constructor() {
    super("🌲");
    this.setType("Obstacle");
  }

  update(): this {
    super.update();
    this.getGame()!
      .getGameObjects()
      .filter((gameObject) => gameObject.hasType("Character"))
      .filter((character) => character.isIntersectedWith(this as GameObject))
      .map((character) => character as Character)
      .forEach((character) => {
        character.dead().getGame()!.stop();
      });
    return this;
  }
}
