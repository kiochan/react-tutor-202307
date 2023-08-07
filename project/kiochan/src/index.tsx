import React from "react";
import { hydrateRoot } from "react-dom/client";
import { App } from "./components/App";

// 获得根 Dom 节点
const rootElement = document.getElementById("root");

if (rootElement) {
  // 创建 React 渲染根节点
  hydrateRoot(rootElement, <App />);
}
