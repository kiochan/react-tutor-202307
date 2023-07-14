import type { GameObject } from "./GameObject";
import type { Size } from "./types/Size";

import { WithState } from "./common";

// 这个类用于控制游戏的运行
export class Game extends WithState {
  protected _width: number;
  protected _height: number;
  protected _gameObjects: Set<GameObject>;
  protected _logic?: (game: Game) => void;
  protected _key: Record<string, boolean> = Object.create(null);
  protected _running: boolean = false;
  protected _rafTimer?: number;
  protected _playground!: HTMLDivElement;
  protected _onStart?: (game: Game) => void;

  //  这个函数用于初始化游戏
  constructor({ w, h }: Size) {
    super();
    this._width = w;
    this._height = h;
    this._gameObjects = new Set();
    this._state = Object.create(null);
    this.init();
  }

  getPlaygroundSize(): Size {
    return {
      w: this._width,
      h: this._height,
    };
  }

  // 这个函数用于添加游戏对象
  addGameObject(gameObject: GameObject): this {
    this._gameObjects.add(gameObject);
    gameObject.setGame(this);
    return this;
  }

  // 这个函数用于移除游戏对象
  removeGameObject(gameObject: GameObject): this {
    gameObject.disspawn();
    this._gameObjects.delete(gameObject);
    gameObject.setGame(undefined);
    return this;
  }

  //获得游戏对象
  getGameObjects(): GameObject[] {
    return Array.from(this._gameObjects);
  }

  // 这个函数负责更新游戏的状态
  render(): this {
    for (const gameObject of this._gameObjects) {
      gameObject.render();
    }
    return this;
  }

  // 这个函数负责更新游戏的逻辑
  update(): this {
    if (typeof this._logic === "function") {
      this._logic(this);
    }
    for (const gameObject of this._gameObjects) {
      gameObject.update();
    }
    return this;
  }

  // 这个函数负责注册按键
  registerKeyEvent(): this {
    const register = (value: boolean) => (event: KeyboardEvent) => {
      this._key[event.key] = value;
    };
    document.addEventListener("keydown", register(true));
    document.addEventListener("keyup", register(false));
    return this;
  }

  // 获得按盘
  getKeyMap(): Record<string, boolean> {
    return { ...this._key };
  }

  // 这个函数负责游戏的主循环
  gameLoop(): this {
    if (!this._running) return this;
    this.update();
    this.render();
    this._rafTimer = requestAnimationFrame(this.gameLoop.bind(this));
    return this;
  }

  // 初始化
  init(): this {
    this.registerKeyEvent();
    this.initPlayground();
    return this;
  }

  setLogic(logicFc: (game: Game) => void): this {
    this._logic = logicFc;
    return this;
  }

  // 初始化游戏场景
  initPlayground(): this {
    this._playground = document.createElement("div");
    this._playground.style.width = this._width + "px";
    this._playground.style.height = this._height + "px";
    this._playground.style.border = "1px solid black";
    this._playground.style.position = "relative";
    return this;
  }

  // 将游戏场景添加到DOM中
  appendToDom(el: HTMLElement): this {
    el.appendChild(this._playground);
    return this;
  }

  getDom(): HTMLDivElement {
    return this._playground;
  }

  prepareToStart(fn: (game: Game) => void): this {
    this._onStart = fn;
    return this;
  }

  // 开始运行
  start(): this {
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
  stop(): this {
    cancelAnimationFrame(this._rafTimer ?? 0);
    this._running = false;
    return this;
  }
}
