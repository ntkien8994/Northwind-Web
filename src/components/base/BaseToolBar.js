import React from 'react';
import { Menu } from 'antd';
const { SubMenu } = Menu;
class BaseToolBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var me = this;
        debugger
        return (
            <ul className="app-toobar-list">
                <Menu onClick={(e)=>me.clickItem(e.key)} selectedKeys={[]} mode="horizontal">
                    {
                        me.props.config.map((item, index) =>
                            <Menu.Item disabled={item.disableWhenZero&&(!me.props.data || me.props.data.length==0) } className={item.seperator ? 'seperator' : ''} key={item.commandName} icon={item.icon}>
                                {item.value}
                            </Menu.Item>
                        )
                    }
                </Menu>
                {/* <Space size={2}>
                    {
                        me.props.config.map((item, index) => (
                            // <li key={index} className="nav-item" >
                            //     <a className={item.seperator ? 'seperator' : ''} onClick={() => { me.clickItem(item.commandName) }}>
                            //         {item.icon} <span>  {item.value}</span>
                            //     </a>
                            // </li>
                        <Button disabled={true} icon={item.icon} className={item.seperator ? 'seperator' : ''} type="link">{item.value}</Button>
                        ))
                    }
                </Space> */}
            </ul>
        );
    }
    clickItem(commandName) {
        if (this.props.clickCallBack !== undefined) this.props.clickCallBack(commandName);
    }
}
BaseToolBar.defaultProps = {
    config: []
}
export default BaseToolBar