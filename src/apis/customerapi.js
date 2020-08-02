import axios from 'axios';
import * as common from '../utility/common';

export function paging(data) {
    var config = common.getDefaultHeader();
    return axios.post("http://localhost:51602/base/customer/paging", data,config);
}