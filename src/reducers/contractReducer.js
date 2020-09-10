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
    entity: 'Contract',
    primaryKey: 'ContractId',
    activeFirstRow: false,
    pageName: "Hợp đồng",
    filters:null,
    sorters:null,

    id: '',
    currentItem:null,
    loadingDetailForm: false,
    showDetail: false,
    masterData: null,
    editMode: Constant.editMode.none,
    saveComplete: false,
    response:null,
    isMasterDetail: true
}
export function contracts(state = initState, action) {
    var result = { ...state };
    result.activeFirstRow = false;
    result.saveComplete = false;
    switch (action.type) {
        case Constant.ContractAction.LOAD_DATA:
            result.isloading = action.param.isloading;
            result.isbusy = action.param.isbusy;
            break;
        case Constant.ContractAction.LOAD_COMPLETE:
            var datas = action.param.data.Data;
            result.data = datas;
            result.isloading = false;
            result.isbusy = false;
            result.pagination = action.param.pagination;
            result.searchObject = action.param.searchObject;
            result.id = (datas && datas.length > 0) ? datas[0][result.primaryKey] : '';
            result.currentItem = (datas && datas.length > 0) ? datas[0]:null;
            result.activeFirstRow = true;
            break;
        case Constant.ContractAction.SHOW_FORM:
            result.showDetail = true;
            result.editMode = action.param.editMode;
            result.masterData = null;
            if (action.param.id) {
                result.id = action.param.id;
            }
            if (action.param.record) {
                result.currentItem = action.param.record;
            }
            break;
        case Constant.ContractAction.CLOSE_FORM:
            result.showDetail = false;
            break;
        case Constant.ContractAction.LOAD_INFO:
            result.loadingDetailForm = true;
            break;
        case Constant.ContractAction.LOAD_INFO_COMPLETE:
            result.loadingDetailForm = false;
            result.masterData = action.param;
            break;
        case Constant.ContractAction.SELECTED_CHANGE:
            result.id = action.param.record[result.primaryKey];
            result.currentItem = action.param.record;
            break;
        case Constant.ContractAction.SAVE_DATA:
            result.loadingDetailForm = true;
            break;
        case Constant.ContractAction.SAVE_DATA_COMPLETE:
            result.loadingDetailForm = false;
            result.showDetail = false;
            result.saveComplete = true;
            result.response = action.param.response;
            break;
    }
    return result;
}