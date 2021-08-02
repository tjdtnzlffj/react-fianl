import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import api from "../../api/onetoone";

function* addOnetoone(action) {
  console.log("---saga: add onetoone---");
  console.log(action);
  const result = yield call(api.add, action.payload);
  console.log(result);
  yield put({
    type: "ADD_ONETOONE_SUCCEEDED",
    payload: { qna_num: result.data.qna_num, ...action.payload },
  });
}

function* fetchOnetooneList(action) {
  console.log("--sagas: fetch Contactlist  --");
  console.log(action);

  try {
    const result = yield call(api.fetchPaging);
    console.log(result);

    yield put({
      type: "FETCH_ONETOONELIST_SUCCEEDED",
      payload: result.data,
    });
  } catch (e) {
    alert(e.message);
  }
}

function* removeOnetoone(action) {
  console.log("--sagas: remove Onetoone --");
  console.log(action);

  try {
    const result = yield call(api.remove, action.payload);
    console.log(result);

    yield put({
      type: "REMOVE_ONETOONE_SUCCEEDED",
      payload: action.payload,
    });
  } catch (e) {
    alert(e.message);
  }
}

function* modifyOnetoone(action) {
  console.log("--sagas: modify Onetoone --");
  console.log(action);

  try {
    const result = yield call(api.modify, action.payload);
    console.log(result);

    yield put({
      type: "MODIFY_ONETOONE_SUCCEEDED",
      payload: result.data,
    });
  } catch (e) {
    alert(e.message);
  }
}

function* onetooneSaga() {
  yield takeEvery("ADD_ONETOONE", addOnetoone);
  yield takeEvery("REMOVE_ONETOONE", removeOnetoone);
  yield takeEvery("MODIFY_ONETOONE", modifyOnetoone);
  yield takeLatest("FETCH_ONETOONELIST_PAGING", fetchOnetooneList);
}

export default onetooneSaga;
