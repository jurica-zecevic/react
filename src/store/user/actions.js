import * as actions from './types.js';

export const setUserLoginAction = (name, email, token) => ({
	type: actions.LOGIN,
	payload: { name, email, token },
});

export const setUserLogout = () => ({
	type: actions.LOGOUT,
});
