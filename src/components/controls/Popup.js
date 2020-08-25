import React from "react";
import { Menu } from "antd"

const { SubMenu } = Menu;
const Popup = ({ menu, record, showPopup, x, y }) => {
    return (
        showPopup?
        <div className="popup" style={{ left: `${x}px`, top: `${y}px` }}>
            {/* {
            menu
        } */}
            <Menu style={{ width: 256 }} mode="vertical">
                <Menu.Item key="7">Menu 1</Menu.Item>
                <Menu.Item key="8">Menu 2</Menu.Item>
                <SubMenu key="sub4" title="Navigation Three">
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
            </Menu>

        </div>
        :null
    )
}

export default Popup