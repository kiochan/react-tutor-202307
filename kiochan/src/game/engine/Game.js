import { WithState } from "./common";

// 这个类用于控制游戏的运行
export class Game extends WithState {
  //  这个函数用于初始化游戏
  constructor({ width, height }) {
    super();
    this._width = width;
    this._height = height;
    this._gameObjects = new Set();
    this._state = Object.create(null);
    this.init();
  }

  getPlaygroundSize() {
    return {
      width: this._width,
      height: this._height,
    };
  }

  // 这个函数用于添加游戏对象
  addGameObject(gameObject) {
    this._gameObjects.add(gameObject);
    gameObject.setGame(this);
    return this;
  }

  // 这个函数用于移除游戏对象
  removeGameObject(gameObject) {
    gameObject.disspown();
    this._gameObjects.delete(gameObject);
    gameObject.setGame(undefined);
    return this;
  }

  //获得游戏对象
  getGameObjects() {
    return Array.from(this._gameObjects);
  }

  // 这个函数负责更新游戏的状态
  render() {
    for (const gameObject of this._gameObjects) {
      gameObject.render();
    }
    return this;
  }

  // 这个函数负责更新游戏的逻辑
  update() {
    if (typeof this._logic === "function") {
      this._logic(this);
    }
    for (const gameObject of this._gameObjects) {
      gameObject.update();
    }
    return this;
  }

  // 这个函数负责注册按键
  registerKeyEvent = () => {
    this._key = {};
    const register = (value) => (event) => {
      this._key[event.key] = value;
    };
    document.addEventListener("keydown", register(true));
    document.addEventListener("keyup", register(false));
    return this;
  };

  // 获得按盘
  getKeyMap() {
    return { ...this._key };
  }

  // 这个函数负责游戏的主循环
  gameLoop() {
    if (!this._running) return;
    this.update();
    this.render();
    this._rafTimer = requestAnimationFrame(this.gameLoop.bind(this));
    return this;
  }

  // 初始化
  init() {
    this.registerKeyEvent();
    this.initPlayground();
    return this;
  }

  setLogic(logicFc) {
    this._logic = logicFc;
    return this;
  }

  // 初始化游戏场景
  initPlayground() {
    this._playground = document.createElement("div");
    this._playground.style.width = this._width + "px";
    this._playground.style.height = this._height + "px";
    this._playground.style.border = "1px solid black";
    this._playground.style.position = "relative";
    return this;
  }

  // 将游戏场景添加到DOM中
  appendToDom(el) {
    el.appendChild(this._playground);
    return this;
  }

  getDom() {
    return this._playground;
  }

  prepareToStart(fn) {
    this._onStart = fn;
    return this;
  }

  // 开始运行
  start() {
    this.stop();
    this.setState("startTime", () => Date.now());
    if (typeof this._onStart === "function") {
      this._onStart(this);
    }
    this._rafTimer = requestAnimationFrame(this.gameLoop.bind(this));
    this._running = true;
    return this;
  }

  // 停止运行
  stop() {
    cancelAnimationFrame(this._rafTimer);
    this._running = false;
    return this;
  }
}
