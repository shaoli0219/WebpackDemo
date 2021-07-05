/**
 * webpack配置文件
 */
const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

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
                    // MiniCssExtractPlugin.loader,
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },

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
                    // MiniCssExtractPlugin.loader,
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },

                    // 3、css-loader按照CommonJS规范，将样式文件输出到js中
                    'css-loader',

                    // 2、通过 postcss-loader 给样式属性添加浏览器前缀
                    'postcss-loader',

                    // 1、less-loader把less转换为css
                    'less-loader'

                ]
            },
            // 处理图片
            {
                test: /\.(png|jpe?g)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        // 指定图片大小，小于该数据的图片，会被转成base64
                        limit: 8 * 1024,//8kb
                        // [name]是图片原名称
                        // [ext]是图片原后缀名
                        name: 'image/[name].[ext]',
                        // url-loader 默认采用 ES modules 规范进行解析，但是 html-loader 引入使用的是 commonJs 规范
                        // 解决：关闭 url-loader 默认的 ES modules 规范,强制 url-loader 使用 CommonJS 规范打包
                        esModule: false,
                    }
                }
            },
            // 匹配字体文件
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                    }
                }
            },
            // 处理html
            {
                test: /\.(htm|html)$/i,
                use: {
                    loader: 'html-loader',
                    options: {
                        // webpack@4 只需要在 url-loader 配置 esModele:false
                        // webpack@5 需要在 html-loader 中，也配置 esModele:false
                        esModule: false,
                    }
                }
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
            template: './src/index.ejs',
            // 指定html中使用的变量
            title: 'Webpack Demo'
        }),
        new HtmlWebpackPlugin({
            // 指定打包后的文件名称
            filename: 'about.html',
            // 用来指定生成html的模板
            template: './src/index.ejs',
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
        }),
        // 直接将src不需要处理的文件输出到目标文件
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/public',
                    to: 'public'
                }
            ]
        }),
        // 打包之前删除历史文件
        new CleanWebpackPlugin()
    ],

    // 开发服务器
    devServer: {

    }
}