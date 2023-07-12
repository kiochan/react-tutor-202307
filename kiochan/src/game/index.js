import { Game, NamedObject, Character, Food, Obstacle } from "./engine";

// 创建一个游戏
new Game({ width: 500, height: 500 })
  .init()
  .appendToDom(document.body)
  // 为游戏添加逻辑
  .setLogic((game) => {
    const now = Date.now();

    if (now - game.getState("lastFoodSpownTime") > 1000) {
      new Food()
        .addToGame(game.setState("lastFoodSpownTime", () => now))
        .spown();
    }

    if (now - game.getState("lastObstacleSpownTime") > 5000) {
      new Obstacle()
        .addToGame(game.setState("lastObstacleSpownTime", () => now))
        .spown();
    }
  })
  // 准备开始
  .prepareToStart((game) => {
    game.setStateIfNotExist("lastFoodSpownTime", (state) => state.startTime);
    game.setStateIfNotExist(
      "lastObstacleSpownTime",
      (state) => state.startTime
    );

    // 将角色添加到游戏中
    game.getGameObjects().forEach((gameObject) => {
      game.removeGameObject(gameObject);
    });

    game
      // 角色
      .addGameObject(new Character("OwO"))
      // 得分板
      .addGameObject(
        new NamedObject().moveTo(0, 500).setLogic((o) => {
          const game = o.getGame();
          o.setName(
            game
              .getGameObjects()
              .filter((o) => o.hasType("Character"))
              .map((c) => c.getState("point"))
              .map((p) => `得分：${p}`)[0]
          );
        })
      )
      // 名字
      .addGameObject(
        new NamedObject().moveTo(150, 500).setLogic((o) => {
          const game = o.getGame();
          const dt = (Date.now() - game.getState("startTime")) / 1000;
          o.setName(`已存活时间 ${dt.toFixed(2)} 秒`);
        })
      )
      // 重新开始按钮
      .addGameObject(
        new NamedObject("重新开始").moveTo(400, 500).setLogic((o) => {
          const game = o.getGame();
          o.onClick(() => {
            game.start();
          });
        })
      )
      .getGameObjects()
      .forEach((gameObject) => {
        gameObject.spown();
      });
  })
  .start();
