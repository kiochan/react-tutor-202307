import type { GameObject } from "../GameObject";
import type { Character } from "./Character";

import { RandomNamedObject } from "./RandomNamedObject";

export class Food extends RandomNamedObject {
  constructor() {
    super("🍎");
    this.setType("Food");
  }

  update(): this {
    super.update();
    this.getGame()
      ?.getGameObjects()
      .filter((gameObject: GameObject) => gameObject.hasType("Character"))
      .filter((gameObject) => gameObject.hasType("Character"))
      .map((gameObject) => gameObject as Character)
      .filter((character) => character.isIntersectedWith(this as GameObject))
      .forEach((character) => {
        character
          .grow()
          .getGame()!
          .removeGameObject(this as GameObject);
      });
    return this;
  }
}
