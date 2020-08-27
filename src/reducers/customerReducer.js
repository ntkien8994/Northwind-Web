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
    activeFirstRow: false,

    loadingDetail: false,
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
            result.data = action.data.Data;
            result.isloading = false;
            result.isbusy = false;
            result.pagination = action.pagination;
            result.searchObject = action.searchObject;
            result.activeFirstRow=true;
            break;
        case Constant.CustomerAction.SHOW_FORM:
            result.loadingDetail = true;
            result.showDetail = true;
            result.param = action.param;
            result.activeFirstRow=false;
            break;
        case Constant.CustomerAction.CLOSE_FORM:
            result.showDetail = false;
            result.param = action.param;
            result.activeFirstRow=false;
            break;
    }
    return result;
}