import { createApp } from 'vue'
import {store, key} from './store'
import './style.css'
import App from './App.vue'

createApp(App).use(store, key).mount('#app')
