import express from "express";
import fs from "fs";
import webpack from "webpack";
import webpackConfig from "../../webpack.config";
import { PageId, allPages } from "../settings";
import { renderToString } from "react-dom/server";
import { App } from "../components/App";
import React from "react";

(webpackConfig as any).mode = "development";

webpack(webpackConfig, (err, stats) => {
  if (err || stats?.hasErrors()) {
    console.error(err);
    process.exit(1);
  }
  startServer();
});

function startServer() {
  const app = express();
  const port = 3000;

  const staticMiddleware = express.static("dist");

  const htmlTemplate = fs.readFileSync("dist/index.html", "utf8");

  function renderReactApp(req: express.Request, res: express.Response) {
    const reactAppString = renderToString(
      React.createElement(App, {
        defaultPageId: req.params.page,
      })
    );

    const html = htmlTemplate.replace("<!-- ::APP:: -->", reactAppString);

    res.send(html);
  }
  app.get("/:page", (req, res, next) => {
    if (
      req.params.page === "index.html" ||
      allPages.includes(req.params.page as PageId)
    ) {
      renderReactApp(req, res);
    } else {
      next();
    }
  });

  app.get("/", (req, res) => {
    renderReactApp(req, res);
  });

  app.use(staticMiddleware);

  app.use((req, res) => {
    req.params.page = "404";
    renderReactApp(req, res);
  });

  app.listen(port, () => {
    console.log(`Example app running at http://localhost:${port}/`);
  });
}
