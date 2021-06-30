/**
 * webpack配置文件
 */
const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
    // 模式
    mode: 'development',

    // 入口
    entry: './src/index.js',

    // 出口
    output: {
        // 输出目录（必须是绝对路径）
        path: resolve(__dirname, 'output'),
        // 输出文件名称
        filename: 'bundle.js',
    },

    // 模块配置
    module: {
        rules: [
            // 指定多个规则
            {
                test: /\.css$/i,
                // use中loader的加载顺序：先下后上
                use: [
                    // 3、将js中的样式挂载到<sytle>标签中
                    // 'style-loader',

                    // 3、将css打包到独立文件中
                    MiniCssExtractPlugin.loader,

                    // 2、css-loader按照CommonJS规范，将样式文件输出到js中
                    'css-loader',

                    // 1、通过 postcss-loader 给样式属性添加浏览器前缀
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/i,
                // use中loader的加载顺序：先下后上
                use: [
                    // 4、将js中的样式挂载到<sytle>标签中
                    // 'style-loader',

                    // 4、将css打包到独立文件中
                    MiniCssExtractPlugin.loader,

                    // 3、css-loader按照CommonJS规范，将样式文件输出到js中
                    'css-loader',

                    // 2、通过 postcss-loader 给样式属性添加浏览器前缀
                    'postcss-loader',

                    // 1、less-loader把less转换为css
                    'less-loader'

                ]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    // 按需加载
                                    useBuiltIns: 'usage',
                                    // core-js版本
                                    corejs: 3,
                                    // 指定兼容的浏览器版本
                                    // targets: "defaults"
                                    targets: {
                                        chrome: '58',
                                        ie: '9',
                                        firefox: '60',
                                        safari: '10',
                                        edge: '17'
                                    }
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    },

    // 插件配置
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new StylelintPlugin({
            // 指定需要进行格式校验的文件
            files: ['src/css/*.{css,less,sass,scss}']
        }),
        // 压缩css
        new OptimizeCssAssetPlugin(),
        // html的配置
        new HtmlWebpackPlugin({
            // 指定打包后的文件名称
            filename: 'index.html',
            // 用来指定生成html的模板
            template: './src/index.html',
            // 指定html中使用的变量
            title: 'Webpack Demo'
        }),
        new HtmlWebpackPlugin({
            // 指定打包后的文件名称
            filename: 'about.html',
            // 用来指定生成html的模板
            template: './src/index.html',
            // 指定html中使用的变量
            title: '关于我们',
            // html压缩
            minify: {
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new ESLintPlugin({
            // 自动解决常规代码格式报错
            fix: true
        })
    ],

    // 开发服务器
    devServer: {

    }
}