import * as actions from './types.js';

export const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: localStorage.getItem('token') || '',
};

export const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case actions.LOGIN:
			return {
				...state,
				isAuth: true,
				name: action.payload.name,
				email: action.payload.email,
				token: action.payload.token,
			};
		case actions.LOGOUT:
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
			};
		default:
			return state;
	}
};
