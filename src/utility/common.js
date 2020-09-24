import React from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'universal-cookie';
import ReactLoading from 'react-loading';
import { v4 as uuidv4 } from 'uuid';
import qs from 'querystring';
import * as Constant from './Constant';
import { helpers } from './Helpers';
var jwtDecode = require('jwt-decode');

var numberFormat = Intl.NumberFormat('en-US');
export function getDefaultHeader() {
    return {
        headers: {
            'Content-Type': 'application/json'
        }
    };
}
export function showToastMessage(message, type = 'success') {
    toast.configure({
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
        draggable: false
    });
    switch (type) {
        case "success":
            toast.success(message);
            break;
        case "error":
            toast.error(message);
            break;
    }
}
export function convertMonthDate(value) {
    if (!value || value.toString().length > 1) {
        return value;
    }
    value = "0" + value;
    return value;
}
export function getDateFromAspNetFormat(date) {
    const re = /-?\d+/;
    const m = re.exec(date);
    return parseInt(m[0], 10);
}
export function formatDateJSToServer(date) {
    return helpers.formatDateJSToServer(date);
}
export function formatDateServerToJS(str) {
    return helpers.formatDateServerToJS(str);
}
export function toVNDFormat(value) {
    var me = this;
    if (value) {
        return value.toLocaleString('en-US');
    }
    return ""
}

export function format(text, ...args) {
    return text.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match
            ;
    });
}
//lấy location của điểm triển khai
export function getLocationCode() {
    var result = getcookie(Constant.cookie.locationCode);
    if (!result) {
        result = 369;
    }
    return result;
}

export function getcookie(name) {
    const cookies = new Cookies();
    return cookies.get(name);
}
export function setcookie(name, value, options) {
    const cookies = new Cookies();
    cookies.set(name, value, options)
}
export function getReactLoading(props) {
    return <ReactLoading {...props} />
}
export function getnewid() {
    return uuidv4();
}
export function stringify(obj) {
    return qs.stringify(obj);
}
export function getusername() {
    const cookies = new Cookies();
    var accesstoken = cookies.get(Constant.cookie.access_token);
    var objtoken = accesstoken ? jwtDecode(accesstoken) : '';
    if (!accesstoken || !objtoken) {
        return "admin";
    }
    return objtoken.preferred_username;
}
export function getrealm() {
    var result = getcookie(Constant.cookie.realm);
    if (!result) {
        result = "CMCLIS-NINH_BINH";
    }
    return result;
}
export function getAPIUrl() {
    return "http://localhost:51602";
}
//description: Hàm thực hiện build điều kiện lọc
//----------------------------------------------
//created by: ntkien 
//created date: 03.09.2020
export function getFilter(filters, cols) {
    var me = this;
    var results = [];
    if (filters) {
        if (cols && cols.length > 0) {
            cols.map((item, index) => {
                var vals = filters[item.dataIndex];
                if (vals && vals.length > 0) {
                    var obj = vals[0];
                    var Operation = obj.operation;
                    var ColumnType = obj.dataType;
                    var ColumnName = item.dataIndex;
                    var Value = obj.filterVal;
                    var Value2 = null;
                    if (obj.filterVal && item.dataType == Constant.valueType.datetime) {
                        var d = obj.filterVal.toDate();
                        Value = format('{0}-{1}-{2} 00:00:00', d.getFullYear(), convertMonthDate(d.getMonth() + 1), convertMonthDate(d.getDate()));
                        //nếu so sánh bằng
                        if (Operation == Constant.operationValues.equals) {
                            Value2 = format('{0}-{1}-{2} 23:59:59', d.getFullYear(), convertMonthDate(d.getMonth() + 1), convertMonthDate(d.getDate()));
                            Operation = Constant.operationValues.bettween; //toán tử bettwen
                        }
                        //nếu là nhỏ hơn bằng hoặc lớn hơn 
                        else if (Operation == Constant.operationValues.lessThanEquals || Operation == Constant.operationValues.greateThan) {
                            Value = format('{0}-{1}-{2} 23:59:59', d.getFullYear(), convertMonthDate(d.getMonth() + 1), convertMonthDate(d.getDate()));
                        }
                    }
                    else if (obj.filterVal && item.dataType == Constant.valueType.daterange) {
                        var d = obj.filterVal[0].toDate();
                        var d2 = obj.filterVal[1].toDate();
                        Value = format('{0}-{1}-{2} 00:00:00', d.getFullYear(), convertMonthDate(d.getMonth() + 1), convertMonthDate(d.getDate()));
                        Value2 = format('{0}-{1}-{2} 23:59:59', d2.getFullYear(), convertMonthDate(d2.getMonth() + 1), convertMonthDate(d2.getDate()));
                        ColumnType = Constant.valueType.datetime;
                        Operation = Constant.operationValues.bettween; //toán tử bettwen
                    }

                    results.push(
                        {
                            ColumnName,
                            Value,
                            Value2,
                            Operation: JSON.parse(Operation),
                            ColumnType: JSON.parse(ColumnType)
                        }
                    );
                }
            });
        }
    }
    return results;
}

//description: Hàm convert kiểu số
//--------------------------------
//created by: ntkien 
//created date: 10.09.2020
export function formatNumber(value) {
    var result = null;
    if (value != null && value != undefined) {
        result = numberFormat.format(value);
    }
    return result;
}

//description: Hàm convert kiểu %
//--------------------------------
//created by: ntkien 
//created date: 10.09.2020
export function formatPercent(value) {
    var result = null;
    if (value != null && value != undefined) {
        result = numberFormat.format(value)+"%";
    }
    return result;
}

//description: Hàm lấy rowid lớn nhất
//--------------------------------
//created by: ntkien 
//created date: 10.09.2020
export function getMaxId(arr, key) {
    var maxid = 0;
    if (arr) {
        arr.map(item => {
            if (item[key] > maxid) {
                maxid = item[key];
            }
        });
    }
    return maxid + 1;
}