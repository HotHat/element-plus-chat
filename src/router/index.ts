
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
				path: '/user',
				name: 'User',
				meta: {
					title: '会员管理'
				},
				children: [
					{
						path: '/user/list',
						name: 'UserList',
						component: () => import('~/views/user/list.vue'),
						meta: {
							title: '会员列表'
						}
					},
				]
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

router.beforeEach(async (to, from) => {
	let user = localStorage.getItem('userInfo')
  if (
    // make sure the user is authenticated
    !user &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'Login'
  ) {

    // redirect the user to the login page
    return { name: 'Login' }
  }
})

export default router