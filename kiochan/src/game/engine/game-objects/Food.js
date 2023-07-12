import { RandomNamedObject } from "./RandomNamedObject.js";

export class Food extends RandomNamedObject {
  constructor() {
    super();
    this.setType("Food");
    this.setName("🍎");
  }

  update() {
    super.update();
    this.getGame()
      .getGameObjects()
      .filter((gameObject) => gameObject.hasType("Character"))
      .filter((gameObject) => gameObject.hasType("Character"))
      .filter((character) => character.isIntersectedWith(this))
      .forEach((character) => {
        character.grow().getGame().removeGameObject(this);
      });
    return this;
  }
}
