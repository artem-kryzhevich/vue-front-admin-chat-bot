import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from "axios";
import VueAxios from 'vue-axios';

import _ from 'lodash'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import * as icons from '@coreui/icons';
//import { iconsSet as icons } from '@/assets/icons'

import CoreuiVueCharts from '@coreui/vue-chartjs'

import Paginate from "vuejs-paginate-next";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import moment from 'moment';
import setupInterceptors from "@/services/setupInterceptors";
moment.locale('ru');

store.axios = axios;

setupInterceptors(store);
const app = createApp(App)
app.use(store)
app.use(router)
app.use(CoreuiVue)
app.use(VueAxios, axios)
app.config.globalProperties.$moment = moment;
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.use(CoreuiVueCharts)
app.component('paginate', Paginate)
app.use(VueSweetalert2);

app.config.globalProperties.$_ = _;

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
