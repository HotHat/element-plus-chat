
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';


const routeArr: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'Login',
		component: () => import('~/views/Login.vue')
	},
	{
		path: '/sign-up',
		name: 'SignUp',
		component: () => import('~/views/SignUp.vue')
	},
	{
		path: '/',
		name: 'View',
		redirect: '/home',
		component: () => import('~/views/View.vue'),
		meta:{
			title: '首页',
			path: '/home'
		},
		children: [
			{
				path: '/home',
				name: 'Home',
				component: () => import('~/views/Home.vue')
			},
			{
				path: '/chat',
				name: 'Chat',
				component: () => import('~/views/Chat.vue'),
				meta: {
					title: 'ChatGPT'
				}
			},
			{
				path: '/tools',
				name: 'Tools',
				redirect: '/form',
				meta: {
					title: '工具'
				},
				children: [
					{
						path: '/form',
						name: 'Form',
						component: () => import('~/views/tools/Form.vue'),
						meta: {
							title: '表单'
						}
					},
				]

			},
		]
	},


]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: routeArr
})

export default router