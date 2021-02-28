import App from './App.vue'
import router from './router'
import store from './store'
import components from './components'

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
