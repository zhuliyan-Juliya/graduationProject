const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development', // 配置开发环境模式
    entry: ['@babel/polyfill', './src/index.js'], // 打包的入口文件
    output: { // 打包文件的出口
        publicPath: '/',
        filename: 'bound.js', // 打包文件名
        path: path.resolve(__dirname, 'dist') // 打包文件存放的目录
    },
    devServer: {
        hot: true, // 热更新
        host: 'local.juliya.com',
        port: 80,
        contentBase: './dist',
        proxy: {
            "/api": {
                target: "http://localhost:5000/",
                changeOrigin: true
            }
        },
    },
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        // 路径别名
        alias: {
            vue$: 'vue/dist/vue.runtime.esm.js',
            'images': path.resolve(__dirname, './src/assets/images'),
            '@src': path.resolve(__dirname, './src')
        }
    },
    module: { // 模块
        rules: [ // 规则
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'cache-loader'
                    },
                    {
                        loader: 'thread-loader'
                    },
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false
                            }
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'cache-loader'
                    },
                    {
                        loader: 'thread-loader'
                    },
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4 * 1024,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]',
                                    publicPath: '/',
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'media/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'fonts/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(less|css)$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // 生成的html文件名
            template: './src/index.html' // 以那个文件作为模块
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                VUE_APP_BASE_URL: JSON.stringify('http://local.juliya.com')
            }
        })
    ]
}