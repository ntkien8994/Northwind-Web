import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
// import { Icon } from '@ant-design/compatible';
import GeneralForm from '../base/GeneralForm';
import { LoginOutlined,LogoutOutlined,UserOutlined,DownOutlined } from '@ant-design/icons';
import * as Constant from '../../utility/Constant';
import * as common from '../../utility/common'; 
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
        const refresh_token = common.getcookie(Constant.cookie.refresh_token);
        const access_token = common.getcookie(Constant.cookie.access_token);
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
            client_id: common.getcookie(Constant.cookie.client_id),
            client_secret: common.getcookie(Constant.cookie.client_secret),
            refresh_token: refresh_token,
            grant_type: 'refresh_token'
        }
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        var url = common.format(Constant.sso.accessTokenUri, common.getrealm());
        me.apipost(url, common.stringify(requestBody), config)
            .then((result) => {
                if (result.status == 200 && result.data) {
                    common.setcookie(Constant.cookie.access_token, result.data.access_token, { path: '/' });
                    common.setcookie(Constant.cookie.refresh_token, result.data.refresh_token, { path: '/' });
                    common.setcookie(Constant.cookie.id_token, result.data.id_token, { path: '/' });
                    common.setcookie(Constant.cookie.token_type, result.data.token_type, { path: '/' });
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
                    <LogoutOutlined/>&nbsp;Đăng xuất
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
    render() {
        var me = this;
        var displaytext ='';
        if (me.state.firstname && me.state.lastname) {
            displaytext = common.format("{0} {1}", me.state.firstname, me.state.lastname);
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
                <div className="textbanner03">NORTH WIND</div>
                <div className='header-user-info'>
                    {
                        me.state.isbusy ? 
                        common.getReactLoading({ type: 'spin', color: '#20a8d8', height: '30px', width: '30px' }) :
                        <>
                            {me.state.isAuthenticate ? 
                            <>                
                                <Dropdown overlay={me.getmenu()} placement="bottomRight">
                                    <span className='header-dropdown-link'>
                                        <UserOutlined /> <strong>{displaytext}</strong> <DownOutlined />
                                    </span>
                                </Dropdown>
                            </> : 
                            <Button onClick={me.onLoginClick} type="primary" shape="round" icon={<LoginOutlined />}>Đăng nhập </Button>}
                        </>
                    }

                </div>
            </div>
        );
    }
}

export default Header;