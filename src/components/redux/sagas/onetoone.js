import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";

import api from "../../api/onetoone";

function* addOnetoone(action) {
  console.log("--sagas: add Onetoone --");
  console.log(action);

  try {
    const result = yield call(api.add, action.payload);
    console.log(result);

    const { size } = yield select((state) => state.onetoone);

    const resultFetched = yield call(api.fetchPaging, 0, size);
    console.log(resultFetched);

    yield put({
      type: "FETCH_ONETOONELIST_PAGING_SUCCEEDED",
      payload: resultFetched.data,
    });
  } catch (e) {
    alert(e.message);
  }
}

function* fetchOnetooneListPaging(action) {
  console.log("--sagas: fetch OnetooneList Paging --");
  console.log(action);

  try {
    const { page, size } = yield select((state) => state.onetoone);

    const result = yield call(
      api.fetchPaging,
      action.payload ? action.payload.page : page,
      action.payload ? action.payload.size : size
    );
    console.log(result);

    yield put({
      type: "FETCH_ONETOONELIST_PAGING_SUCCEEDED",
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

    const { page, size } = yield select((state) => state.onetoone);
    const resultFetched = yield call(api.fetchPaging, page, size);

    yield put({
      type: "FETCH_ONETOONELIST_PAGING_SUCCEEDED",
      payload: resultFetched.data,
    });
  } catch (e) {
    alert(e.message);
  }
}

function* modifyOnetoone(action) {
  console.log("--sagas: modify ONETOONE --");
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
  yield takeLatest("FETCH_ONETOONELIST_PAGING", fetchOnetooneListPaging);
}

export default onetooneSaga;
