import React from 'react';
import { Modal } from 'antd';
import BaseComponent from './BaseComponent';


class BaseDictionaryDetail extends BaseComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Modal>
                <p>a</p>
            </Modal>
        );
    }
    onFinish=(values)=>{
        
    }
    componentDidMount() {
        var me = this;
        me.apicall(() => {
            me.loadData();
        })
    }
    loadData() {
        var me = this;
    }
    
    validate() {
        return true;
    }
    saveData = () => {
        var me = this;
        if (me.validate()) {
            me.prepareData();
            me.apicall(() => me.submitData());
        }
    }
    closeForm = (sender) => {
        var me = this;
    }
    submitData(){
        var me=this;
    }
}
export default BaseDictionaryDetail