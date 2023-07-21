import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";

// 获得根 Dom 节点
const rootElement = document.getElementById("root");

console.log(rootElement);

if (rootElement) {
  // 创建 React 渲染根节点
  const reactRoot = createRoot(rootElement);

  // 渲染 React 元素
  reactRoot.render(
    // 根节点！！！
    <App />
  );

  // 下面的代码等价
  // <h1>Hello, world</h1>

  // React.createElement(
  //   "h1",
  //   null,
  //   "Hello, world"
  // );
}
