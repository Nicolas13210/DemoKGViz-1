import {createApp} from 'vue'
import App from './App.vue'
import FloatingVue from 'floating-vue'
import {store} from "@/store"
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {aliases, mdi} from 'vuetify/iconsets/mdi'
import colors from 'vuetify/lib/util/colors'

/* floating-vue configuration */
// Display the tooltip quickly (50ms instead of 200ms)
FloatingVue.options.themes.tooltip.delay.show = 50;

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        }
    },
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: colors.indigo.darken1,
                    secondary: colors.indigo.lighten1
                }
            },
        },
    },

})

const app = createApp(App)
app.use(store)
app.use(FloatingVue)
app.use(vuetify)
app.mount('#app')
