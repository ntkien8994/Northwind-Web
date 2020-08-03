import * as Constant from '../utility/Constant';
const initState = {
    data: [],
    isloading: false,
    isbusy: false,
    pagination: {
        current: 1,
        pageSize: 12,
        total: 0
    },
    searchObject:null,
    entity: "Customer"
}
export function customers(state = initState, action) {
    var result = { ...state };
    switch (action.type) {
        case Constant.CustomerAction.LOAD_DATA:
            result.isloading = action.param.isloading;
            result.isbusy = action.param.isbusy;
            break;
        case Constant.CustomerAction.LOAD_COMPLETE:
            debugger
            result.data = action.data.Data;
            result.isloading = false;
            result.isbusy = false;
            result.pagination = action.pagination;
            result.searchObject = action.searchObject
            break;
    }
    return result;
}