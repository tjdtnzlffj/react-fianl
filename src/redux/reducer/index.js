// rootReducer
// 하위 리듀서를 import
import { combineReducers } from "redux";
import onetoone from "./onetoone";

const rootReducer = combineReducers({
  onetoone,
});

export default rootReducer;
