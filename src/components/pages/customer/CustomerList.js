import React from 'react';
import BaseList from '../../base/BaseList';
import { connect } from 'react-redux';
import { loadData,showFormInfo } from '../../../actions/customerAction';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import CustomerDetail from './CustomerDetail';
const mapStateToProps = state => {
    return {
        ...state.customers
    }
}
const mapDispatchToProps = dispatch => {
    return {
        loadData: (param) => dispatch(loadData(param)),
        showFormInfo: (param) => dispatch(showFormInfo(param)),
    }
}
class CustomerList extends BaseList {
    getColumns() {
        return [
            {
                title: 'Customer Code',
                dataIndex: 'CustomerCode',
                key: 'CustomerCode',
                width: 300,
                ellipsis: true,
            },
            {
                title: 'Name',
                dataIndex: 'CustomerName',
                key: 'CustomerName',
                width: 500,
                ellipsis: true,
            },
            {
                title: 'Address',
                dataIndex: 'Address',
                key: 'Address',
                ellipsis: true,
            },
            {
                key: 'action',
                width: 80,
                align: 'center',
                render: () => {
                    return (
                        <React.Fragment>
                            <Space size={20}>
                                <a title='Sửa'><EditOutlined /></a>
                                <a title='Xóa' style={{ color: 'red' }} ><DeleteOutlined /></a>
                            </Space>
                        </React.Fragment>
                    )
                },
            }
        ]
    }
    getFormDetail(propsFormDetail) {
        return <CustomerDetail {...propsFormDetail} />
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomerList)