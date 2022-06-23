const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    outputDir: 'dist',
    assetsDir: "assets",
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 3217
    },
    pages: {
        //配置入口文件
        index: {
            entry: 'src/pages/index/main.js',
            template: 'src/pages/index/index.html',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    },
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ],
    productionSourceMap: false,
    chainWebpack: (config) => {
        // 移除 prefetch 插件(针对生产环境首屏请求数进行优化)
        config.plugins.delete('prefetch')
            // 移除 preload 插件(针对生产环境首屏请求数进行优化)
        config.plugins.delete('preload')
            // 设置路径别名
        config.resolve.alias
            .set('@', resolve('./src'))
            .set('^', resolve('./public/static'))
    },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.mode = 'production'
            return {
                plugins: [new CompressionPlugin({
                    test: /\.js$|\.html$|\.css/, //匹配文件名
                    threshold: 10240, //对超过10k的数据进行压缩
                    deleteOriginalAssets: false //是否删除原文件
                })]
            }
        }
    }
}