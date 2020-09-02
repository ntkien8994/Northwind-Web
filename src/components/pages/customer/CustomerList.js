import React from 'react';
import BaseList from '../../base/BaseList';
import { connect } from 'react-redux';
// import { loadData,showFormInfo } from '../../../actions/customerAction';
import { doAction } from '../../../actions/action';
import { DeleteOutlined, EditOutlined,QuestionCircleOutlined } from '@ant-design/icons';
import { Space,Popconfirm } from 'antd';
import CustomerDetail from './CustomerDetail';
import * as Constant from '../../../utility/Constant';

const mapStateToProps = state => {
    return {
        ...state.customers
    }
}
const mapDispatchToProps = dispatch => {
    return {
        doAction: (type, param) => dispatch(doAction(type, param))
    }
}
class CustomerList extends BaseList {
    getColumns() {
        var me = this;
        return [
            {
                title: 'Mã khách hàng',
                dataIndex: 'CustomerCode',
                key: 'CustomerCode',
                width: 150,
                ellipsis: true,
                sorter: true,
                fixed:'left'
            },
            {
                title: 'Tên khách hàng',
                dataIndex: 'CustomerName',
                key: 'CustomerName',
                width: 250,
                ellipsis: true,
                sorter: true,
                fixed:'left'
            },
            {
                title: 'Số điện thoại',
                dataIndex: 'Phone',
                key: 'Phone',
                width: 180,
                ellipsis: true,
            },
            {
                title: 'Địa chỉ',
                dataIndex: 'Address',
                key: 'Address',
                width:250,
                ellipsis: true,
            },
            {
                title: 'Ngày tạo',
                align:'center',
                dataIndex: 'CreatedDate',
                key: 'CreatedDate',
                width: 110,
                ellipsis: true,
                dataType: Constant.valueType.datetime
            },
            {
                title: 'Ngày sửa',
                align:'center',
                dataIndex: 'ModifiedDate',
                key: 'ModifiedDate',
                width: 110,
                ellipsis: true,
                dataType: Constant.valueType.daterange
            },
            {
                title: 'Ngừng theo dõi',
                align:'center',
                dataIndex: 'Inactive',
                key: 'Inactive',
                width: 90,
                dataType: Constant.valueType.bool,
                ellipsis: true, 
                
            },
          
        ]
    }
    getFormDetail(propsFormDetail) {
        return <CustomerDetail {...propsFormDetail} />
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomerList)
