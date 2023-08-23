import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
import rootReducer from './rootReducer';
import { coursesInitialState } from './courses/reducer.js';

const appInitialState = {
	courses: coursesInitialState,
};

const store = createStore(rootReducer, appInitialState, composeWithDevTools());

export default store;
