import React from 'react';
import { Modal, Spin, Form, Button } from 'antd';
import BaseComponent from './BaseComponent';
import * as Constant from '../../utility/Constant';

class BaseDictionaryDetail extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        var me = this;
        return (
            <Modal title={me.getTitle()}
                visible={me.props.showDetail}
                centered
                footer={[
                    <Button form="myForm" key="submit" htmlType="submit" type="primary" >
                        Cập nhật
                </Button>,
                    <Button key="back" type="primary" danger onClick={me.closeForm}>
                        Hủy bỏ
                </Button>,
                ]}
                onCancel={me.closeForm}
                width={500}>
                <React.Fragment>
                    <Spin spinning={me.props.loadingDetailForm}>
                        <Form
                            id="myForm"
                            ref='form'
                            onFinish={me.onFinish}
                            name="basic"
                        >
                            {
                                me.getForm()
                            }
                        </Form>
                    </Spin>

                </React.Fragment>

            </Modal>
        );
    }

    //description: khi các form chi tiết kế thừa thì sẽ override lại để vẽ form
    //-------------------------------------------------------------------------
    //created by: ntkien 
    //created date: 28.08.2020
    getForm() {
        return null;
    }

    //description: Tiêu đề form chi tiết
    //----------------------------------
    //created by: ntkien 
    //created date: 30.08.2020
    getTitle() {
        var me = this;
        if (!me.props.editMode) {
            return me.props.pageName;
        }
        else if (me.props.editMode == Constant.editMode.add) {
            return Constant.ADD + " " + me.props.pageName;
        }
        else if (me.props.editMode == Constant.editMode.edit) {
            return Constant.EDIT + " " + me.props.pageName;
        }
        else {
            return me.props.pageName;
        }
    }
    //description: Submit form
    //------------------------
    //created by: ntkien 
    //created date: 30.08.2020
    onFinish = (values) => {

    }
    componentDidMount() {
        var me = this;
        me.loadForm();
    }
    componentDidUpdate(){
        var me=this;
        if(!me.props.loadingDetailForm && me.props.masterData){
            me.refs.form.setFieldsValue(me.props.masterData);
        }
    }
    loadForm() {
        var me = this;
        me.apicall(() => {
            me.loadData();
        })
    }
    loadData() {
        var me = this;
        var actionName = me.props.entity.toUpperCase() + Constant.BaseAction.LOAD_INFO;
        me.props.doAction(
            actionName, 
            {
                editMode: me.props.editMode,
                id: me.props.id
            }
        );
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
        var actionName = me.props.entity.toUpperCase() + Constant.BaseAction.CLOSE_FORM;
        me.props.doAction(
            actionName
        );
    }
    submitData() {
        var me = this;
    }
}
export default BaseDictionaryDetail