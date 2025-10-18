export const RoutesReliaBESS = {
	home: '/dashboard',
	login: '/auth/login',
	register: '/auth/register',
	// passwordRecovery: '/auth/password-recovery',
	// forgotPassword: '/auth/forgot-password',
	// resetPassword: '/auth/reset-password',

	batertSizing: {
		root: '/dashboard/batery-sizing',
        // form: '/dashboard/batery-sizing/forms/[baterySizingId]',
        form: '/dashboard/batery-sizing/forms',
	},
	tools: {
		root: '/dashboard/tools',
        lifespan: '/dashboard/tools/lifespan',
        peakShaving: '/dashboard/tools/peak-shaving',
	},
}


export const Routes = RoutesReliaBESS;