import { fork } from "@redux-saga/core/effects";
import commentSaga from "./comment";
import communitySaga from "./community";
import onetooneSaga from "./onetoone";

export default function* rootSaga() {
	yield fork(onetooneSaga);
	yield fork(communitySaga);
	yield fork(commentSaga);
}
