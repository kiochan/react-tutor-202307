import { Game } from "./engine/index";

import * as logic from "./logic";

// 创建一个游戏
new Game({ w: 500, h: 500 })
  .init()
  .appendToDom(document.body)
  .prepareToStart(logic.restart)
  .setLogic(logic.loop)
  .start();
