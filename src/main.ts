import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { setupNaive } from '@/plugins'

import 'highlight.js/styles/idea.css'
async function bootstrap(){

    const app = createApp(App)
    //注册naive-ui全局组件
    setupNaive(app)

    app.use(router)

    app.use(createPinia())

    app.mount('#app')
}

void bootstrap()
