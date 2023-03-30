
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
				path: '/agent',
				name: 'Agent',
				meta: {
					title: '代理管理'
				},
				children: [
					{
						path: '/agent/site',
						name: 'AgentSite',
						component: () => import('~/views/user/list.vue'),
						meta: {
							title: '代理站点'
						}
					},
					{
						path: '/agent/list',
						name: 'AgentList',
						component: () => import('~/views/user/list.vue'),
						meta: {
							title: '代理列表'
						}
					},
				]
			},
			{
				path: '/post',
				name: 'Post',
				meta: {
					title: '文章管理'
				},
				children: [
					{
						path: '/post/category',
						name: 'PostCategory',
						component: () => import('~/views/post/category.vue'),
						meta: {
							title: '文章分类'
						}
					},
					{
						path: '/post/list',
						name: 'PostList',
						component: () => import('~/views/user/list.vue'),
						meta: {
							title: '文章列表'
						}
					},
				]
			},
			{
				path: '/system',
				name: 'System',
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