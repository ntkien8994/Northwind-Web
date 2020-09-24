import React from "react";
import { PlusCircleFilled, EditFilled, DeleteFilled, SyncOutlined, QuestionCircleFilled } from '@ant-design/icons';


const Popup = (props) => {
    var menu = props.menu;
    var id =props.tableId+'popup';
    return (
        <div className='popup' id={id} style={{ visibility: 'hidden' }}>
            {
                menu
            }
        </div>
    )
}

export default Popup