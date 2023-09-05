import * as actions from './types.js';

export const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

export const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case actions.LOGIN:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				isAuth: true,
				name: action.payload.name,
				email: action.payload.email,
				token: action.payload.token,
				role: '',
			};
		case actions.LOGOUT_USER:
			localStorage.clear();
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
				role: '',
			};
		case actions.GET_CURRENT_USER:
			return {
				...state,
				isAuth: true,
				name: action.payload.name,
				email: action.payload.email,
				role: action.payload.role,
			};
		default:
			return state;
	}
};
