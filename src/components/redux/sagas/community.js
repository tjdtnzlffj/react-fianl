import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import api from "../../api/community";

function* addBoard(action) {
  console.log("--sagas: add Board --");
  console.log(action);

  try {
    const result = yield call(api.add, action.payload);
    console.log(result);

    yield put({
      type: "ADD_BOARD_SUCCEEDED",
      payload: result.data,
    });
  } catch (e) {
    alert(e.message);
  }
}

function* fetchBoardList(action) {
  try {
    const result = yield call(api.fetch);

    yield put({ type: "FETCH_SUCCEEDED_BOARDLIST", payload: result.data });
    console.log(result.data);
  } catch (e) {
    alert(e.message);
  }
}

function* removeBoard(action) {
  console.log("--sagas: remove Board --");
  console.log(action);

  try {
    const result = yield call(api.remove, action.payload);
    console.log(result);

    yield put({
      type: "REMOVE_BOARD_SUCCEEDED",
      payload: result.data,
    });
  } catch (e) {
    alert(e.message);
  }
}

function* findKeywordMatchData(action) {
  try {
    console.log("--- api 호출 ---");
    const result = yield call(api.findKeywordData, action.payload);
    console.log("--- search api 호출 결과 리턴---");
    console.log(result.data);
    yield put({ type: "FIND_SUCCEEDED_POST", payload: result.data });
  } catch (e) {
    alert(e.message);
  }
}

function* modifyBoard(action) {
  console.log("--sagas: modify Board --");
  console.log(action);

  try {
    const result = yield call(api.modify, action.payload);
    console.log(result);

    yield put({
      type: "MODIFY_BOARD_SUCCEEDED",
      payload: result.data,
    });
  } catch (e) {
    alert(e.message);
  }
}

function* communitySaga() {
  yield takeEvery("FIND_POST", findKeywordMatchData);
  yield takeEvery("ADD_BOARD", addBoard);
  yield takeEvery("REMOVE_BOARD", removeBoard);
  yield takeEvery("MODIFY_BOARD", modifyBoard);
  yield takeLatest("FETCH_BOARDLSIT", fetchBoardList);
}
export default communitySaga;
