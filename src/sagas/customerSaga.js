import { takeEvery, put, call } from 'redux-saga/effects';
import * as Constant from '../utility/Constant';
import { loadComplete } from '../actions/customerAction';
import * as api from '../apis/customerapi';

function* customerSaga() {
    yield takeEvery(Constant.CustomerAction.LOAD_DATA, loadData);
}

function* loadData(action) {
    debugger
    var { pagination } = action.param;
    var skip = pagination.current * pagination.pageSize;
    var param = {
        Skip: skip,
        Take: pagination.pageSize,
        OrderInfos: action.param.order,
        WhereInfos: action.param.where
    }
    var result = yield call(() => api.paging(param));

    var data = JSON.parse(result.data.data);
    debugger
    yield put(loadComplete(data));
}


export default customerSaga;

