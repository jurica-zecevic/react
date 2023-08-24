import * as actions from './types.js';

const initialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.SET_USER_LOGIN:
			return {
				...state,
				isAuth: true,
				name: action.payload.name,
				email: action.payload.email,
				token: action.payload.token,
			};
		case actions.SET_USER_LOGOUT:
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
