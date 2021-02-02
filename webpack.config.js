const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const tsImportPluginFactory = require("ts-import-plugin");

module.exports = {
    context: path.resolve(__dirname),
    entry: {
        app: ['./project/entry/index.tsx']
    },
    devServer: {
        // historyApiFallback:true,
        // hot参数控制更新是刷新整个页面还是局部刷新
        contentBase: path.resolve(__dirname,'plugin/pop'),  
        publicPath: 'http://localhost:3000/',
        hot: true,
        port: 3000
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'plugin/pop'),
        publicPath: 'http://localhost:3000/'
        //publicPath: path.resolve(__dirname, 'plugin/pop')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "common",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial",
                    minSize: 30000,   //  注释掉的话也不会打出来
                    minChunks: 1,   //  如果是2的话一个也抽不出来，因为好多只用了一次
                    priority: 8 // 优先级
                }
            },
        },
    },
    plugins: [
        new MiniCssExtractPlugin({      //对css进行打包，webpack4推荐语法
            filename: "[name].css",
            chunkFilename: "[name].css"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                //  为了给antd定制样式，使用非获取匹配，反向否定预查
                test: /(?<=antd)\.(css|scss)$/,
                exclude: /node_modules/,
                use: [
                    //MiniCssExtractPlugin.loader,
                    'style-loader',
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: false,
                            namedExport: true
                        }
                    }
                ]
            },
            {
                test: /(?<!antd)\.(css|scss)$/,
                exclude: /node_modules/,
                use: [
                    //MiniCssExtractPlugin.loader,
                    'style-loader',
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            namedExport: true
                        }
                    }
                ]
            },
            {
                //  专门处理antd的css样式
                test: /\.(less)$/,
                include: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ],
            },
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                options: {
                  useCache: true,
                  useBabel: false, // !important!
                  getCustomTransformers: () => ({
                    before: [tsImportPluginFactory({
                      libraryName: 'antd',
                      libraryDirectory: 'lib',
                      style: true
                    })]
                  }),
                },
                exclude: [
                    /node_modules/
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'image',  // 指定图片输入的文件夹
                        publicPath: 'image',  // 指定获取图片的路径
                        esModule: false,            
                        name: '[name].[hash:8].[ext]'  // 输入的图片名
                    }
                  },
                ],
            },
        ]
    },
    watch: true,
    watchOptions: {
        poll: 1, // 每秒询问多少次
        aggregateTimeout: 500,  //防抖 多少毫秒后再次触发
        ignored: /node_modules/ //忽略时时监听
    },
    resolve: {
        extensions: [
            '.ts', '.tsx', '.js', '.json'
        ],
        alias: {
            "@utils": path.resolve(__dirname, "project/utils"),
            "@widgets": path.resolve(__dirname, 'project/entry/widgets'),
            "@constants": path.resolve(__dirname, "project/constants")
          },
    },
    mode:"development",
    //mode:"production",
}