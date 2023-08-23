import { combineReducers } from '@reduxjs/toolkit';

import { coursesReducer } from './courses/reducer.js';

const rootReducer = combineReducers({
	courses: coursesReducer,
});

export default rootReducer;
