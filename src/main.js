import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from "axios";
import VueAxios from 'vue-axios';

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import * as icons from '@coreui/icons';
//import { iconsSet as icons } from '@/assets/icons'

import Paginate from "vuejs-paginate-next";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

store.axios = axios;

const app = createApp(App)
app.use(store)
app.use(router)
app.use(CoreuiVue)
app.use(VueAxios, axios)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('paginate', Paginate)
app.use(VueSweetalert2);

window.Swal =  app.config.globalProperties.$swal;
window.Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

app.mount('#app')
