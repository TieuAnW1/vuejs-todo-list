import { createApp } from 'vue';
import App from './App.vue';
import i18n from './i18n';
import store from './vueX/store';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { RiDeleteBinLine, BiXCircle, MdDownloaddoneRound } from 'oh-vue-icons/icons';

addIcons(RiDeleteBinLine, BiXCircle, MdDownloaddoneRound);

const app = createApp(App);
app.use(store);
app.use(i18n);
app.component('oh-vue-icon', OhVueIcon);
app.mount('#app');
