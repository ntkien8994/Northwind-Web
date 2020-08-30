import * as Constant from '../utility/Constant';
const initState = {
    data: [],
    isloading: false,
    isbusy: false,
    pagination: {
        current: 1,
        pageSize: 25,
        total: 0
    },
    searchObject: null,
    entity: 'Customer',
    primaryKey: 'CustomerId',
    activeFirstRow: false,
    pageName: "Khách hàng",

    id: '',
    loadingDetailForm: false,
    showDetail: false,
    masterData: null,
    editMode: Constant.editMode.none
}
export function customers(state = initState, action) {
    var result = { ...state };
    switch (action.type) {
        case Constant.CustomerAction.LOAD_DATA:
            result.isloading = action.param.isloading;
            result.isbusy = action.param.isbusy;
            break;
        case Constant.CustomerAction.LOAD_COMPLETE:
            var datas = action.param.data.Data;
            result.data = datas;
            result.isloading = false;
            result.isbusy = false;
            result.pagination = action.param.pagination;
            result.searchObject = action.param.searchObject;
            result.id = (datas && datas.length > 0) ? datas[0][result.primaryKey]:'';
            result.activeFirstRow = true;
            break;
        case Constant.CustomerAction.SHOW_FORM:
            result.showDetail = true;
            result.editMode = action.param.editMode;
            result.masterData=null;
            result.id =action.param.id;
            result.activeFirstRow = false;
            break;
        case Constant.CustomerAction.CLOSE_FORM:
            result.showDetail = false;
            result.activeFirstRow = false;
            break;
        case Constant.CustomerAction.LOAD_INFO:
            result.loadingDetailForm = true;
            result.activeFirstRow = false;
            break;
        case Constant.CustomerAction.LOAD_INFO_COMPLETE:
            result.loadingDetailForm = false;
            result.activeFirstRow = false;
            result.masterData = action.param;
            break;
    }
    return result;
}