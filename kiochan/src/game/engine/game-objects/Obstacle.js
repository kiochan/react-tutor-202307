import { RandomNamedObject } from "./RandomNamedObject.js";

// 障碍物类
export class Obstacle extends RandomNamedObject {
  constructor() {
    super();
    this.setType("Obstacle");
    this.setName("🌲");
  }

  update() {
    super.update();
    this.getGame()
      .getGameObjects()
      .filter((gameObject) => gameObject.hasType("Character"))
      .filter((character) => character.isIntersectedWith(this))
      .forEach((character) => {
        character.dead().getGame().stop();
      });
    return this;
  }
}
