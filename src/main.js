import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUsers)

//Vue.component('font-awesome-icon', FontAwesomeIcon)

// .envからAPIのBASE_URLを読み込む

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(store)
// app.component("fa", FontAwesome)
app.mount('#app')