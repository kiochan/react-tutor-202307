import { WithState } from "./common";

// 这个用于存储游戏中的角色
export class GameObject extends WithState {
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
  addToGame(game) {
    game.addGameObject(this);
    return this;
  }

  getGame() {
    return this._game;
  }

  delete() {
    this.disspown();
    this.getGame()?.removeGameObject(this);
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
    this._el = document.createElement("span");
    this._el.style.position = "absolute";
    this._el.style.left = this._x + "px";
    this._el.style.top = this._y + "px";
    return this;
  }

  // 这个函数用于设置游戏对象的根元素
  setGame(game) {
    this._game = game;
    return this;
  }

  // 这个函数用于将游戏对象添加到游戏中
  spown() {
    this.getGame().getDom().appendChild(this._el);
    return this;
  }

  // 这个函数用于将游戏对象从游戏中移除
  disspown() {
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
  getPosition() {
    return {
      x: this._x,
      y: this._y,
    };
  }

  // 这个函数用于设置游戏对象的位置
  moveTo(x, y) {
    this._x = x;
    this._y = y;
    return this;
  }

  // 这个函数用于设置游戏对象的逻辑
  setLogic(logicFc) {
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

  getSize() {
    return {
      w: this._el.clientWidth,
      h: this._el.clientHeight,
    };
  }

  // 这个函数用于更新游戏对象的状态
  render() {
    this._el.style.left = this._x + "px";
    this._el.style.top = this._y + "px";
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

  // 注册点击事件
  onClick(cb) {
    this._el.addEventListener("click", cb);
    return this;
  }

  // 撤销点击事件
  offClick(cb) {
    this._el.removeEventListener("click", cb);
    return this;
  }
}
