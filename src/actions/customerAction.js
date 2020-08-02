import * as Constant from '../utility/Constant';
export function loadData(param){
    return {
        type:Constant.CustomerAction.LOAD_DATA,
        param
    }
}
export function loadComplete(data){
    return {
        type:Constant.CustomerAction.LOAD_COMPLETE,
        isloading: false,
        isbusy:false,
        data
    }
}