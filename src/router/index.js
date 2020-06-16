import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// import ppt from '../components/ppt'
// import pptPage from '../components/pptPage'
// import helloWorld from '../components/helloWorld'

// 配置路由
const routes = [
    {
        path:"/",
        redirect:"/ready"
    },
    {
        path:"/ready",
        name:"ready",
        component: ()=>import('../pages/ready/ready')
    },
    {
        path:"/ppt/:pptId",
        name:"ppt",
        props: true,
        component: () => import('../pages/ppt/container'),
        children:[
            {
                path:"",                                                   // path:"/pptPage", 这种方式会直接匹配”/pptPage“
                redirect:"0"
            },
            {
                path:":index",                                     // path:"/pptPage", 这种方式会直接匹配”/pptPage“
                name:"pptPage",
                props: true,
                component: ()=>import('../pages/ppt/pptPage')
            }
        ] 
    },
    {
        path:"/blackBoard",
        name:"blackBoard",
        component: () => import('../pages/blackBoard/blackBoard') 
    },
    {
        path:"/pptTest",
        name:"ppttest",
        component: () => import('../components/ppt') 
    },
    {   path:"/pptPageTest/:index", 
        name:"pptPageTest",
        component: () => import('../components/pptPage')
    },
    {   path:"/helloWorld",
        name:"helloWorld",
        component : () => import('../components/helloWorld')                    //推荐import方式进行路由懒加载，更简洁。目前各引擎并未实现import，还是babel转es5，采用了require的方式。
        // component: resolve =>require(['../components/helloWorld'],resolve)   //require是运行时加载，import是编译时加载。
        // component: helloWorld                                                //参考 https://www.jianshu.com/p/0fb49a748f80
    },
    {   path:"/formTest", 
        name:"formTest",
        component: () => import('../components/form/formTest')
    },
    {
        path:"/test",
        name:"test",
        component:()=> import('../pages/test/index')
    },
    {
        path:"/test/vueDraggableTest",
        name:"vueDraggableTest",
        component:()=> import('../pages/test/vueDraggableTest')
    }
]

// 实例化路由
const router = new VueRouter({
    mode:"history",   //默认模式事hash模式，url中多出#，无法在页面中做锚点定位，尽量使用history模式。
    routes : routes
})

// 导出路由模块
export default router