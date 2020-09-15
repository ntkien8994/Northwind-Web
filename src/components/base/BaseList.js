import React from 'react';
import BaseToolBar from './BaseToolBar';
import * as Constant from '../../utility/Constant';
import * as common from '../../utility/common';
import { Pagination, Menu, message, Modal, Tabs } from 'antd';
import BaseComponent from './BaseComponent';
import GridTable from '../controls/GridTable';
import {FileSearchOutlined , PlusCircleFilled, EditFilled, DeleteFilled, SyncOutlined, QuestionCircleFilled,FileAddOutlined,FormOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;

class BaseList extends BaseComponent {
    //description: Handle filter,sortChange
    //---------------------------------------------
    //created by: ntkien 
    //created date: 31.08.2020
    handleTableChange = (pagination, filters, sorter) => {
        var me = this;
        var sort = null;
        //nếu là sort
        if (sorter.order) {
            sort = [
                {
                    ColumnName: sorter.field,
                    SortOperation: sorter.order == 'ascend' ? 'ASC' : 'DESC'
                }
            ]
        }
        var filter = common.getFilter(filters, me.getColumns());
        me.loadData(me.props.pagination, false, true, me.props.searchObject, filter, sort);
    };

    //description: Paging change
    //--------------------------
    //created by: ntkien 
    //created date: 31.08.2020
    onPaginationChange = (current, pageSize) => {
        var me = this;
        var pagination = { ...me.props.pagination };
        pagination.current = current;
        me.loadData(pagination, false, true, me.props.searchObject);
    };

    //description: show form chi tiết
    //-------------------------------
    //created by: ntkien 
    //created date: 31.08.2020
    showFormDetail(editMode, id, record) {
        var me = this;
        var actionName = me.props.entity.toUpperCase() + Constant.BaseAction.SHOW_FORM;
        me.props.doAction(
            actionName,
            {
                editMode,
                id,
                record
            }
        );
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

    //description: Thực hiện hành động xóa
    // vì control đang hiển thị nút Yes, No ngược nhau nên làm ngược lại
    //------------------------------------------------------------------
    //created by: ntkien 
    //created date: 31.08.2020
    doDelete() {
        var me = this;
        Modal.confirm({
            // title: Constant.FORM_TITLE,
            icon: <QuestionCircleFilled style={{ color: '#1890ff' }} />,
            centered: true,
            content: Constant.CONFIRM_DELETE,
            okText: 'Không',
            okButtonProps: {
                type: 'primary',
                danger: true
            },
            cancelText: 'Có',
            cancelButtonProps: {
                type: 'primary',
            },
            onCancel() {
                me.ok()
            },
        });
    }
    //description: Xóa 1 bản ghi
    //--------------------------
    //created by: ntkien 
    //created date: 31.08.2020
    deleteItem(currentItem) {
        var me = this;
        currentItem.EditMode = Constant.entityEditMode.delete;
        var actionName = me.props.entity.toUpperCase() + Constant.BaseAction.SAVE_DATA;
        me.props.doAction(actionName, {
            masterData: currentItem,
            entity: me.props.entity
        });
    }

    //description: Xác nhận xóa
    //--------------------------
    //created by: ntkien 
    //created date: 31.08.2020
    ok = () => {
        var me = this;
        me.apicall(() => me.deleteItem(me.props.currentItem));
    }

    //description: Danh sách các context menu
    //---------------------------------------
    //created by: ntkien 
    //created date: 31.08.2020
    getContextMenu() {
        var me = this;
        return (
            <>
                <Menu onClick={(evt) => me.toolbar_Click(evt.key)} style={{ width: 200 }} mode="vertical">
                    <Menu.Item selectable={false} key={Constant.commandName.add} icon={<PlusCircleFilled style={{ color: '#52c41a' }} />} >Thêm mới</Menu.Item>
                    <Menu.Item key={Constant.commandName.view} icon={<FileSearchOutlined style={{ color: '#1890ff' }} />} >Xem</Menu.Item>
                    <Menu.Item key={Constant.commandName.edit} icon={<EditFilled style={{ color: '#1890ff' }} />} >Sửa</Menu.Item>
                    <Menu.Item key={Constant.commandName.delete} icon={<DeleteFilled style={{ color: 'red' }} />} >Xóa</Menu.Item>
                    <Menu.Item key={Constant.commandName.refresh} className="seperator" icon={<SyncOutlined style={{ color: '#52c41a' }} />} >Làm mới</Menu.Item>
                    <Menu.Item key={Constant.commandName.help} icon={<QuestionCircleFilled style={{ color: '#1890ff' }} />} >Trợ giúp</Menu.Item>
                </Menu>
            </>
        )
    }

    //description: Danh sách chức năng toolbar
    //---------------------------------------
    //created by: ntkien 
    //created date: 01.09.2020
    getToolBarConfig() {
        return ([
            { commandName: Constant.commandName.add, value: "Thêm mới", icon: <FileAddOutlined  style={{ color: '#52c41a' }} />, sortOrder: 0 },
            { commandName: Constant.commandName.view,hideIfNotMaster:true, disableWhenZero: true, value: "Xem", icon: <FileSearchOutlined  style={{ color: '#1890ff' }} />, sortOrder: 0 },
            { commandName: Constant.commandName.edit, disableWhenZero: true, value: "Sửa", icon: <FormOutlined  style={{ color: '#1890ff' }} />, sortOrder: 0 },
            { commandName: Constant.commandName.delete, disableWhenZero: true, value: "Xóa", icon: <DeleteFilled style={{ color: 'red' }} />, sortOrder: 0 },
            { commandName: Constant.commandName.refresh, value: "Làm mới", icon: <SyncOutlined style={{ color: '#52c41a' }} />, seperator: true, sortOrder: 3 },
            { commandName: Constant.commandName.help, value: "Trợ giúp", icon: <QuestionCircleFilled style={{ color: '#1890ff' }} />, sortOrder: 4 },
        ]);
    }

    //description: Load dữ liệu
    //-------------------------
    //created by: ntkien 
    //created date: 01.09.2020
    loadData(pagination, isloading, isbusy, searchObject, filters, sorters) {
        var me = this;
        var param = {
            isloading,
            isbusy,
            pagination,
            searchObject,
            filters,
            sorters,
            entity: me.props.entity
        }
        var customparam = me.getCustomParam(param);
        if (customparam) {
            param = customparam
        }
        var actionName = me.props.entity.toUpperCase() + Constant.BaseAction.LOAD_DATA;
        me.props.doAction(actionName, param);
    }

    //description: Nạp lại dữ liệu
    //----------------------------
    //created by: ntkien 
    //created date: 01.09.2020
    refresh() {
        var me = this;
        var pagination = me.props.pagination,
            isloading = false,
            isbusy = true,
            searchObject = me.props.searchObject;
        me.apicall(() => me.loadData(pagination, isloading, isbusy, searchObject));
    }

    //description: Custom lại data
    //----------------------------
    //created by: ntkien 
    //created date: 01.09.2020
    getCustomParam() {
        return null;
    }

    //description: Form search dữ liệu
    //--------------------------------
    //created by: ntkien 
    //created date: 01.09.2020
    getSearchPanel() {
        return null;
    }

    //description: Form chi tiết
    //--------------------------
    //created by: ntkien 
    //created date: 01.09.2020
    getFormDetail(propsFormDetail) {
        return null;
    }

    //description: Lấy panel chi tiết trong trường hợp có master/detail
    //-----------------------------------------------------------------
    //created by: ntkien 
    //created date: 09.09.2020
    getPanelDetail() {
        var me = this;
        // var propsTable = {
        //     rkey: key,
        //     scrollheight,
        //     columns,
        //     isbusy: me.props.isbusy,
        //     data: me.props.data,
        //     activeFirstRow: me.props.activeFirstRow
        // }
        return (
            <Tabs defaultActiveKey="1" style={{width:'100%',height:'230px'}} type="card" size='small'>
                <TabPane tab="Chi tiết" key="1">
                    <GridTable
                        columns={me.getColumnsDetail()}
                    />
                </TabPane>
                <TabPane tab="Chi tiết 2" key="2">
                    Chi tiết 2
                </TabPane>
            </Tabs>
        );
    }
    //description: Danh sách các cột hiển thị trên grid
    //-------------------------------------------------
    //created by: ntkien 
    //created date: 01.09.2020
    getColumns() {
        return []
    }

    //description: Danh sách các cột hiển thị trên grid detail
    //-------------------------------------------------
    //created by: ntkien 
    //created date: 01.09.2020
    getColumnsDetail() {
        return []
    }

    //description: Show thông báo sau khi save dữ liệu
    //-------------------------------------------------
    //created by: ntkien 
    //created date: 01.09.2020
    showNotifyAfterSave() {
        var me = this;
        var { saveComplete, response } = me.props;
        if (saveComplete) {
            if (response && response.data == '1') {
                message.success(Constant.SAVE_SUCCESS);
            }
            else {
                message.error(Constant.SAVE_FAIL);
            }
            me.refresh();
        }
    }

    //description: Thực hiện thay đổi current item khi click vào từng row
    //-------------------------------------------------------------------
    //created by: ntkien 
    //created date: 01.09.2020
    selectedChange(record) {
        var me = this;
        var actionName = me.props.entity.toUpperCase() + Constant.BaseAction.SELECTED_CHANGE;
        me.props.doAction(
            actionName,
            {
                record
            }
        )
    }

    //description: Lấy height của form
    //---------------------------------
    //created by: ntkien 
    //created date: 01.09.2020
    getScrollHeight(toolbarheight) {
        var elements = document.getElementsByClassName("app-body");
        var scrollheight = 500;
        var headerGridHeight = 39;
        var pagingHeight = 45.5;
        if (elements && elements.length > 0) {

            scrollheight = elements[0].scrollHeight - toolbarheight - headerGridHeight - pagingHeight;
        }
        return scrollheight
    }

    componentDidMount() {
        var me = this;
        var pagination = me.props.pagination,
            isloading = true,
            isbusy = false,
            searchObject = null;

        me.apicall(() => me.loadData(pagination, isloading, isbusy, searchObject));
    }
    componentDidUpdate() {
        var me = this;
        me.showNotifyAfterSave();
    }
    window_resize = () => {
        var me = this;
        me.forceUpdate();
    }

    onRowClick = (record) => {
        var me = this;
        me.selectedChange(record);
    }

    onDbRowClick = (record) => {
        var me = this;
        me.showFormDetail(Constant.editMode.edit, record[me.props.primaryKey], record);
    }

    render() {
        var me = this;
        window.addEventListener('resize', me.window_resize);
        //nếu chưa load thì hiển thị màn hình loading
        if (me.props.isloading) {
            return (
                <div className="center50 pdtop10">
                    {
                        common.getReactLoading({ type: 'spin', color: '#20a8d8', height: '50px', width: '50px' })
                    }
                </div>)
        }

        var toobarConfig = me.getToolBarConfig();
        var scrollheight = me.getScrollHeight(toobarConfig ? 40 : 0);
        var columns = me.getColumns();
        var key = me.props.primaryKey ? me.props.primaryKey : me.props.entity + "Id";
        var { current, pageSize, total } = me.props.pagination;
        var propsTable = {
            rkey: key,
            scrollheight,
            columns,
            isbusy: me.props.isbusy,
            data: me.props.data,
            activeFirstRow: me.props.activeFirstRow
        }

        var propsFormDetail = {
            showDetail: me.props.showDetail
        }
        
        var detailForm = me.getFormDetail(propsFormDetail);
        return (
            <React.Fragment>
                {me.getSearchPanel()}
                {
                    toobarConfig ? <BaseToolBar isMasterDetail={me.props.isMasterDetail} data={me.props.data} config={toobarConfig} clickCallBack={me.toolbar_Click} /> : null
                }
                <div className={me.props.isMasterDetail?'master-table':'dictionary-table'}>
                    <GridTable
                    onChange={me.handleTableChange}
                    onRowClick={me.onRowClick}
                    onDbRowClick={me.onDbRowClick}
                    menu={me.getContextMenu()}
                    {...propsTable} />
                </div>
                
                <div className='box-pagination'>
                    <Pagination
                        size="small"
                        current={current}
                        total={total}
                        pageSize={pageSize}
                        onChange={me.onPaginationChange}
                        showQuickJumper
                        showSizeChanger={false}
                        showTotal={total => `Tổng số ${total} bản ghi`}
                    />
                </div>
                {
                    me.props.isMasterDetail ? this.getPanelDetail() : null
                }
                {
                    detailForm && me.props.showDetail ? detailForm : null
                }
            </React.Fragment>
        );
    }
}
export default BaseList