import React from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import Cookies from 'universal-cookie';
import ReactLoading from 'react-loading';
import { v4 as uuidv4 } from 'uuid';
import qs from 'querystring';
import * as Constant from '../../utility/Constant';
import {helpers} from '../../utility/Helpers';
var jwtDecode = require('jwt-decode');


class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
        var me = this;
        me.setcookie(Constant.cookie.realm, 'NorthWind');
        me.setcookie(Constant.cookie.client_id, 'northwind_client');
        me.setcookie(Constant.cookie.client_secret, '6fc4af9e-93ee-4fbd-aa9b-51e0841bb030');
        me.setcookie(Constant.cookie.redirect_uri, 'http://localhost:3002/callback');
    }
    render() {
        var me = this;
        return (
            <React.Fragment></React.Fragment>
        );
    }
    showToastMessage(message, type) {
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
    convertMonthDate(value){
        if(!value || value.toString().length>1){
            return value;
        }
        value ="0"+value;
        return value;
    }
    getDateFromAspNetFormat(date) {
        const re = /-?\d+/;
        const m = re.exec(date);
        return parseInt(m[0], 10);
    }
    formatDateJSToServer(date) {
        return helpers.formatDateJSToServer(date);
    }
    formatDateServerToJS(str) {
        return helpers.formatDateServerToJS(str);
    }
    toVNDFormat(value) {
        var me = this;
        if (value) {
            return value.toLocaleString('en-US');
        }
        return ""
    }
    login() {
        var me = this;
        const uuidValue = me.getnewid();
        me.setcookie('stateSession', uuidValue, { path: '/' });
        const client_id = me.getcookie(Constant.cookie.client_id);
        const redirect_uri = me.getcookie(Constant.cookie.redirect_uri);
        const realm = me.getrealm();
        const authUri = me.format(Constant.sso.authUri, realm);
        const urlAuthen = authUri + "?client_id=" + client_id + "&display=page&locale=en&redirect_uri=" + encodeURIComponent(redirect_uri) + "&response_type=code&scope=openid&state=" + uuidValue;
        window.location = urlAuthen;
    }
    logout() {
        var me = this;
        const realm = me.getrealm();

        const requestBody = {
            client_id: me.getcookie(Constant.cookie.client_id),
            client_secret: me.getcookie(Constant.cookie.client_secret),
            refresh_token: me.getcookie(Constant.cookie.refresh_token)
        }
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        me.setcookie(Constant.cookie.access_token, '', { path: '/' });
        me.setcookie(Constant.cookie.refresh_token, '', { path: '/' });
        me.setcookie(Constant.cookie.id_token, '', { path: '/' });
        me.setcookie(Constant.cookie.token_type, '', { path: '/' });
        const url = me.format(Constant.sso.logoutUri, realm);
        me.apipost(url, me.stringify(requestBody), config)
            .then((result) => {
                me.setState(
                    {
                        isAuthenticate: false,
                        userName: '',
                        firstname: '',
                        lastname: '',
                        useRefresh_Token: false,
                        isloading: true
                    });
            })
            .catch((err) => {
                console.log(err);
            })
    }
    unAuthorization(mustlogin) {
        var me = this;
        if (mustlogin) {
            me.login();
        }
        else {
            window.location = Constant.clients.dashboard
        }
    }
    apicall(fn) {
        var me = this;
        fn();
        // const refresh_token= me.getcookie(Constant.cookie.refresh_token);
        // const access_token= me.getcookie(Constant.cookie.access_token);
        // if(!access_token||!refresh_token){
        //     me.unAuthorization(false);
        //     return;
        // }
        // const requestBody = {
        //     client_id: me.getcookie(Constant.cookie.client_id),
        //     client_secret: me.getcookie(Constant.cookie.client_secret),
        //     refresh_token: refresh_token,
        //     grant_type: 'refresh_token'
        // }
        // const config = {
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //     }
        // }
        // var url = me.format(Constant.sso.accessTokenUri,me.getrealm());
        // me.apipost(url, me.stringify(requestBody), config)
        // .then((result) => {
        //     if(result.status==200 && result.data)
        //     {
        //         me.setcookie(Constant.cookie.access_token, result.data.access_token , { path: '/' });
        //         me.setcookie(Constant.cookie.refresh_token, result.data.refresh_token , { path: '/' });
        //         me.setcookie(Constant.cookie.id_token, result.data.id_token , { path: '/' });
        //         me.setcookie(Constant.cookie.token_type, result.data.token_type , { path: '/' });
        //         fn();
        //     }
        // })
        // .catch((err) => {
        //     me.unAuthorization(true);
        // })
    }
    apiget(url, config) {
        if (!config) {
            config = this.configHeader()
        }
        return axios.get(url, config);
    }
    apipost(url, data, config) {
        if (!config) {
            config = this.configHeader()
        }
        return axios.post(url, data, config);
    }
    apiput(url, data, config) {
        if (!config) {
            config = this.configHeader()
        }
        return axios.put(url, data, config);
    }
    apidelete(url, config) {
        if (!config) {
            config = this.configHeader()
        }
        return axios.delete(url, config);
    }
    format(text, ...args) {
        return text.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    }
    //lấy location của điểm triển khai
    getLocationCode() {
        var me = this;
        var result = me.getcookie(Constant.cookie.locationCode);
        if (!result) {
            result = 369;
        }
        return result;
    }
    configHeader() {
        return {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'API_KEY': 'API_KEY'
            }
        }
    }
    getcookie(name) {
        const cookies = new Cookies();
        return cookies.get(name);
    }
    setcookie(name, value, options) {
        const cookies = new Cookies();
        cookies.set(name, value, options)
    }
    getReactLoading(props) {
        return <ReactLoading {...props} />
    }
    getnewid() {
        return new uuidv4();
    }
    stringify(obj) {
        return qs.stringify(obj);
    }
    getusername() {
        const cookies = new Cookies();
        var accesstoken = cookies.get(Constant.cookie.access_token);
        var objtoken = accesstoken ? jwtDecode(accesstoken) : '';
        if (!accesstoken || !objtoken) {
            return "admin";
        }
        return objtoken.preferred_username;
    }
    getrealm() {
        var me = this;
        var result = me.getcookie(Constant.cookie.realm);
        if (!result) {
            result = "CMCLIS-NINH_BINH";
        }
        return result;
    }
}
export default BaseComponent;