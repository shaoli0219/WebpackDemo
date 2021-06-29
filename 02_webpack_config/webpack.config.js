/**
 * webpack配置文件
 */
const { resolve } = require('path')
module.exports = {
    // 打包模式
    mode: 'production',

    // 入口文件
    entry: './src/index.js',

    // 出口文件
    output: {
        // 输出目录（必须是绝对路径）
        path: resolve(__dirname, 'output'),
        // 输出文件名称
        filename: 'bundle.js'
    },

    // 模块配置
    module: {
        rules: [
            // 指定多个规则
        ]
    },

    // 开发服务器
    devServer: {

    },

    // 插件配置
    plugins: [

    ]
}