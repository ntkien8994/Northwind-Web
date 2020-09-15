import React from 'react';
import { Menu } from 'antd';
import * as Constant from '../../utility/Constant';
const { SubMenu } = Menu;

class BaseToolBar extends React.Component {
    renderNodeChild(item, source) {
        var me = this;
        if(item.hideIfNotMaster && !me.props.isMasterDetail){
            return null;
        }
        const childNodes = source.filter(function (o) { return o.parentCode == item.commandName });
        if (childNodes && childNodes.length > 0) {
            return (
                <SubMenu key={item.commandName} onTitleClick={(e)=>me.clickItem(e.key)} icon={item.icon} title={item.value} >
                    {childNodes.map(subNode => me.renderNodeChild(subNode, source))}
                </SubMenu>
            );
        }
        else {
            return (
                <Menu.Item disabled={item.disableWhenZero && (!me.props.data || me.props.data.length == 0)} className={item.seperator ? 'seperator' : ''} key={item.commandName} icon={item.icon}>
                    {item.value}
                </Menu.Item>
            )
        }
    }
    render() {
        var me = this;
        const nodeRoots = me.props.config.filter(function (o) { return !o.parentCode });
        return (
            <ul className="app-toobar-list">
                <Menu  onClick={(e) => me.clickItem(e.key)} selectedKeys={[]} mode="horizontal">
                    {
                        // me.renderTree(me.props.config)
                        nodeRoots.map((item, index) =>
                            // <Menu.Item disabled={item.disableWhenZero && (!me.props.data || me.props.data.length == 0)} className={item.seperator ? 'seperator' : ''} key={item.commandName} icon={item.icon}>
                            //     {item.value}
                            // </Menu.Item>

                            me.renderNodeChild(item, me.props.config)
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