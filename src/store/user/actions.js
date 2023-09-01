import * as actions from './types.js';

export const loginUserAction = (payload) => ({
	type: actions.LOGIN,
	payload,
});

export const logoutUserAction = () => ({
	type: actions.LOGOUT_USER,
});

export const setUserAction = (payload) => {
	return {
		type: actions.SET_USER,
		payload,
	};
};
