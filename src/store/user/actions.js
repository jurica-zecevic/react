import * as actions from './types.js';

export const loginUserAction = (payload) => ({
	type: actions.LOGIN,
	payload,
});

export const logoutUserAction = () => ({
	type: actions.LOGOUT_USER,
});

export const getCurrentUser = (payload) => {
	return {
		type: actions.GET_CURRENT_USER,
		payload,
	};
};
