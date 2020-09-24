import React from 'react';
import BaseList from '../../base/BaseList';
import { connect } from 'react-redux';
import { doAction } from '../../../actions/action';
import ProductDetail from './ProductDetail';
import * as Constant from '../../../utility/Constant';

const mapStateToProps = state => {
    return {
        ...state.products
    }
}
const mapDispatchToProps = dispatch => {
    return {
        doAction: (type, param) => dispatch(doAction(type, param))
    }
}
class ProductList extends BaseList {

    getColumns() {
        var me = this;
        return [
            {
                title: 'Mã sản phẩm',
                dataIndex: 'ProductCode',
                key: 'ProductCode',
                width: 150,
                ellipsis: true,
                sorter: true,
                fixed:'left',
                allowFilter:true
            },
            {
                title: 'Tên sản phẩm',
                dataIndex: 'ProductName',
                key: 'ProductName',
                width: 250,
                ellipsis: true,
                sorter: true,
                fixed:'left',
                allowFilter:true,
            },
            {
                title: 'Giá',
                dataIndex: 'UnitPrice',
                key: 'UnitPrice',
                width: 150,
                ellipsis: true,
                sorter: true,
                align:'right',
                dataType:Constant.valueType.decimal,
                allowFilter:true
            },
            
            {
                title: 'Ghi chú',
                dataIndex: 'Description',
                key: 'Description',
                ellipsis: true,
            },
            {
                title: 'Ngày nhập kho',
                align:'center',
                dataIndex: 'InputDate',
                key: 'InputDate',
                width: 150,
                ellipsis: true,
                dataType: Constant.valueType.datetime,
                allowFilter:true,
                sorter: true,
            },
            {
                title: 'Ngừng theo dõi',
                align:'center',
                dataIndex: 'Inactive',
                key: 'Inactive',
                width: 90,
                dataType: Constant.valueType.boolean,
                ellipsis: true, 
                
            }          
        ]
    }
    getFormDetail(propsFormDetail) {
        return <ProductDetail {...propsFormDetail} />
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
