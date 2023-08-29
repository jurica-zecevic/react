import * as actions from './types.js';

export const loginUser = (payload) => ({
	type: actions.LOGIN,
	payload,
});

export const logoutUser = () => ({
	type: actions.LOGOUT,
});
