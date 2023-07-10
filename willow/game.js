// 这个用于存储游戏中的角色
class GameObject {
  // 这个函数用于初始化游戏对象
  constructor() {
    this.x = 0;
    this.y = 0;
    this.timer = 0;
    this.createElement();
  }

  // 这个函数用于创建游戏对象的元素
  createElement() {
    this.el = document.createElement('span');
    this.el.style.position = 'absolute';
    this.el.style.left = this.x + 'px';
    this.el.style.top = this.y + 'px';
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
    if (typeof this.logic === 'function') {
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
    this.el.style.left = this.x + 'px';
    this.el.style.top = this.y + 'px';
  }
}

// 这个类用于表示角色
class Character extends GameObject {
  // 这个函数用于初始化角色
  constructor(name) {
    super();
    this.setName(name);
    this.speed = 3;
  }

  createElement() {
    super.createElement();
    this.el.style.backgroundColor = '#000';
    this.el.style.color = '#fff';
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

// 食物类
class Food extends GameObject {
  constructor() {
    super();
    this.setName('$');
    this.x = Math.ceil(Math.random() * 400) + 91;
    this.y = Math.ceil(Math.random() * 400) + 79;
  }

  createElement() {
    super.createElement();
    this.el.style.backgroundColor = '#000';
    this.el.style.color = '#fff';
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

// 障碍物类
class Obstacles extends GameObject {
  constructor() {
    super();
    this.setName('X');
    this.x = Math.ceil(Math.random() * 400) + 91;
    this.y = Math.ceil(Math.random() * 400) + 79;
  }

  createElement() {
    super.createElement();
    this.el.style.backgroundColor = '#000';
    this.el.style.color = '#fff';
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
  //随机移动
  randomMove(time = 1000) {
    this.timer = setInterval(() => {
      const randomDirection = Math.round(Math.random());
      const randomStep = Math.round(Math.random()) === 0 ? -1 : 1;
      if (randomDirection === 0) {
        this.moveTo(this.x + randomStep, this.y);
      } else {
        this.moveTo(this.x, this.y + randomStep);
      }
    }, time);
  }
}

// 这个类用于控制游戏的运行
class Game {
  //  这个函数用于初始化游戏
  constructor({ width, height }) {
    this.width = width;
    this.height = height;
    //生成的列表
    this.listFood = [];
    this.listObstacles = [];
    //定义两种计时器
    this.timerFood = 0;
    this.timerObstacles = 0;
    //吃掉的食物列表
    this.listFoodAted = [];
    this.canMove = false;
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
    document.addEventListener('keydown', register(true));
    document.addEventListener('keyup', register(false));
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
    this.playground = document.createElement('div');
    this.playground.style.width = this.width + 'px';
    this.playground.style.height = this.height + 'px';
    this.playground.style.border = '1px solid black';
    this.playground.style.position = 'relative';
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
    this.canMove = true;
    this.timer = requestAnimationFrame(this.gameLoop.bind(this));
  }

  // 停止运行
  stop() {
    this.canMove = false;
    cancelAnimationFrame(this.timer);
  }
  //重置
  reset() {
    this.listFood.forEach((o) => console.log(o.getSize()));

    this.listFood.forEach((o) => {
      clearInterval(o.timer);
      o.disspown();
      this.removeGameObject(o);
    });
    this.listObstacles.forEach((o) => {
      clearInterval(o.timer);
      o.disspown();
      this.removeGameObject(o);
    });
    this.listFood = [];
    this.listObstacles = [];
    this.listFoodAted = [];
    character.moveTo(0, 0);
    clearInterval(this.timerFood);
    clearInterval(this.timerObstacles);
    this.stop();
  }
}

// 创建一个游戏
const game = new Game({ width: 500, height: 500 });

// 创建一个角色
const character = new Character('OwO');
// 初始化游戏
game.init();

// 将游戏添加到DOM中
game.appendToDom(document.body);

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
  if (game.canMove === false) {
    return;
  }
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
  const chaSize = character.getSize();

  //吃食物逻辑
  const listFoodAted = game.listFood.filter((o) => {
    const foodSize = o.getSize();
    if (
      isPolygonsIntersectant(
        [
          { x: x, y: y },
          { x: x + chaSize.w, y: y + chaSize.h },
        ],
        [
          { x: o.x, y: o.y },
          { x: o.x + foodSize.w, y: o.y + foodSize.h },
        ]
      )
    ) {
      return o;
    }
  });
  game.listFood = game.listFood.filter((o) => !listFoodAted.includes(o));
  listFoodAted.forEach((o) => {
    clearInterval(o.timer);
    o.disspown();
    game.removeGameObject(o);
  });
  game.listFoodAted.push(...listFoodAted);
  document.getElementById('foodCount').innerHTML = game.listFoodAted.length;
  //碰到障碍物逻辑
  const reachObstacles = game.listObstacles.find((o) => {
    const obstaclesSize = o.getSize();
    if (
      isPolygonsIntersectant(
        [
          { x: x, y: y },
          { x: x + chaSize.w, y: y + chaSize.h },
        ],
        [
          { x: o.x, y: o.y },
          { x: o.x + obstaclesSize.w, y: o.y + obstaclesSize.h },
        ]
      )
    ) {
      return o;
    }
  });
  if (reachObstacles != undefined) {
    stopGame();
  }
});
console.log('character Size', character.getSize());

function resetGame() {
  game.reset();
}

function startGame() {
  game.start();
  game.timerFood = setInterval(() => {
    const objectFood = new Food();
    game.addGameObject(objectFood);
    objectFood.spown();
    game.listFood.push(objectFood);
  }, 1000);

  game.timerObstacles = setInterval(() => {
    const objectObstacles = new Obstacles();
    game.addGameObject(objectObstacles);
    objectObstacles.spown();
    game.listObstacles.push(objectObstacles);
  }, 5000);
}

function stopGame() {
  clearInterval(game.timerFood);
  clearInterval(game.timerObstacles);
  game.listFood.forEach((o) => {
    clearInterval(o.timer);
  });
  game.listObstacles.forEach((o) => {
    clearInterval(o.timer);
  });
  game.stop();
}

//判断两多边形线段是否相交
function isSegmentsIntersectant(segA, segB) {
  //线线
  const abc =
    (segA[0].x - segB[0].x) * (segA[1].y - segB[0].y) -
    (segA[0].y - segB[0].y) * (segA[1].x - segB[0].x);
  const abd =
    (segA[0].x - segB[1].x) * (segA[1].y - segB[1].y) -
    (segA[0].y - segB[1].y) * (segA[1].x - segB[1].x);
  if (abc * abd >= 0) {
    return false;
  }
  const cda =
    (segB[0].x - segA[0].x) * (segB[1].y - segA[0].y) -
    (segB[0].y - segA[0].y) * (segB[1].x - segA[0].x);
  const cdb = cda + abc - abd;
  return !(cda * cdb >= 0);
}

//判断两多边形边界是否相交
function isPolygonsIntersectant(plyA, plyB) {
  //面面
  for (let i = 0, il = plyA.length; i < il; i++) {
    for (let j = 0, jl = plyB.length; j < jl; j++) {
      const segA = [plyA[i], plyA[i === il - 1 ? 0 : i + 1]];
      const segB = [plyB[j], plyB[j === jl - 1 ? 0 : j + 1]];
      if (isSegmentsIntersectant(segA, segB)) {
        return true;
      }
    }
  }
  return false;
}
