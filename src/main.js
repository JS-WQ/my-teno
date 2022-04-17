import { createApp } from 'vue'
import App from './App.vue'
import FastClick from 'fastclick'
import ElementPlus from 'element-plus'
import { WOW } from 'wowjs'
import 'wowjs/css/libs/animate.css'
import 'element-plus/dist/index.css'
import router from './router'
import store from './state'
import 'styles/iconfont.css'
import 'styles/ifont.css'
import 'styles/layout.css'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import $ from 'jquery'
FastClick.attach(document.body)

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.use(VueViewer)
// app.mount('#app')

app.directive('toNext', {
    // 当被绑定的元素挂载到 DOM 中时……
    mounted(el) {
        // 聚焦元素
        const tonext = ()=>{
            $('html,body').stop(true, false).animate({
                scrollTop: $(window).height()
            }, 500);
        }
        el.addEventListener('click',tonext)
    }
})

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

router.isReady().then(() => app.mount('#app'))

app.config.globalProperties.$wow = new WOW({
    boxClass: 'wow', 
    live: false, 
    callback :function(box){
       $(box).removeClass('wow');
    }
})

