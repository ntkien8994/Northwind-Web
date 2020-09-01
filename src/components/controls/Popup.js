import React from "react";
import { PlusCircleFilled, EditFilled, DeleteFilled, SyncOutlined, QuestionCircleFilled } from '@ant-design/icons';


const Popup = (props) => {
    var menu = props.menu;
    return (
        <div className="popup" style={{ visibility: 'hidden' }}>
            {
                menu
            }
        </div>
    )
}

export default Popup