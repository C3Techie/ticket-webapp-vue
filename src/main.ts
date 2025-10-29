import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/globals.css'
import inViewDirective from './directives/inView'

const app = createApp(App)
app.use(router)
app.directive('in-view', inViewDirective)
app.mount('#app')