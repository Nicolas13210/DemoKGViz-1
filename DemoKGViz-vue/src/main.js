import {createApp} from 'vue'
import App from './App.vue'
import FloatingVue from 'floating-vue'
import {store} from "@/store"

/* floating-vue configuration */
// Display the tooltip quickly (50ms instead of 200ms)
FloatingVue.options.themes.tooltip.delay.show = 50;

const app = createApp(App)
app.use(store)
app.use(FloatingVue)
app.mount('#app')
