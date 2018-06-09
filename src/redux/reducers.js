import searchReducer from "./search/reducer";
import PlayViewReducer from "./PlayView/reducer";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	searchReducer,
	PlayViewReducer
});

export default rootReducer;
