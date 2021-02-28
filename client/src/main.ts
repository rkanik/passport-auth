import App from './App.vue'
import router from './router'
import store from './store'
import components from './components'
import { _serverBase } from './consts'

// Stylesheets
import './assets/css/tailwind.css'

// Pwa
import './registerServiceWorker'

// Creating app
import { createApp } from 'vue'
const app = createApp(App)

// Registering global components
components.register(app)

// Using plugins
app.use(store)
app.use(router)

// Mounting app
app.mount('#app')

console.log('Mode		:', process.env.NODE_ENV)
console.log('Server 		:', _serverBase)