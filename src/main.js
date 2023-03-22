import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import store from './store/index'

// import Antd from 'ant-design-vue'

// import 'ant-design-vue/dist/antd.css'
import './main.css'

const app = createApp(App)
app.use(store).mount('#app')
// new Vue({
//   store,
//   render: (h) => h(App),
// }).$mount('#app')
// app.use(Antd).mount('#app');
