import * as actions from './types.js';

export const setUserLogin = (user) => ({
	type: actions.SET_USER_LOGIN,
	payload: user,
});

export const setUserLogout = () => ({
	type: actions.SET_USER_LOGOUT,
});
