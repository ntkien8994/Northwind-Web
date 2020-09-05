import React from 'react';
import BaseList from '../../base/BaseList';
import { connect } from 'react-redux';
// import { loadData,showFormInfo } from '../../../actions/customerAction';
import { doAction } from '../../../actions/action';
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
                fixed:'left',
                allowFilter:true
            },
            {
                title: 'Tên khách hàng',
                dataIndex: 'CustomerName',
                key: 'CustomerName',
                width: 250,
                ellipsis: true,
                sorter: true,
                fixed:'left',
                allowFilter:true
            },
            {
                title: 'Tuổi',
                dataIndex: 'Age',
                key: 'Age',
                width: 80,
                ellipsis: true,
                sorter: true,
                align:'right',
                dataType:Constant.valueType.int,
                allowFilter:true
            },
            {
                title: 'Doanh số',
                dataIndex: 'Revenue',
                key: 'Revenue',
                width: 150,
                ellipsis: true,
                sorter: true,
                align:'right',
                dataType:Constant.valueType.decimal,
                allowFilter:true
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
                ellipsis: true,
            },
            {
                title: 'Ngày tạo',
                align:'center',
                dataIndex: 'CreatedDate',
                key: 'CreatedDate',
                width: 110,
                ellipsis: true,
                dataType: Constant.valueType.datetime,
                allowFilter:true
            },
            {
                title: 'Ngày sửa',
                align:'center',
                dataIndex: 'ModifiedDate',
                key: 'ModifiedDate',
                width: 110,
                ellipsis: true,
                dataType: Constant.valueType.daterange,
                allowFilter:true
            },
            {
                title: 'Ngừng theo dõi',
                align:'center',
                dataIndex: 'Inactive',
                key: 'Inactive',
                width: 90,
                dataType: Constant.valueType.boolean,
                ellipsis: true, 
                
            },
          
        ]
    }
    getFormDetail(propsFormDetail) {
        return <CustomerDetail {...propsFormDetail} />
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomerList)
