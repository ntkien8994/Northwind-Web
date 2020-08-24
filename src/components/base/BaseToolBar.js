import React from 'react';
import {Icon} from '@ant-design/compatible';
class BaseToolBar extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        var me=this;
        return (
            <ul className="app-toobar-list">
               {
                   this.props.config.map((item,index)=>(
                    <li key={index} className="nav-item" ><a onClick={()=>{me.clickItem(item.commandName)}}>
                    <Icon style={{color:item.color}} type={item.icon} /><span>  {item.value}</span>
                  </a></li>
                ))
                }
            </ul>
        );
    }
    clickItem(commandName){
        if (this.props.clickCallBack !== undefined) this.props.clickCallBack(commandName);
    }
}
BaseToolBar.defaultProps = {
    config:[]
}
export default BaseToolBar