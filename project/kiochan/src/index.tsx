import React from "react";
import { App } from "./components/App";
import { createRoot } from "react-dom/client";

// 获得根 Dom 节点
const rootElement = document.getElementById("root")!;

// 渲染根组件
createRoot(rootElement).render(<App />);