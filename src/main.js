import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'

// .envからAPIのBASE_URLを読み込む
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

const app = createApp(App)
app.use(router)
app.mount('#app')
