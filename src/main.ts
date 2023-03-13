import { createApp } from "vue";
import App from "./App.vue";

import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';

// import "~/styles/element/index.scss";

// import ElementPlus from "element-plus";
// import all element css, uncommented next line
// import "element-plus/dist/index.css";

// or use cdn, uncomment cdn link in `index.html`

import "~/styles/index.scss";
import 'uno.css'

// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss"



const app = createApp(App);
// app.use(ElementPlus);

const routeArr: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'login',
		component: () => import('./views/Login.vue')
	},

	{
		path: '/chat',
		name: 'chat',
		component: () => import('./views/Chat.vue')
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: routeArr
})

app.use(router)

app.mount("#app");
