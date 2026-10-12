import { createApp } from 'vue'
import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/manrope/800.css'
import '@fontsource/manrope/vietnamese-800.css'
import './assets/styles.css'
import App from './App.vue'
import router from './router'
createApp(App).use(router).mount('#app')
