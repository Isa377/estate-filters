import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from 'vuetify';
import { createRouter, createWebHistory } from 'vue-router';
import Filters from './components/FiltersComponent.vue';
import 'vuetify/styles';

const routes = [{ path: '/', component: Filters }];
const router = createRouter({
  history: createWebHistory(),
  routes,
});


const myCustomTheme = {
  dark: false,
  colors: {
    primary: '#46a3a3',
  },
}

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme: myCustomTheme,
    },
  },
})

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount('#app');
