import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';

const appInitialState = {
	user: {
		isAuth: false,
		name: '',
		email: '',
		token: '',
	},
	courses: [],
	authors: [],
};

const store = createStore(
	rootReducer,
	appInitialState,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
