import React from 'react';
import BaseList from '../../base/BaseList';
import { connect } from 'react-redux';
// import { loadData,showFormInfo } from '../../../actions/customerAction';
import { doAction } from '../../../actions/action';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import CustomerDetail from './CustomerDetail';
import * as Constant from '../../../utility/Constant';

const mapStateToProps = state => {
    return {
        ...state.customers
    }
}
const mapDispatchToProps = dispatch => {
    return {
        doAction: (type,param) => dispatch(doAction(type,param))
    }
}
class CustomerList extends BaseList {
    getColumns() {
        var me=this;
        return [
            {
                title: 'Customer Code',
                dataIndex: 'CustomerCode',
                key: 'CustomerCode',
                width: 150,
                ellipsis: true,
            },
            {
                title: 'Name',
                dataIndex: 'CustomerName',
                key: 'CustomerName',
                width: 250,
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
                render: (text, record, index) => {
                    return (
                        <React.Fragment>
                            <Space size={20}>
                                <a title='Sửa' onClick={()=>{
                                    debugger
                                    me.gridCommand_Click(Constant.commandName.edit,record[me.props.primaryKey])
                                    }}><EditOutlined /></a>
                                <a title='Xóa' onClick={()=>me.gridCommand_Click(Constant.commandName.delete,record[me.props.primaryKey])} style={{ color: 'red' }} ><DeleteOutlined /></a>
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
