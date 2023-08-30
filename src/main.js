import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js'
import {BootstrapVueNext} from 'bootstrap-vue-next'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far, fab)

createApp(App)
.use(router)
.use(store)
.use(BootstrapVueNext)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
