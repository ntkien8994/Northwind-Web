
import {fork} from "redux-saga/effects";
import customerSaga from './customerSaga';


export default function* rootSaga() {
    yield fork(customerSaga)
  }