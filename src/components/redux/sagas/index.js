import { fork } from "@redux-saga/core/effects";
import onetooneSaga from "./onetoone";

export default function* rootSaga() {
  yield fork(onetooneSaga);
}
