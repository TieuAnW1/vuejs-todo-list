import { createApp } from 'vue';
import App from './App.vue';
import i18n from './i18n';
import store from './vueX/store';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import Vue3ConfirmDialog from 'vue3-confirm-dialog';
import 'vue3-confirm-dialog/style';
import vClickOutside from 'click-outside-vue3';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { RiDeleteBinLine, BiXCircle, MdDownloaddoneRound, MdArrowdropdownOutlined, IoSearchOutline  } from 'oh-vue-icons/icons';

addIcons(RiDeleteBinLine, BiXCircle, MdDownloaddoneRound, MdArrowdropdownOutlined, IoSearchOutline );

const app = createApp(App);
app.use(VueToast);
app.use(store);
app.use(i18n);
app.use(Vue3ConfirmDialog);
app.use(vClickOutside);
app.component('oh-vue-icon', OhVueIcon);
app.mount('#app');
