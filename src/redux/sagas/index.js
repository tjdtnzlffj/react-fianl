import onetooneSaga from "./onetoone";
import { fork } from "@redux-saga/core/effects";

export default function* rootSaga() {
  yield fork(onetooneSaga);
}
