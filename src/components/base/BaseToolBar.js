import React from 'react';
import { Menu } from 'antd';
import * as Constant from '../../utility/Constant';
const { SubMenu } = Menu;

class BaseToolBar extends React.Component {
    renderNodeChild(item, source) {
        var me = this;
        if(item.hide){
            return null;
        }
        const childNodes = source.filter(function (o) { return o.parentCode == item.commandName });
        if (childNodes && childNodes.length > 0) {
            return (
                <SubMenu disabled={item.disabled} key={item.commandName} onTitleClick={(e)=>me.clickItem(e.key)} icon={item.icon} title={item.value} >
                    {childNodes.map(subNode => me.renderNodeChild(subNode, source))}
                </SubMenu>
            );
        }
        else {
            return (
                <Menu.Item disabled={item.disabled} className={item.seperator ? 'seperator' : ''} key={item.commandName} icon={item.icon}>
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
                        nodeRoots.map((item, index) =>
                            me.renderNodeChild(item, me.props.config)
                        )
                    }
                </Menu>
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