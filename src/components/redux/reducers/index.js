import { combineReducers } from "redux";
import onetoone from "./onetoone";
import community from './community';
import comment from './comment';
import etc from './etc';

const rootReducer = combineReducers({
	onetoone,
	community,
	comment,
	etc,
});

export default rootReducer;
