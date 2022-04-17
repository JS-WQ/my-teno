const { defineConfig } = require('@vue/cli-service')
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,   //关闭eslint检查
    chainWebpack: config => {
        config.resolve.alias
            .set('styles', resolve('src/assets/styles'))
    },
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    assetsDir: process.env.NODE_ENV === "production" ? "./" : "/",
    devServer: {
        proxy: {
            '/api': {
                target: "https://www.myteno.com/",
                changeOrigin: true,
                ws: true,
                secure: false,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/assets/styles/_mixins.scss";@import "@/assets/styles/_extend.scss";@import "@/assets/styles/_animate.scss";@import "@/assets/styles/common.scss";`
            }
        }
    }
})
