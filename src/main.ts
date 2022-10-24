import 'normalize.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { setupNaive } from '@/plugins';

import 'highlight.js/styles/idea.css';

const bootsrap = () => {
  const app = createApp(App)

  setupNaive(app)
  app.use(router)
  app.use(createPinia())
  app.mount('#app')
}

bootsrap();
