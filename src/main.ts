import Axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 适配桌面端模拟移动端手势
import '@vant/touch-emulator';

// Axios配置
Axios.defaults.baseURL = 'http://localhost:8080'
Axios.defaults.withCredentials = true

createApp(App).use(router).mount('#app')
