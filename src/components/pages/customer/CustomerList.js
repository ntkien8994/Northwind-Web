import React from 'react';
import BaseList from '../../base/BaseList';
import { connect } from 'react-redux';
import { loadData } from '../../../actions/customerAction';
const mapStateToProps = state => {
    return {
        ...state.customers
    }
}
const mapDispatchToProps = dispatch => {
    return {
        loadData: (param) => dispatch(loadData(param))
    }
}
class CustomerList extends BaseList {
    getColumns() {
        return [
            {
                title: 'Name',
                dataIndex: 'CustomerName',
                key: 'CustomerName',
                width: '30%',
            },
            {
                title: 'Customer Code',
                dataIndex: 'CustomerCode',
                key: 'CustomerCode',
                width: '20%',
            },
            {
                title: 'Address',
                dataIndex: 'Address',
                key: 'Address',
                width: '50%',
            },
        ]
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomerList)
