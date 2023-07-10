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
    console.log(x, y);
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

// 这个类用于表示角色
class Character extends GameObject {
  // 这个函数用于初始化角色
  constructor(name) {
    super();
    this.__type__ = "Character";
    this.setName(name);
    this.speed = 10;
    this.setFontSize(20);
  }

  // 这个函数用于设置角色的大小
  setFontSize(size) {
    this.fontSize = size;
    this.el.style.fontSize = size + "px";
  }

  // 这个函数用于获取角色的大小
  getFontSize() {
    return this.fontSize;
  }

  // 这个函数用于创建角色的元素
  createElement() {
    super.createElement();
    this.el.style.backgroundColor = "#000";
    this.el.style.color = "#fff";
  }

  // 这个函数用于设置角色的名字
  setName(name) {
    this.name = name;
    this.el.innerText = this.name;
  }

  // 这个函数用于获取角色的名字
  getName() {
    return this.name;
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
    this.update();
    this.render();
    this.timer = requestAnimationFrame(this.gameLoop.bind(this));
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
    this.timer = requestAnimationFrame(this.gameLoop.bind(this));
  }

  // 停止运行
  stop() {
    cancelAnimationFrame(this.timer);
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
  let { x, y } = character;
  const { width, height } = character.game;
  const { w, h } = character.getSize();
  const xMax = width - w;
  const yMax = height - h;

  if (x < 0) {
    x = 0;
    character.moveTo(x, y);
    return;
  }
  if (y < 0) {
    y = 0;
    character.moveTo(x, y);
    return;
  }
  if (x > xMax) {
    x = xMax;
    character.moveTo(x, y);
    return;
  }
  if (y > yMax) {
    y = yMax;
    character.moveTo(x, y);
    return;
  }

  const SPEED = character.speed;
  let speedX = 0;
  let speedY = 0;
  if (character.game.key.ArrowUp) {
    speedY = -SPEED;
  } else if (character.game.key.ArrowDown) {
    speedY = SPEED;
  } else {
    speedY = 0;
  }

  if (character.game.key.ArrowLeft) {
    speedX = -SPEED;
  } else if (character.game.key.ArrowRight) {
    speedX = SPEED;
  } else {
    speedX = 0;
  }

  x += speedX;
  y += speedY;
  character.moveTo(x, y);
});

// 开始游戏
game.start();
