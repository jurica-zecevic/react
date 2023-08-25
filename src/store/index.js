import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';

import { coursesInitialState } from './courses/reducer';
import { authorsInitialState } from './authors/reducer';
import { userInitialState } from './user/reducer';

const appInitialState = {
	user: userInitialState,
	courses: coursesInitialState,
	authors: authorsInitialState,
};

const store = createStore(
	rootReducer,
	appInitialState,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
