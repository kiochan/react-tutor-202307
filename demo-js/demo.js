// 变量声明
const constantNumber = 1; // 常量
let number = 2; // 变量

// number1 = 10; // 报错，常量不可修改
number = 10; // 变量可修改

// 表达式
number + 1;
number - 1;
number * number;
number / 10;
Math.pow(number, 2); // 幂运算

// 函数
function addF(a, b) {
  return a + b;
}

const addFInVariable = function addF(a, b) {
  return a + b;
};

// 箭头函数
const addAf = (a, b) => a + b;

const addAfWithBody = (a, b) => {
  return a + b;
};

addAf(1, 5); // 6

// 字符串
const string = "hello world";
const string2 = "hello" + "world"; // 拼接
const strHello = "hello";
const strWorld = "world";
const string3 = strHello + " " + strWorld; // 拼接
const string4 = `${strHello} ${strWorld}`; // 模板字符串

// 字面量
1;
("hello");
0.1;
true;
false;
null;
undefined; // 不是完全的字面量，是个变量 （因为特殊历史原因）

// 对象
const PeopleMataData = Object.freeze({
  Sex: Object.freeze({
    Male: Symbol("男孩子"),
    Female: Symbol("女孩子"),
  }),
});

const cuteGirl = {
  name: "尕牙",
  age: 17,
  sex: PeopleMataData.Sex.Female,
  height: 169,
};

// 避免了
// cuteGirlName = '尕牙';

cuteGirl.name; // "尕牙"
cuteGirl.age; // 17

// 数组
const array = [1, 2, 3, 4, 5];
array[2]; // 3

// 控制语句
if (cuteGirl.age > 18) {
  console.log("成年了");
} else {
  console.log("未成年");
}

for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}

while (array.length > 0) {
  console.log(array.pop());
}

switch (cuteGirl.sex) {
  case PeopleMataData.Sex.Male:
    console.log("男孩子");
    break;
  case PeopleMataData.Sex.Female:
    console.log("女孩子");
    break;
  default:
    console.log("未知");
    break;
}

// 类
class People {
  constructor(name, age, sex, height) {
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.height = height;
  }

  sayHello() {
    console.log(`hello, ${this.name}`);
  }

  toString() {
    return `${this.name}是一个${this.age}岁的${
      this.sex === PeopleMataData.Sex.Female ? "女" : "男"
    }孩子，身高${this.height}厘米。好可爱呀！`;
  }
}

const cuteGaya = new People("尕牙", 17, PeopleMataData.Sex.Female, 169);

console.log(cuteGaya.toString());

cuteGaya.fetish = "猫耳"; // 动态添加属性
cuteGaya.cup = "F"; // 动态添加属性
// cuteGaya 是贫乳 (╯‵□′)╯︵┻━┻
cuteGaya.cup = "A"; // 动态修改属性

console.log(cuteGaya.fetish); // 猫耳
console.log(cuteGaya.cup); // A

if (cuteGaya.cup === "A") {
  console.log("贫乳");
} else if (cuteGaya.cup === "B") {
  console.log("小胸");
} else if (cuteGaya.cup === "C") {
  console.log("中胸");
} else if (cuteGaya.cup === "D") {
  console.log("大胸");
} else if (cuteGaya.cup === "E") {
  console.log("巨乳");
} else if (cuteGaya.cup === "F") {
  console.log("爆乳");
} else {
  console.log("未知");
}

// 三元运算符
cuteGaya.cup === "A" ? "贫乳" : "未知";

// 逻辑运算符
const cuteLu = new People("囷鹿", 18, PeopleMataData.Sex.Female, 185);

// && 与
if (cuteLu.age > 18 && cuteLu.height > 180) {
  console.log("成年高个子");
}
// || 或
if (cuteLu.age > 18 || cuteLu.height > 180) {
  console.log("很帅");
}

// 事件循环

function printHello() {
  console.log("hello world");
}

// 定时器 1秒后执行 printHello 函数
const timer = setTimeout(printHello, 1000);
clearTimeout(timer); // 清除定时器

// 每隔1秒执行一次 printHello 函数
const timer2 = setInterval(printHello, 1000);
clearInterval(timer2); // 清除定时器
