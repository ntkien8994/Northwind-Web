import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { Icon } from '@ant-design/compatible';
import GeneralForm from '../base/GeneralForm';
import { LoginOutlined } from '@ant-design/icons';

import * as Constant from '../../utility/Constant';
var jwtDecode = require('jwt-decode');
class Header extends GeneralForm {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            firstname: '',
            lastname: '',
            isAuthenticate: false,
            isbusy: false,
        }
    }

    checkToken() {
        var me = this;
        const refresh_token = me.getcookie(Constant.cookie.refresh_token);
        const access_token = me.getcookie(Constant.cookie.access_token);
        if (!access_token || !refresh_token) {
            me.setState(
                {
                    userName: '',
                    firstname: '',
                    lastname: '',
                    isAuthenticate: false,
                    isbusy: false
                }
            );
        }
        const requestBody = {
            client_id: me.getcookie(Constant.cookie.client_id),
            client_secret: me.getcookie(Constant.cookie.client_secret),
            refresh_token: refresh_token,
            grant_type: 'refresh_token'
        }
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        var url = me.format(Constant.sso.accessTokenUri, me.getrealm());
        me.apipost(url, me.stringify(requestBody), config)
            .then((result) => {
                if (result.status == 200 && result.data) {
                    me.setcookie(Constant.cookie.access_token, result.data.access_token, { path: '/' });
                    me.setcookie(Constant.cookie.refresh_token, result.data.refresh_token, { path: '/' });
                    me.setcookie(Constant.cookie.id_token, result.data.id_token, { path: '/' });
                    me.setcookie(Constant.cookie.token_type, result.data.token_type, { path: '/' });
                    var objToken = jwtDecode(access_token);
                    if (objToken) {
                        me.setState(
                            {
                                userName: objToken.preferred_username,
                                firstname: objToken.given_name,
                                lastname: objToken.family_name,
                                isAuthenticate: true,
                                isbusy: false
                            }
                        );
                    }
                }
            })
            .catch((err) => {
                me.setState(
                    {
                        userName: '',
                        firstname: '',
                        lastname: '',
                        isAuthenticate: false,
                        isbusy: false
                    }
                );
            })
    }
    signOut(e) {
        var me = this;
        me.logout();
        me.setState(
            {
                userName: '',
                firstname: '',
                lastname: '',
                isAuthenticate: false,
                isbusy: false
            }
        );
    }
    getmenu() {
        var me = this;
        return (
            <Menu style={{ width: 150 }} >
                <Menu.Item key="1" onClick={() => me.signOut()} >
                    <Icon type="logout" />&nbsp;Đăng xuất
                </Menu.Item>
            </Menu>
        )
    }
    onLoginClick = () => {
        var me = this;
        me.login();
    }
    componentDidMount() {
        var me = this;
        me.setState({ isbusy: true });
        me.checkToken();
    }
    componentWillReceiveProps(props) {
        var me = this;
        me.setState({ isbusy: true });
        me.checkToken();
    }
    render() {
        var me = this;
        var displaytext ='';
        if (me.state.firstname && me.state.lastname) {
            displaytext = me.format("{0} {1}", me.state.firstname, me.state.lastname);
        }
        else if (me.state.firstname) {
            displaytext = me.state.firstname;
        }
        else if (me.state.lastname) {
            displaytext = me.state.lastname;
        }
        else if (me.state.userName) {
            displaytext = me.state.userName;
        }

        return (
            <div className='header-wrapper'>
                <div class="textbanner03">NORTH WIND</div>
                <div className='header-user-info'>
                    {
                        me.state.isbusy ? 
                        me.getReactLoading({ type: 'spin', color: '#20a8d8', height: '30px', width: '30px' }) :
                        <>
                            {me.state.isAuthenticate ? 
                            <>                
                                <Dropdown overlay={me.getmenu()} placement="bottomRight">
                                    <span className='header-dropdown-link'>
                                        <Icon type="user" /> <strong>{displaytext}</strong> <Icon type="down" />
                                    </span>
                                </Dropdown>
                            </> : 
                            <Button onClick={me.onLoginClick} type="primary" shape="round" icon={<LoginOutlined />}>Đăng nhập </Button>}
                        </>
                    }

                </div>
            </div>
        );
        // if (me.state.isbusy) {
        //     return me.getReactLoading({ type: 'spin', color: '#20a8d8', height: '30px', width: '30px' });
        // }

        // if (me.state.isAuthenticate) {
        //     var charactor = me.state.userName.substring(0, 1);
        //     var displaytext = me.state.userName;
        //     if (me.state.firstname && me.state.lastname) {
        //         displaytext = me.format("{0} {1}", me.state.firstname, me.state.lastname);
        //         charactor = me.state.firstname.substring(0, 1);
        //     }
        //     else if (me.state.firstname) {
        //         displaytext = me.state.firstname;
        //         charactor = me.state.firstname.substring(0, 1);
        //     }
        //     else if (me.state.lastname) {
        //         displaytext = me.state.lastname;
        //         charactor = me.state.lastname.substring(0, 1);
        //     }
        //     return (
        //         <div className='header-wrapper'>
        //             <div class="textbanner03">CMCLIS</div>
        //             <div className='header-user-info'>
        //                 <Dropdown overlay={me.getmenu()} placement="bottomRight">
        //                     <span className='header-dropdown-link'>
        //                         <Icon type="user" /> <strong>{displaytext}</strong> <Icon type="down" />
        //                     </span>
        //                 </Dropdown>
        //             </div>
        //         </div>
        //     )
        // }
        // else {
        //     return (
        //         <div className='header-wrapper'>
        //             <div class="textbanner03">CMCLIS</div>
        //             <div className='header-user-info'>
        //                 <Button onClick={me.onLoginClick} type="primary" shape="round" icon={<LoginOutlined />}>
        //                     Đăng nhập
        //     </Button>
        //             </div>
        //         </div>
        //     );
        // }
    }
}

export default Header;