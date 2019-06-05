module.exports = {
  // 项目部署的基础路径，该项配置默认为： "/"
  // 我们默认假设你的应用将会部署在域名的根部，
  // 比如 https://www.my-app.com/
  // 如果你的应用时部署在一个子路径下，那么你需要在这里
  // 指定子路径。比如，如果你的应用部署在
  // https://www.foobar.com/my-app/
  // 那么将这个值改为 `/my-app/`
  publicPath: '/', 
  // 打包输出文件路径（文件名，默认 dist ）
  outputDir: 'dist',
  //打包后静态静态资源的放置位置，该项配置默认为 "" , 即直接将 ( js/css/img/fonts/...) 这些文件夹放在了 dist 文件夹下
  //这里将这些静态资源放置在 static 文件夹中
  assetsDir : "static",
  // 开发服务器配置
  devServer: {
    // 代理
    // proxy: {
    //   "/api": {
    //     target: "http://222.212.143.112",
    //     pathRewrite: {
    //       // '^/api':''
    //     }
    //   }
    // }
  },
  // 关闭 eslint
  lintOnSave: false,
 

};