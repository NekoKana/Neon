import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
// .envからAPIのBASE_URLを読み込む

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
