import { call } from '@redux-saga/core/effects';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import api from '../../api/comment';

function* fetchCommentList(action) {
	try {
		const result = yield call(api.fetch);
		console.log(result.data);
		const formatedData = result.data.map(comment => { return { no: comment.no, content: comment.content, pwd: comment.pwd, postNo: comment.board.id } })
		// console.log(formatedData);
		yield put({ type: "FETCH_COMMENTLIST_SUCCEEDED", payload: formatedData });
	} catch (e) {
		alert(e.message);
	}

}

function* addComment(action) {
	try {
		//{ postNo, content: commentRef.current.value, pwd: pwdInput }
		const result = yield call(api.add, action.payload);
		const addedComment = { no: result.data.no, ...action.payload };
		yield put({ type: "ADD_COMMENT_SUCCEEDED", payload: addedComment });

	} catch (e) {
		alert(e.message);
	}
}

function* modifyComment(action) {
	try {
		console.log('---수정 test---');
		console.log(action.payload);
		const result = yield call(api.modify, action.payload);
		console.log(result.data);
		const modifiedComment = { no: result.data.no, content: result.data.content, pwd: result.data.pwd, postNo: result.data.board.id };
		yield put({ type: "MODIFY_SUCCEDED_COMMENT", payload: modifiedComment });
	} catch (e) {
		alert(e.message);
	}
}

function* deleteComment(action) {
	try {
		yield call(api.delete, action.payload);
		yield put({ type: "DELETE_SUCCEEDED_COMMENT", payload: action.payload });
	} catch (e) {
		alert(e.message);
	}
}

function* commentSaga() {
	yield takeEvery("ADD_COMMENT", addComment);
	yield takeEvery("MODIFY_COMMENT", modifyComment);
	yield takeEvery("DELETE_COMMENT", deleteComment);
	yield takeLatest("FETCH_COMMENTLIST", fetchCommentList);
}
export default commentSaga;