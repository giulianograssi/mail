import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import Setup from './views/Setup';

Vue.use(Router)

export default new Router({
	// Disabled history mode to enable having routes on frontend
	// that are not defined in routes.php e.g. /setup
	// mode: 'history',
	base: OC.generateUrl('/apps/mail/'),
	linkActiveClass: 'active',
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/accounts/:accountId/folders/:folderId',
			name: 'folder',
			component: Home
		},
		{
			path: '/setup',
			name: 'setup',
			component: Setup
		}
	]
})
