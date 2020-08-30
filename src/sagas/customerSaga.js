import { takeEvery, put, call } from 'redux-saga/effects';
import * as Constant from '../utility/Constant';
import { doAction } from '../actions/action';
import * as api from '../apis/customerapi';

function* customerSaga() {
    yield takeEvery(Constant.CustomerAction.LOAD_DATA, loadData)
    yield takeEvery(Constant.CustomerAction.LOAD_INFO, loadInfo)
}

function* loadData(action) {
    var { pagination } = action.param;
    var skip = (pagination.current - 1) * pagination.pageSize;
    var param = {
        Skip: skip,
        Take: pagination.pageSize,
        OrderInfos: action.param.order,
        WhereInfos: action.param.where
    }
    var result = yield call(() => api.paging(param));

    var data = JSON.parse(result.data.data);
    pagination.total = data.TotalCount;
    yield put(doAction(
        Constant.CustomerAction.LOAD_COMPLETE,
        {
            data,
            pagination,
            searchObject: action.searchObject
        }));
}

function* loadInfo(action) {
    var { param } = action;
    var id = (param && param.editMode == Constant.editMode.add) ? "00000000-0000-0000-0000-000000000000" : param.id;
    var result = yield call(() => api.getById(id));

    var data = JSON.parse(result.data.data);
    yield put(doAction(Constant.CustomerAction.LOAD_INFO_COMPLETE, data));
}

export default customerSaga;

