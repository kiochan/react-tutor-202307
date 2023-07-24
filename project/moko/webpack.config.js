const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  // 入口文件位置
  entry: "./src/index.tsx",
  // 输出文件的配置
  output: {
    // 输出文件名
    filename: "bundle.js",
    // 输出文件的目标位置
    // __dirname 是 nodejs 的一个全局变量，表示当前文件所在的目录
    // path.resolve() 方法可以将多个路径拼接在一起，形成一个绝对路径
    path: path.resolve(__dirname, "dist"),
  },
  // 插件
  plugins: [
    // 复制插件
    // 将 public 目录下的所有文件复制到 dist 目录下
    new CopyPlugin({
      patterns: [{ from: "public", to: "." }],
    }),
  ],
  // 解析文件的方式
  resolve: {
    // 配置文件扩展名
    extensions: [".js", ".ts", ".tsx"],
  },
  // 模块
  module: {
    // 规则
    rules: [
      {
        // 匹配文件的正则表达式，以 .ts 结尾的文件
        test: /\.tsx?$/,
        // 排除的文件，node_modules 和 bower_components 目录下的文件不进行处理
        exclude: /(node_modules|bower_components)/,
        // 使用 babel-loader 进行处理
        // babel-loader 可以将 ES6+ 的代码转换为 ES5 的代码
        use: {
          loader: "babel-loader",
          // babel-loader 的配置
          options: {
            presets: [
              // 预设
              "@babel/preset-env",
              // TypeScript 预设
              "@babel/preset-typescript",
              "@babel/preset-react",
            ],
            plugins: [
              // 支持 ES6+ 的对象展开语法
              "@babel/plugin-proposal-object-rest-spread",
            ],
          },
        },
      },
    ],
  },
};
