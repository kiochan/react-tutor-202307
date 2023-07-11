// 这个用于存储游戏中的角色
class GameObject {
  // 这个函数用于初始化游戏对象
  constructor() {
    this.__type__ = "GameObject";
    this.x = 0;
    this.y = 0;
    this.createElement();
  }

  // 这个函数用于创建游戏对象的元素
  createElement() {
    this.el = document.createElement("span");
    this.el.style.position = "absolute";
    this.el.style.left = this.x + "px";
    this.el.style.top = this.y + "px";
  }

  // 这个函数用于设置游戏对象的根元素
  setGame(game) {
    this.game = game;
  }

  // 这个函数用于将游戏对象添加到游戏中
  spown() {
    game.getDom().appendChild(this.el);
  }

  // 这个函数用于将游戏对象从游戏中移除
  disspown() {
    game.getDom().removeChild(this.el);
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
  }

  // 这个函数用于设置游戏对象的逻辑
  setLogic(logicFc) {
    this.logic = logicFc;
  }

  // 这个函数用于更新游戏对象的状态
  update() {
    if (typeof this.logic === "function") {
      this.logic(this);
    }
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
  }

  // 判断相交
  isIntersectedWith(gameObject) {
    const { x: x1, y: y1 } = this.getPosition();
    const { x: x2, y: y2 } = gameObject.getPosition();
    const { w: w1, h: h1 } = this.getSize();
    const { w: w2, h: h2 } = gameObject.getSize();
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
  }
}

class NamedObject extends GameObject {
  constructor(name) {
    super();
    this.__type__ = "Character";
    this.setName(name);
    this.setFontSize(20);
  }

  setFontSize(size) {
    this.fontSize = size;
    this.el.style.fontSize = size + "px";
  }

  getFontSize() {
    return this.fontSize;
  }

  createElement() {
    super.createElement();
    this.el.style.backgroundColor = "#000";
    this.el.style.color = "#fff";
  }

  setName(name) {
    this.name = name;
    this.el.innerText = this.name;
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
    this.__type__ = "Character";
    this.setName(name);
    this.speed = 1;
    this.point = 0;
    this.alive = true;
  }

  spown() {
    super.spown();
    this.alive = true;
    this.el.style.backgroundColor = "#000";
  }

  update() {
    super.update();
    const { speed } = character;
    const { width, height } = character.game;
    const { w, h } = character.getSize();
    const xMax = width - w;
    const yMax = height - h;

    let { x, y } = character;
    let speedX = 0;
    let speedY = 0;
    if (character.game.key.ArrowUp) speedY += -speed;
    if (character.game.key.ArrowDown) speedY += speed;
    if (character.game.key.ArrowLeft) speedX += -speed;
    if (character.game.key.ArrowRight) speedX += speed;

    x += speedX;
    y += speedY;

    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > xMax) x = xMax;
    if (y > yMax) y = yMax;

    character.moveTo(x, y);
  }

  dead() {
    this.alive = false;
    this.el.style.backgroundColor = "#f00";
  }
}

class RandomNamedObject extends NamedObject {
  constructor(name) {
    super(name);
    this.__type__ = "RandomNamedObject";
  }

  spown() {
    super.spown();
    const { width, height } = this.game;
    const { w, h } = this.getSize();
    do {
      this.moveTo(Math.random() * (width - w), Math.random() * (height - h));
    } while (
      [...this.game.gameObjects].some((gameObject) =>
        this.isIntersectedWith(gameObject)
      )
    );
  }
}

class Food extends RandomNamedObject {
  constructor() {
    super();
    this.__type__ = "Food";
    this.setName("🍎");
  }

  update() {
    super.update();
    Array.from(this.game.gameObjects)
      .filter((gameObject) => gameObject.__type__ === "Character")
      .filter((character) => this.isIntersectedWith(character))
      .forEach((character) => {
        character.point += 1;
        this.disspown();
        this.game.removeGameObject(this);
      });
  }
}

// 障碍物类
class Obstacle extends RandomNamedObject {
  constructor() {
    super();
    this.__type__ = "Obstacle";
    this.setName("🌲");
  }

  update() {
    super.update();
    Array.from(this.game.gameObjects)
      .filter((gameObject) => gameObject.__type__ === "Character")
      .filter((character) => this.isIntersectedWith(character))
      .forEach((character) => {
        character.dead();
        this.game.stop();
      });
  }
}

// 这个类用于控制游戏的运行
class Game {
  //  这个函数用于初始化游戏
  constructor({ width, height }) {
    this.width = width;
    this.height = height;
    this.init();
  }

  // 这个函数用于添加游戏对象
  addGameObject(gameObject) {
    this.gameObjects ??= new Set();
    this.gameObjects.add(gameObject);
    gameObject.setGame(this);
  }

  // 这个函数用于移除游戏对象
  removeGameObject(gameObject) {
    gameObject.disspown();
    this.gameObjects.delete(gameObject);
    gameObject.setGame(undefined);
  }

  // 这个函数负责更新游戏的状态
  render() {
    for (const gameObject of this.gameObjects) {
      gameObject.render();
    }
  }

  // 这个函数负责更新游戏的逻辑
  update() {
    for (const gameObject of this.gameObjects) {
      gameObject.update();
    }
  }

  // 这个函数负责注册按键
  registerKeyEvent = () => {
    this.key = {};
    const register = (value) => (event) => {
      this.key[event.key] = value;
    };
    document.addEventListener("keydown", register(true));
    document.addEventListener("keyup", register(false));
  };

  // 这个函数负责游戏的主循环
  gameLoop() {
    if (!this.running) return;
    this.update();
    this.render();
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  // 初始化
  init() {
    this.registerKeyEvent();
    this.initPlayground();
  }

  // 初始化游戏场景
  initPlayground() {
    this.playground = document.createElement("div");
    this.playground.style.width = this.width + "px";
    this.playground.style.height = this.height + "px";
    this.playground.style.border = "1px solid black";
    this.playground.style.position = "relative";
  }

  // 将游戏场景添加到DOM中
  appendToDom(el) {
    el.appendChild(this.playground);
  }

  getDom() {
    return this.playground;
  }

  // 开始运行
  start() {
    this.a = Date.now();
    requestAnimationFrame(this.gameLoop.bind(this));
    this.startTime = Date.now();
    this.running = true;
  }

  // 停止运行
  stop() {
    this.running = false;
  }
}

// 创建一个游戏
const game = new Game({ width: 500, height: 500 });

// 初始化游戏
game.init();

// 将游戏添加到DOM中
game.appendToDom(document.body);

// 创建一个角色
const character = new Character("OwO");

// 将角色添加到游戏中
game.addGameObject(character);

// 将角色添加到游戏中
character.spown();

// 为角色添加逻辑
character.setLogic((character) => {
  const { game } = character;
  const now = Date.now();
  character.game.lastFoodSpownTime ??= character.game.startTime;
  character.game.lastObstacleSpownTime ??= character.game.startTime;

  if (now - character.game.lastFoodSpownTime > 200) {
    const food = new Food();
    game.addGameObject(food);
    food.spown();
    character.game.lastFoodSpownTime = now;
  }

  if (now - character.game.lastObstacleSpownTime > 1000) {
    const obstacle = new Obstacle();
    game.addGameObject(obstacle);
    obstacle.spown();
    character.game.lastObstacleSpownTime = now;
  }
});

// 开始游戏
game.start();
