import React from 'react';
import BaseToolBar from './BaseToolBar';
import BaseDetail from './BaseDetail';
import * as Constant from '../../utility/Constant';
import { Pagination } from 'antd';
import BaseComponent from './BaseComponent';
import GridTable from '../controls/GridTable';

class BaseList extends BaseComponent {
    //paging sau này để filter
    handleTableChange = (pagination, filters, sorter) => {
        var me = this;
        me.loadData(pagination, false, true, me.props.searchObject);
    };
    //paging
    onPaginationChange = (current, pageSize) => {
        var me = this;
        var pagination = { ...me.props.pagination };
        pagination.current = current;
        me.loadData(pagination, false, true, me.props.searchObject);
    };
    toolbar_Click = (commandName) => {
        var me = this;
        switch (commandName) {
            case Constant.commandName.add:
                // me.showFormDetail(Constant.editMode.add, me.state.id);
                me.props.showFormInfo({
                    editMode:Constant.editMode.add
                });
                break;
            case Constant.commandName.dupplicate:
                me.showFormDetail(Constant.editMode.dupplicate, me.state.id);
                break;
            case Constant.commandName.edit:
                if (!me.state.id) {
                    alert("Bạn phải chọn ít nhất một bản ghi.");
                    return;
                }
                me.showFormDetail(Constant.editMode.edit, me.state.id);
                break;
            case Constant.commandName.delete:
                if (!me.state.id) {
                    alert("Bạn phải chọn ít nhất một bản ghi.");
                    return;
                }
                me.state.contentConfirm = "Bạn có chắc chắn muốn xóa bản ghi này không?";
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
    deleteItem(id) {
        var me = this;
        var url = me.format(this.state.deleteUrl, id);
        me.setState({ loading: true });
        me.apidelete(url)
            .then((result) => {
                me.showToastMessage("Xóa bản ghi thành công!", "success");
                var pagination = me.state.pagination;
                pagination.current = 1;
                me.state.pagination = pagination;
                me.loadData();
            })
            .catch((err) => {
                console.log(err);
            })
    }
    ok = () => {
        var me = this;
        me.apicall(() => me.deleteItem(me.state.id));
    }
    getToolBarConfig() {
        return ([
            { commandName: Constant.commandName.add, value: "Thêm mới", icon: "plus-circle", color: "green", sortOrder: 0 },
            { commandName: Constant.commandName.refresh, value: "Làm mới", icon: "sync", color: "green", sortOrder: 3 },
            { commandName: Constant.commandName.help, value: "Trợ giúp", icon: "question-circle", sortOrder: 4 },
        ]);
    }
    loadData(pagination, isloading, isbusy, searchObject) {
        var me = this;
        var param = {
            isloading,
            isbusy,
            pagination,
            searchObject
        }
        var customparam = me.getCustomParam(param);
        if (customparam) {
            param = customparam
        }
        me.props.loadData(param);
    }
    refresh() {
        var me = this;
        var pagination = me.props.pagination,
            isloading = false,
            isbusy = true,
            searchObject = me.props.searchObject;
        me.apicall(() => me.loadData(pagination, isloading, isbusy, searchObject));
    }
    getCustomParam() {
        return null;
    }
    getSearchPanel() {
        return null;
    }
    getFormDetail(propsFormDetail) {
        return null;
    }
    getColumns() {
        return []
    }
    componentDidMount() {
        var me = this;
        var pagination = me.props.pagination,
            isloading = true,
            isbusy = false,
            searchObject = null;

        me.apicall(() => me.loadData(pagination, isloading, isbusy, searchObject));
    }
    window_resize = () => {
        var me = this;
        me.forceUpdate();
    }
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
    render() {
        var me = this;
        window.addEventListener('resize', me.window_resize);
        //nếu chưa load thì hiển thị màn hình loading
        if (me.props.isloading) {
            return (
                <div className="center50 pdtop10">
                    {
                        me.getReactLoading({ type: 'spin', color: '#20a8d8', height: '50px', width: '50px' })
                    }
                </div>)
        }

        var toobarConfig = me.getToolBarConfig();
        var scrollheight = me.getScrollHeight(toobarConfig ? 40 : 0);
        var columns = me.getColumns();
        var key = me.props.key ? me.props.key : me.props.entity + "Id";
        var { current, pageSize, total } = me.props.pagination;
        var propsTable = {
            rkey: key,
            scrollheight,
            columns,
            isbusy: me.props.isbusy,
            data: me.props.data
        }

        
        var propsFormDetail = {
            showDetail: me.props.showDetail,
            loadingDetail:me.props.loadingDetail
        }
        var detailForm = me.getFormDetail(propsFormDetail);
        return (
            <React.Fragment>
                {me.getSearchPanel()}
                {
                    toobarConfig ? <BaseToolBar config={toobarConfig} clickCallBack={me.toolbar_Click} /> : null
                }
                <div className='app-search-toolbar'>
                    <GridTable
                        {...propsTable} />
                </div>
                <div className='box-pagination'>
                    <Pagination
                        size="small"
                        showSizeChanger={true}
                        current={current}
                        total={total}
                        pageSize={pageSize}
                        onChange={me.onPaginationChange}
                        showQuickJumper
                        showTotal={total => `Tổng số ${total} bản ghi`}
                    />
                </div>
                {
                    detailForm ? detailForm : null
                }
            </React.Fragment>
        );
    }
}
export default BaseList