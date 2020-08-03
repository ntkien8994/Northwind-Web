import React from 'react';
import BaseToolBar from './BaseToolBar';
import BaseDetail from './BaseDetail';
import * as Constant from '../../utility/Constant';
import { Table } from 'antd';
import BaseComponent from './BaseComponent';
import { Resizable } from 'react-resizable';
import axios from 'axios';

class BaseList extends BaseComponent {
    //resize column
    // components = () => {
    //     var me = this;
    //     return {
    //         header: {
    //             cell: me.ResizeableTitle,
    //         }
    //     }
    // };
    // ResizeableTitle = props => {
    //     const { onResize, width, ...restProps } = props;

    //     if (!width) {
    //         return <th {...restProps} />;
    //     }

    //     return (
    //         <Resizable
    //             width={width}
    //             height={0}
    //             handle={
    //                 <span
    //                     className="react-resizable-handle"
    //                     onClick={e => {
    //                         e.stopPropagation();
    //                     }}
    //                 />
    //             }
    //             onResize={onResize}
    //             draggableOpts={{ enableUserSelectHack: false }}
    //         >
    //             <th {...restProps} />
    //         </Resizable>
    //     );
    // };
    // handleResize = index => (e, { size }) => {
    //     this.setState(({ columns }) => {
    //         const nextColumns = [...columns];
    //         nextColumns[index] = {
    //             ...nextColumns[index],
    //             width: size.width,
    //         };
    //         return { columns: nextColumns };
    //     });
    // };
    //paging
    handleTableChange = (pagination, filters, sorter) => {
        var me = this;
        me.props.paging(pagination, filters,sorter)
    };
    toolbar_Click = (commandName) => {
        var me=this;
        switch (commandName) {
            case Constant.commandName.add:
                me.showFormDetail(Constant.editMode.add, me.state.id);
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
                me.setState({ showconfirm: true });
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
    loadData(pagination,isloading, isbusy,searchObject) {
        var me = this;
        var param = {
            isloading,
            isbusy,
            pagination,
            searchObject
        }
        var customparam =me.getCustomParam(param);
        if(customparam){
            param = customparam
        }
        me.props.loadData(param);
    }
    refresh(){
        var me=this;
        var pagination = me.props.pagination,
            isloading = false,
            isbusy = true,
            searchObject = me.props.searchObject;
        me.apicall(() => me.loadData(pagination,isloading,isbusy,searchObject));
    }
    getCustomParam(){
        return null;
    }
    getSearchPanel() {
        return null;
    }
    getColumns(){
        return []
    }
    componentDidMount() {
        var me = this;
        var pagination = me.props.pagination,
            isloading = true,
            isbusy = false,
            searchObject = null;

        me.apicall(() => me.loadData(pagination,isloading,isbusy,searchObject));
    }
    render() {
        var me = this;
        //nếu chưa load thì hiển thị màn hình loading
        if (me.props.isloading) {
            return (
                <div className="center50 pdtop10">
                    {
                        me.getReactLoading({ type: 'spin', color: '#20a8d8', height: '50px', width: '50px' })
                    }
                </div>)
        }
        var className = 'app-search-toolbar';
        // if(me.state.classGridName){
        //     className=me.state.classGridName;
        // }
        var toobarConfig = me.getToolBarConfig();

        // var columnsresize = me.state.columns.map((col, index) => ({
        //     ...col,
        //     onHeaderCell: column => ({
        //         width: column.width,
        //         onResize: me.handleResize(index),
        //     }),
        // }));

        // var elements = document.getElementsByClassName("app-body");
        // var scrollheight = 430;
        // if (elements && elements.length > 0) {
        //     scrollheight = elements[0].scrollHeight - 155;
        // }
        var columns = me.getColumns();
        return (
            <React.Fragment>
                {me.getSearchPanel()}
                <BaseToolBar config={toobarConfig} clickCallBack={me.toolbar_Click} />
                <div className={className}>
                    <Table
                        size="small"
                        bordered
                        // defaultExpandedRowKeys={me.props.expandkeys}
                        loading={me.props.isbusy}
                        pagination={me.props.pagination}
                        columns={columns}
                        onChange={me.handleTableChange}
                        dataSource={me.props.data} />
                </div>
            </React.Fragment>
        );
    }
}
export default BaseList