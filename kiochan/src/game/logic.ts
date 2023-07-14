import type { Game, GameObject } from "./engine";
import { Food, Obstacle } from "./engine";

import * as gameobjects from "./gameobjects";

export const loop = (game: Game) => {
  const now = Date.now();

  if (now - game.getState("lastFoodSpownTime") > 1000) {
    new Food().addToGame(game.setState("lastFoodSpownTime", () => now)).spawn();
  }

  if (now - game.getState("lastObstacleSpownTime") > 5000) {
    new Obstacle()
      .addToGame(game.setState("lastObstacleSpownTime", () => now))
      .spawn();
  }
};

export const restart = (game: Game) => {
  game.setStateIfNotExist("lastFoodSpownTime", (state) => state.startTime);
  game.setStateIfNotExist("lastObstacleSpownTime", (state) => state.startTime);

  game.getGameObjects().forEach((gameObject) => {
    game.removeGameObject(gameObject);
  });

  Object.values(gameobjects as Record<string, GameObject>).forEach(
    (gameObject) => {
      game.addGameObject(gameObject);
    }
  );

  game.getGameObjects().forEach((gameObject) => {
    gameObject.spawn();
  });
};
