import * as actions from './types.js';

export const loginUser = (name, email, token) => ({
	type: actions.LOGIN,
	payload: { name, email, token },
});

export const logoutUser = () => ({
	type: actions.LOGOUT,
});
