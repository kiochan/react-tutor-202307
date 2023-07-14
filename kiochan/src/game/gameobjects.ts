import { NamedObject, Character, GameObject } from "./engine";

export const character = new Character("OwO") as GameObject;

export const scoreBoard = new NamedObject().moveTo(0, 500).setLogic((o) => {
  const game = o.getGame();
  if (game === undefined) return;
  o.setName(
    game
      .getGameObjects()
      .filter((o) => o.hasType("Character"))
      .map((c) => c.getState("point"))
      .map((p) => `得分：${p}`)[0]
  );
});

export const liveTime = new NamedObject().moveTo(150, 500).setLogic((o) => {
  const game = o.getGame();
  if (game === undefined) return;
  const dt = (Date.now() - game.getState("startTime")) / 1000;
  o.setName(`已存活时间 ${dt.toFixed(2)} 秒`);
});

export const restartButton = new NamedObject("重新开始")
  .moveTo(400, 500)
  .setLogic((o) => {
    const game = o.getGame();
    if (game === undefined) return;
    o.onClick(() => {
      game.start();
    });
  });
