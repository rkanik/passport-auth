import {
	createRouter,
	createWebHistory,
	RouteRecordRaw
} from 'vue-router'

import DefaultLayout from '@/layouts/Default.vue'
import Profile from '@/views/Profile.vue'
import { layout, view } from '@/helpers'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		component: DefaultLayout,
		children: [
			{
				path: '',
				name: 'Profile',
				component: Profile
			}
		]
	},
	{
		path: '/signin',
		component: layout('AuthLayout'),
		children: [
			{
				path: '',
				name: 'Signin',
				component: view('Signin')
			}
		]
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
