import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import api from "../../api/community";

function* fetchBoardList(action) {
	try {
		const result = yield call(api.fetch);

		yield put({ type: "FETCH_SUCCEEDED_BOARDLIST", payload: result.data });
		console.log(result.data);
	} catch (e) {
		alert(e.message);
	}
}

function* findKeywordMatchData(action) {
	try {
		console.log('--- api 호출 ---');
		const result = yield call(api.findKeywordData, action.payload);
		console.log('--- search api 호출 결과 리턴---');
		console.log(result.data);
		yield put({ type: "FIND_SUCCEEDED_POST", payload: result.data });
	} catch (e) {
		alert(e.message);
	}
}

function* communitySaga() {
	yield takeEvery("FIND_POST", findKeywordMatchData);
	yield takeLatest("FETCH_BOARDLSIT", fetchBoardList);
}
export default communitySaga;