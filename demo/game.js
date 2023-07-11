class WithState {
  constructor() {
    this.state = {}
  }

  setState(name, setter) {
    this.state[name] = setter(this.state);
    return this;
  };

  setStateIfNotExist(name, setter) {
    this.state[name] ??= setter(this.state);
    return this;
  }

  getState(name) {
    return this.state[name];
  }
}

// 这个用于存储游戏中的角色
class GameObject extends WithState {
  // 这个函数用于初始化游戏对象
  constructor() {
    super();
    this.__type__ = [];
    this.x = 0;
    this.y = 0;
    this.setType("GameObject")
    this.createElement();
  }

  // 添加进游戏
  addToGame(game) {
    game.addGameObject(this)
    return this;
  }

  getGame() {
    return this.game;
  }

  delete() {
    this.disspown()
    this.removeGameObject(this)
    return this;
  }

  // 设置游戏对象类型
  setType(type) {
    this.__type__.push(type);
    return this;
  }

  // 检查类型是不是存在
  hasType(type) {
    return this.__type__.includes(type);
  }

  // 这个函数用于创建游戏对象的元素
  createElement() {
    this.el = document.createElement("span");
    this.el.style.position = "absolute";
    this.el.style.left = this.x + "px";
    this.el.style.top = this.y + "px";
    return this;
  }

  // 这个函数用于设置游戏对象的根元素
  setGame(game) {
    this.game = game;
    return this;
  }

  // 这个函数用于将游戏对象添加到游戏中
  spown() {
    this.getGame().getDom().appendChild(this.el);
    return this;
  }

  // 这个函数用于将游戏对象从游戏中移除
  disspown() {
    const game = this.getGame();
    if (game === undefined) return this;
    const root = game.getDom();
    if (root === undefined) return this;
    if (root.contains(this.el)) {
      root.removeChild(this.el);
    }
    return this;
  }

  // 这个函数用于获取游戏对象的位置
  getPosition() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  // 这个函数用于设置游戏对象的位置
  moveTo(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  // 这个函数用于设置游戏对象的逻辑
  setLogic(logicFc) {
    this.logic = logicFc;
    return this;
  }

  // 这个函数用于更新游戏对象的状态
  update() {
    if (typeof this.logic === "function") {
      this.logic(this);
    }
    return this;
  }

  getSize() {
    return {
      w: this.el.clientWidth,
      h: this.el.clientHeight,
    };
  }

  // 这个函数用于更新游戏对象的状态
  render() {
    this.el.style.left = this.x + "px";
    this.el.style.top = this.y + "px";
    return this;
  }

  // 判断相交
  isIntersectedWith(gameObject) {
    const { x: x1, y: y1 } = this.getPosition();
    const { x: x2, y: y2 } = gameObject.getPosition();
    const { w: w1, h: h1 } = this.getSize();
    const { w: w2, h: h2 } = gameObject.getSize();
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
  }

  onClick(cb) {
    this.el.addEventListener("click", cb)
    return this
  }

  offClick(cb) {
    this.el.removeEventListener("click", cb)
    return this
  }
}

class NamedObject extends GameObject {
  constructor(name) {
    super();
    this.setType("NamedObject");
    this.setName(name);
    this.setFontSize(20);
  }

  setFontSize(size) {
    this.fontSize = size;
    this.el.style.fontSize = size + "px";
    return this;
  }

  getFontSize() {
    return this.fontSize;
  }

  createElement() {
    super.createElement();
    this.setColor();
    return this;
  }

  setColor(fg = "#fff", bg = "#000") {
    this.el.style.backgroundColor = bg;
    this.el.style.color = fg;
    return this;
  }

  setName(name) {
    this.name = name;
    this.el.innerText = this.name;
    return this;
  }

  getName() {
    return this.name;
  }
}

// 这个类用于表示角色
class Character extends NamedObject {
  // 这个函数用于初始化角色
  constructor(name) {
    super();
    this.setType("Character");
    this.setName(name);
    this.speed = 5;
    this.setState("point", () => 0);
    this.setState("alive", () => false);
  }

  spown() {
    super.spown();
    this.setState("alive", () => true);
    this.setColor("#fff", "#000");
    return this;
  }

  update() {
    super.update();
    const { speed } = this;
    const game = this.getGame()
    const { width, height } = game;
    const { w, h } = this.getSize();
    const xMax = width - w;
    const yMax = height - h;
    const keyMap = game.getKeyMap();

    let { x, y } = this;
    let speedX = 0;
    let speedY = 0;
    if (keyMap.ArrowUp) speedY += -speed;
    if (keyMap.ArrowDown) speedY += speed;
    if (keyMap.ArrowLeft) speedX += -speed;
    if (keyMap.ArrowRight) speedX += speed;

    x += speedX;
    y += speedY;

    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > xMax) x = xMax;
    if (y > yMax) y = yMax;

    return this.moveTo(x, y);
  }

  grow() {
    this.setState("point", (state) => (state.point + 1))
    this.setFontSize(this.getFontSize() + 1);
    return this;
  }

  dead() { 
    this.setState("alive", () => false);
    this.setColor("#aaa", "#f00");
    return this;
  }
}

class RandomNamedObject extends NamedObject {
  constructor(name) {
    super(name);
    this.setType("RandomNamedObject");
  }

  spown() {
    super.spown();
    const game = this.getGame();
    const { width, height } = game;
    const { w, h } = this.getSize();
    let i = 0;
    do {
      this.moveTo(Math.random() * (width - w), Math.random() * (height - h));
      i++;
    } while (
      i < 100 && game.getGameObjects().some((gameObject) =>
      gameObject.isIntersectedWith(this)
      )
    );
    return this;
  }
}

class Food extends RandomNamedObject {
  constructor() {
    super();
    this.setType("Food");
    this.setName("🍎");
  }

  update() {
    super.update();
    this.getGame().getGameObjects()
      .filter((gameObject) => gameObject.hasType("Character"))
      .filter((gameObject) => gameObject.hasType("Character"))
      .filter((character) => character.isIntersectedWith(this))
      .forEach((character) => {
        character
        .grow()
        .getGame().removeGameObject(this);
      });
      return this;
  }
}

// 障碍物类
class Obstacle extends RandomNamedObject {
  constructor() {
    super();
    this.setType("Obstacle");
    this.setName("🌲");
  }

  update() {
    super.update();
    this.getGame().getGameObjects()
      .filter((gameObject) => gameObject.hasType("Character"))
      .filter((character) => character.isIntersectedWith(this))
      .forEach((character) => {
        character.dead()
        .getGame().stop();
      });
      return this;
  }
}

// 这个类用于控制游戏的运行
class Game extends WithState {
  //  这个函数用于初始化游戏
  constructor({ width, height }) {
    super();
    this.width = width;
    this.height = height;
    this.gameObjects ??= new Set();
    this.state = Object.create(null)
    this.init();
  }

  // 这个函数用于添加游戏对象
  addGameObject(gameObject) {
    this.gameObjects.add(gameObject);
    gameObject.setGame(this);
    return this;
  }

  // 这个函数用于移除游戏对象
  removeGameObject(gameObject) {
    gameObject.disspown();
    this.gameObjects.delete(gameObject);
    gameObject.setGame(undefined);
    return this;
  }

  //获得游戏对象
  getGameObjects () {
    return Array.from(this.gameObjects)
  }

  // 这个函数负责更新游戏的状态
  render() {
    for (const gameObject of this.gameObjects) {
      gameObject.render();
    }
    return this;
  }

  // 这个函数负责更新游戏的逻辑
  update() {
    if (typeof this.logic === "function") {
      this.logic(this);
    }
    for (const gameObject of this.gameObjects) {
      gameObject.update();
    }
    return this;
  }

  // 这个函数负责注册按键
  registerKeyEvent = () => {
    this.key = {};
    const register = (value) => (event) => {
      this.key[event.key] = value;
    };
    document.addEventListener("keydown", register(true));
    document.addEventListener("keyup", register(false));
    return this;
  };

  // 获得按盘
  getKeyMap() {
    return {...this.key}
  }


  // 这个函数负责游戏的主循环
  gameLoop() {
    if (!this.running) return;
    this.update();
    this.render();
    this.rafTimer = requestAnimationFrame(this.gameLoop.bind(this));
    return this;
  }

  // 初始化
  init() {
    this.registerKeyEvent();
    this.initPlayground();
    return this;
  }

  setLogic(logicFc) {
    this.logic = logicFc
    return this;
  }

  // 初始化游戏场景
  initPlayground() {
    this.playground = document.createElement("div");
    this.playground.style.width = this.width + "px";
    this.playground.style.height = this.height + "px";
    this.playground.style.border = "1px solid black";
    this.playground.style.position = "relative";
    return this;
  }

  // 将游戏场景添加到DOM中
  appendToDom(el) {
    el.appendChild(this.playground);
    return this;
  }

  getDom() {
    return this.playground;
  }

  prepareToStart(fn) {
    this.onStart = fn;
    return this;
  }

  // 开始运行
  start() {
    this.stop();
    if (typeof this.onStart === "function") {
      this.onStart(this);
    }
    this.rafTimer = requestAnimationFrame(this.gameLoop.bind(this));
    this.setState("startTime", () => Date.now());
    this.running = true;
    return this;
  }

  // 停止运行
  stop() {
    cancelAnimationFrame(this.rafTimer)
    this.running = false;
    return this;
  }
}

// 创建一个游戏
new Game({ width: 500, height: 500 })
.init().appendToDom(document.body)
// 为游戏添加逻辑
.setLogic(
  (game) => {
    const now = Date.now();
    game.setStateIfNotExist("lastFoodSpownTime", state => state.startTime);
    game.setStateIfNotExist("lastObstacleSpownTime", state => state.startTime);
  
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
  }
)
// 准备开始
.prepareToStart((game) => {
  // 将角色添加到游戏中
  game
  .getGameObjects()
  .forEach((gameObject) => {
    game.removeGameObject(gameObject);
  })

  game
  // 角色
  .addGameObject(
    new Character("OwO")
  )
  // 得分板
  .addGameObject(
    new NamedObject()
    .moveTo(0, 500)
    .setLogic(o => {
      const game = o.getGame()
      o.setName(
        game.getGameObjects().filter(o => o.hasType("Character")).map(c => c.getState("point")).map(p => `得分：${p}`)[0]
      )
    })
  )
  // 名字
  .addGameObject(
    new NamedObject()
    .moveTo(150, 500)
    .setLogic(o => {
      const game = o.getGame()
      o.setName(
        `已存活时间 ${((Date.now() - game.getState("startTime")) / 1000).toFixed(2)} 秒`
      )
    })
  )
  // 重新开始按钮
  .addGameObject(
    new NamedObject("重新开始")
    .moveTo(400, 500)
    .setLogic(o => {
      const game = o.getGame()
      o.onClick(() => {
        game.start()
      })
    })
  )
  .getGameObjects()
  .forEach((gameObject) => {
    gameObject.spown();
  })
})
.start();
