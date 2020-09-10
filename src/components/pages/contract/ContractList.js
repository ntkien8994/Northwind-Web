import React from 'react';
import BaseList from '../../base/BaseList';
import { connect } from 'react-redux';
import { doAction } from '../../../actions/action';
import ContractDetail from './ContractDetail';
import * as Constant from '../../../utility/Constant';

const mapStateToProps = state => {
    return {
        ...state.contracts
    }
}
const mapDispatchToProps = dispatch => {
    return {
        doAction: (type, param) => dispatch(doAction(type, param))
    }
}
class ContractList extends BaseList {
    getColumnsDetail() {
        var me = this;
        return [
            {
                title: 'Mã hàng hóa',
                dataIndex: 'ProductCode',
                key: 'ProductCode',
                width: 120,
                ellipsis: true,
            },
            {
                title: 'Tên hàng hóa',
                dataIndex: 'ProductName',
                key: 'ProductName',
                width: 200,
                ellipsis: true,
            },
            {
                title: 'Số lượng',
                dataIndex: 'Quantity',
                key: 'Quantity',
                width: 80,
                ellipsis: true,
                align: 'right',
                dataType: Constant.valueType.int,
            },
            {
                title: 'Đơn giá',
                dataIndex: 'UnitPrice',
                key: 'UnitPrice',
                width: 150,
                ellipsis: true,
                align: 'right',
                dataType: Constant.valueType.decimal,
            },
            {
                title: 'Thành tiền',
                dataIndex: 'Amount',
                key: 'Amount',
                width: 150,
                ellipsis: true,
                align: 'right',
                dataType: Constant.valueType.decimal,
            },
            {
                title: '% Khuyến mại',
                dataIndex: 'PromotionRate',
                key: 'PromotionRate',
                width: 150,
                ellipsis: true,
                align: 'right',
                dataType: Constant.valueType.decimal,
            },
            {
                title: 'Tổng tiền',
                dataIndex: 'TotalAmount',
                key: 'TotalAmount',
                width: 150,
                ellipsis: true,
                align: 'right',
                dataType: Constant.valueType.decimal,
            }
        ]
    }
    getColumns() {
        var me = this;
        return [
            {
                title: 'Mã hợp đồng',
                dataIndex: 'ContractCode',
                key: 'ContractCode',
                width: 150,
                ellipsis: true,
                sorter: true,
                fixed: 'left',
                allowFilter: true
            },
            {
                title: 'Tên công ty',
                dataIndex: 'CompanyName',
                key: 'CompanyName',
                width: 250,
                ellipsis: true,
                sorter: true,
                fixed: 'left',
                allowFilter: true
            },
            {
                title: 'Số điện thoại',
                dataIndex: 'Tel',
                key: 'Tel',
                width: 100,
                ellipsis: true,
                allowFilter: true
            },
            {
                title: 'Người liên hệ',
                dataIndex: 'ContactName',
                key: 'ContactName',
                width: 180,
                ellipsis: true,
                allowFilter: true
            },
            {
                title: 'Giá trị hợp đồng',
                dataIndex: 'ContractAmount',
                key: 'ContractAmount',
                width: 150,
                ellipsis: true,
                sorter: true,
                align: 'right',
                dataType: Constant.valueType.decimal,
                allowFilter: true
            },
            {
                title: 'Ngày nhập kho',
                align: 'center',
                dataIndex: 'InputDate',
                key: 'InputDate',
                width: 150,
                ellipsis: true,
                dataType: Constant.valueType.datetime,
                allowFilter: true,
                sorter: true,
            }
        ]
    }

    getFormDetail(propsFormDetail) {
        return <ContractDetail {...propsFormDetail} />
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContractList)