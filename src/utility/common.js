import React from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'universal-cookie';
import ReactLoading from 'react-loading';
import { v4 as uuidv4 } from 'uuid';
import qs from 'querystring';
import * as Constant from './Constant';
import {helpers} from './Helpers';
var jwtDecode = require('jwt-decode');

export function getDefaultHeader() {
    return {
        headers: {
            'Content-Type': 'application/json'
        }
    };
}
export function showToastMessage(message, type) {
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
export function convertMonthDate(value){
    if(!value || value.toString().length>1){
        return value;
    }
    value ="0"+value;
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
    return new uuidv4();
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
export function getAPIUrl(){
    return "http://localhost:51602";
}