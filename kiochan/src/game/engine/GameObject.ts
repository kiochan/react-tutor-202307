import type { Game } from "./Game";
import type { Position } from "./types/Position";
import type { Size } from "./types/Size";

import { WithState } from "./common";

// 这个用于存储游戏中的角色
export class GameObject extends WithState {
  protected __type__: string[];
  protected _x: number;
  protected _y: number;
  protected _game?: Game;
  protected _el!: HTMLSpanElement;
  protected _logic?: (self: this) => void;

  // 这个函数用于初始化游戏对象
  constructor() {
    super();
    this.__type__ = [];
    this._x = 0;
    this._y = 0;
    this.setType("GameObject");
    this.createElement();
  }

  // 添加进游戏
  addToGame(game: Game): this {
    game.addGameObject(this);
    return this;
  }

  getGame(): Game | undefined {
    return this._game;
  }

  delete(): this {
    this.disspawn();
    this.getGame()?.removeGameObject(this);
    return this;
  }

  // 设置游戏对象类型
  setType(type: string): this {
    this.__type__.push(type);
    return this;
  }

  // 检查类型是不是存在
  hasType(type: string): boolean {
    return this.__type__.includes(type);
  }

  // 这个函数用于创建游戏对象的元素
  createElement(): this {
    this._el = document.createElement("span");
    this._el.style.position = "absolute";
    this._el.style.left = this._x + "px";
    this._el.style.top = this._y + "px";
    return this;
  }

  // 这个函数用于设置游戏对象的根元素
  setGame(game: Game | undefined): this {
    this._game = game;
    return this;
  }

  // 这个函数用于将游戏对象添加到游戏中
  spawn(): this {
    const game = this.getGame();
    if (game === undefined) {
      throw Error("必须得将GameObject添加进Game中才可spawn()");
    }
    game.getDom().appendChild(this._el);
    return this;
  }

  // 这个函数用于将游戏对象从游戏中移除
  disspawn(): this {
    const game = this.getGame();
    if (game === undefined) return this;
    const root = game.getDom();
    if (root === undefined) return this;
    if (root.contains(this._el)) {
      root.removeChild(this._el);
    }
    return this;
  }

  // 这个函数用于获取游戏对象的位置
  getPosition(): Position {
    return {
      x: this._x,
      y: this._y,
    };
  }

  // 这个函数用于设置游戏对象的位置
  moveTo(x: number, y: number): this {
    this._x = x;
    this._y = y;
    return this;
  }

  // 这个函数用于设置游戏对象的逻辑
  setLogic(logicFc: (self: this) => void) {
    this._logic = logicFc;
    return this;
  }

  // 这个函数用于更新游戏对象的状态
  update() {
    if (typeof this._logic === "function") {
      this._logic(this);
    }
    return this;
  }

  getSize(): Size {
    const el = this._el;
    return {
      w: el.clientWidth,
      h: el.clientHeight,
    };
  }

  // 这个函数用于更新游戏对象的状态
  render(): this {
    const el = this._el;
    el.style.left = this._x + "px";
    el.style.top = this._y + "px";
    return this;
  }

  // 判断相交
  isIntersectedWith(gameObject: GameObject): boolean {
    const { x: x1, y: y1 } = this.getPosition();
    const { x: x2, y: y2 } = gameObject.getPosition();
    const { w: w1, h: h1 } = this.getSize();
    const { w: w2, h: h2 } = gameObject.getSize();
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
  }

  // 注册点击事件
  onClick(cb: (event: MouseEvent) => void): this {
    const el = this._el;
    el.addEventListener("click", cb);
    return this;
  }

  // 撤销点击事件
  offClick(cb: (event: MouseEvent) => void): this {
    const el = this._el;
    el.removeEventListener("click", cb);
    return this;
  }
}
