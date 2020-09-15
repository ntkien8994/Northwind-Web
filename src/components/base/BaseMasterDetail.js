import React from 'react';
import { Modal, Spin, Form, Space } from 'antd';
import { UserOutlined,CloseCircleFilled,SaveOutlined,SaveFilled, DeleteFilled, UndoOutlined, QuestionCircleFilled,FileAddOutlined,FormOutlined } from '@ant-design/icons';
import BaseComponent from './BaseComponent';
import * as Constant from '../../utility/Constant';
import moment from 'moment';
import BaseToolBar from '../base/BaseToolBar';

class BaseMasterDetail extends BaseComponent {
    constructor(props) {
        super(props);
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
        var me = this;
        var masterData = { ...me.props.masterData };
        Object.keys(values).forEach((key) => {
            masterData[key] = values[key];
        })
        me.prepareDataBeforeSave(masterData);
        me.saveData(masterData);
    }
    //description: hàm để khi cần thiết thì overide lại để set thêm giá trị
    //---------------------------------------------------------------------
    //created by: ntkien 
    //created date: 30.08.2020
    prepareDataBeforeSave(masterData) {
        var me = this;
        if (me.props.editMode == Constant.editMode.add) {
            masterData.EditMode = Constant.entityEditMode.add;
        }
        else if (me.props.editMode == Constant.editMode.edit) {
            masterData.EditMode = Constant.entityEditMode.edit;
        }
    }

    //description: convert các giá trị kiểu DateTime sang moment
    //----------------------------------------------------------
    //created by: ntkien 
    //created date: 08.09.2020
    prepareDataShow(masterData) {
        var me = this;
        Object.keys(masterData).forEach((key) => {
            if (key.endsWith('Date')) {
                if (masterData[key]) {
                    var d = moment(new Date(masterData[key]), Constant.FORMAT_DATETIME);
                    masterData[key] = d;
                }
            }
        })
    }

    //description: Load form
    //------------------------
    //created by: ntkien 
    //created date: 30.08.2020
    loadForm() {
        var me = this;
        me.apicall(() => {
            me.loadData();
        })
    }

    //description: Load dữ liệu để binding lên form
    //---------------------------------------------
    //created by: ntkien 
    //created date: 30.08.2020
    loadData() {
        var me = this;
        var actionName = me.props.entity.toUpperCase() + Constant.BaseAction.LOAD_INFO;
        me.props.doAction(
            actionName,
            {
                editMode: me.props.editMode,
                id: me.props.id,
                entity: me.props.entity
            }
        );
    }

    //description: Validate nghiệp vụ trước khi save
    //---------------------------------------------
    //created by: ntkien 
    //created date: 30.08.2020
    validate() {
        return true;
    }

    //description: Thực hiện save data
    //---------------------------------
    //created by: ntkien 
    //created date: 30.08.2020
    saveData = (masterData) => {
        var me = this;
        if (me.validate()) {
            me.apicall(() => me.submitData(masterData));
        }
    }

    //description: Handle event đóng form
    //-------------------------------------
    //created by: ntkien 
    //created date: 30.08.2020
    closeForm = (sender) => {
        var me = this;
        //nếu click ra ngoài thì ko thực hiện đóng form
        if (sender.currentTarget.nodeName == 'DIV') {
            return
        }
        var actionName = me.props.entity.toUpperCase() + Constant.BaseAction.CLOSE_FORM;
        me.props.doAction(
            actionName
        );
    }

    //description: Save data xuống database
    //-------------------------------------
    //created by: ntkien 
    //created date: 30.08.2020
    submitData(masterData) {
        var me = this;
        var actionName = me.props.entity.toUpperCase() + Constant.BaseAction.SAVE_DATA;
        me.props.doAction(
            actionName,
            {
                masterData,
                entity: me.props.entity
            }
        )
    }

    componentDidMount() {
        var me = this;
        me.loadForm();
    }
    componentDidUpdate() {
        var me = this;
        if (!me.props.loadingDetailForm && me.props.masterData) {
            me.prepareDataShow(me.props.masterData);
            me.refs.form.setFieldsValue(me.props.masterData);
        }
    }
    getToolbars=()=>{
        return ([
            { commandName: Constant.commandName.add, value: "Thêm mới", icon: <FileAddOutlined  style={{ color: '#52c41a' }} />, sortOrder: 0 },
            { commandName: Constant.commandName.edit, disableWhenZero: true, value: "Sửa", icon: <FormOutlined  style={{ color: '#1890ff' }} />, sortOrder: 0 },
            { commandName: Constant.commandName.save, value: "Lưu", icon: <SaveFilled  style={{ color: '#1890ff' }} />, sortOrder: 0 },
            { commandName: Constant.commandName.saveAndNew,parentCode:Constant.commandName.save, value: "Lưu & Thêm mới", icon: <SaveFilled  style={{ color: '#1890ff' }} />, sortOrder: 0 },
            { commandName: Constant.commandName.saveAndClose,parentCode:Constant.commandName.save, value: "Lưu & Đóng", icon: <SaveFilled  style={{ color: '#1890ff' }} />, sortOrder: 0 },

            { commandName: Constant.commandName.delete, disableWhenZero: true, value: "Xóa", icon: <DeleteFilled style={{ color: 'red' }} />, sortOrder: 0 },
            { commandName: Constant.commandName.undo, value: "Hoãn", icon:<UndoOutlined style={{ color: '#1890ff' }} />, seperator: true, sortOrder: 3 },
            { commandName: Constant.commandName.help, value: "Trợ giúp", icon: <QuestionCircleFilled style={{ color: '#1890ff' }} />, sortOrder: 4 },
            { commandName: Constant.commandName.close, value: "Đóng", icon: <CloseCircleFilled style={{ color: 'red' }} />, sortOrder: 4 },
        ]);
    }
//description: toolbar_click
    //--------------------------
    //created by: ntkien 
    //created date: 31.08.2020
    toolbar_Click = (commandName) => {
        var me = this;
        switch (commandName) {
            case Constant.commandName.add:
                me.showFormDetail(Constant.editMode.add);
                break;
            case Constant.commandName.dupplicate:
                me.showFormDetail(Constant.editMode.dupplicate, me.props.id);
                break;
            case Constant.commandName.edit:
                me.showFormDetail(Constant.editMode.edit, me.props.id, me.props.current);
                break;
            case Constant.commandName.delete:
                me.doDelete();
                break;
            case Constant.commandName.refresh:
                me.refresh();
                break;
            case Constant.commandName.export:
                break;
            case Constant.commandName.help:
                break;
        }
    }
    render() {
        var me = this;
        return (
            <Modal className='voucher-form' title={me.getTitle()}
                visible={me.props.showDetail}
                centered
                // footer={[
                //     <Button form="myForm" key="submit" htmlType="submit" type="primary" >
                //         Cập nhật
                // </Button>,
                //     <Button key="back" type="primary" danger onClick={me.closeForm}>
                //         Hủy bỏ
                // </Button>,
                // ]}
                footer={false}
                onCancel={me.closeForm}
                width={800}>
                <React.Fragment>
                    <Spin spinning={me.props.loadingDetailForm}>
                        <Form
                            id="myForm"
                            ref='form'
                            onFinish={me.onFinish}
                            name="basic"
                        >
                            <div className='toolbar-form'>
                                <BaseToolBar config={me.getToolbars()} clickCallBack={me.toolbar_Click} />
                            </div>
                            <div className='main-form'>
                                {
                                    me.getForm()
                                }
                            </div>

                            <div className='footer-form' >
                                <span><UserOutlined /> Người tạo: Nguyễn Trung Văn - 10/09/2020</span>
                                <span><UserOutlined /> Lần sửa cuối: Nguyễn Văn Mạnh - 10/09/2020 10:20:30 AM</span>
                            </div>
                        </Form>
                    </Spin>

                </React.Fragment>

            </Modal>
        );
    }
}
export default BaseMasterDetail