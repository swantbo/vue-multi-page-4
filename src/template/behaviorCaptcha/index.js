import Vue from 'Vue'
import cell from './index.vue'
import zantui from 'zantui'
import 'zantui/dist/styles/zantui.css'

/* 安装插件 */
Vue.use(zantui)

//获取页面初始化的值
var DATASOURCE = JSON.parse(document.getElementById('bx-shield-datasource').innerHTML);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    data: DATASOURCE,
    render: h => h(cell)
})