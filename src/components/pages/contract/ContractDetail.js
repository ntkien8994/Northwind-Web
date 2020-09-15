import React from 'react';
import BaseMasterDetail from '../../base/BaseMasterDetail';
import { Form, Row, Col, Input, DatePicker, Select, Tabs, Button, Space } from 'antd';
import { connect } from 'react-redux';
import { doAction } from '../../../actions/action';
import * as Constant from '../../../utility/Constant';
import LabelForm from '../../controls/LabelForm';
import GridTable from '../../controls/GridTable';
import { PlusOutlined, LineOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TabPane } = Tabs;
//description: Form chi tiết hợp đồng
//-------------------------------------
//created by: ntkien 
//created date: 24.08.2020

const mapStateToProps = state => {
    return {
        ...state.contracts
    }
}
const mapDispatchToProps = dispatch => {
    return {
        doAction: (type, param) => dispatch(doAction(type, param)),
    }
}
class ContractDetail extends BaseMasterDetail {
    constructor(props) {
        super(props);
    }

    getColumnsDetail() {
        var me = this;
        return [
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
                width: 100,
                ellipsis: true,
                align: 'right',
                dataType: Constant.valueType.decimal,
            },
            {
                title: 'Thành tiền',
                dataIndex: 'Amount',
                key: 'Amount',
                width: 110,
                ellipsis: true,
                align: 'right',
                dataType: Constant.valueType.decimal,
            },
            {
                title: '% Khuyến mại',
                dataIndex: 'PromotionRate',
                key: 'PromotionRate',
                width: 100,
                ellipsis: true,
                align: 'right',
                dataType: Constant.valueType.decimal,
            },
            {
                title: 'Tổng tiền',
                dataIndex: 'TotalAmount',
                key: 'TotalAmount',
                width: 110,
                ellipsis: true,
                align: 'right',
                dataType: Constant.valueType.decimal,
            }
        ]
    }
    getForm() {
        var me = this;
        var customers = me.props.customers ? me.props.customers : [];
        return (
            <>
                <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                    <Col span={3}>
                        <LabelForm required >Mã hợp đồng</LabelForm>
                    </Col>
                    <Col span={5}>
                        <Form.Item
                            name="ContractCode"
                            rules={[
                                {
                                    max: 50,
                                    type: 'string',
                                    message: 'Mã hợp đồng không được nhập nhiều hơn 50 ký tự.',
                                },
                                {
                                    required: true,
                                    message: 'Mã hợp đồng không được để trống.',
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <LabelForm required >Ngày hợp đồng</LabelForm>
                    </Col>
                    <Col span={5}>
                        <Form.Item
                            name="ContractDate"
                            rules={[
                                {
                                    required: true,
                                    message: 'Ngày hợp đồng không được để trống.',
                                }
                            ]}
                        >
                            <DatePicker style={{ width: '100%' }} format={Constant.FORMAT_DATE} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                    <Col span={3}>
                        <LabelForm required >Tên công ty</LabelForm>
                    </Col>
                    <Col span={21}>
                        <Form.Item
                            name="CompanyName"
                            rules={[
                                {
                                    max: 250,
                                    type: 'string',
                                    message: 'Tên công ty không được nhập nhiều hơn 250 ký tự.',
                                },
                                {
                                    required: true,
                                    message: 'Tên công ty không được để trống.',
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                    <Col span={3}>
                        <LabelForm >Số điện thoại</LabelForm>
                    </Col>
                    <Col span={5}>
                        <Form.Item
                            name="Tel"
                            rules={[
                                {
                                    max: 50,
                                    type: 'string',
                                    message: 'Số điện thoại không được nhập nhiều hơn 50 ký tự.',
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <LabelForm >Fax</LabelForm>
                    </Col>
                    <Col span={5}>
                        <Form.Item
                            name="Fax"
                            rules={[
                                {
                                    max: 50,
                                    type: 'string',
                                    message: 'Fax không được nhập nhiều hơn 50 ký tự.',
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                    <Col span={3}>
                        <LabelForm>Khách hàng</LabelForm>
                    </Col>
                    <Col span={5}>
                        <Form.Item
                            name="CustomerId"
                        >
                            <Select allowClear
                                showSearch
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    customers.map((item, index) => {
                                        return (<Option key={item.CustomerId} value={item.CustomerId}>{item.CustomerName}</Option>)
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <LabelForm  >Người liên hệ</LabelForm>
                    </Col>
                    <Col span={5}>
                        <Form.Item
                            name="ContactName"
                            rules={[
                                {
                                    max: 50,
                                    type: 'string',
                                    message: 'Người liên hệ không được nhập nhiều hơn 250 ký tự.',
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <LabelForm title='Số điện thoại liên hệ' >SĐT liên hệ</LabelForm>
                    </Col>
                    <Col span={5}>
                        <Form.Item
                            name="ContactTel"
                            rules={[
                                {
                                    max: 50,
                                    type: 'string',
                                    message: 'Số điện thoại không được nhập nhiều hơn 50 ký tự.',
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                    <Tabs defaultActiveKey="1" style={{ width: '100%', height: '230px' }} type="card" size='small'>

                        <TabPane tab="Chi tiết" key="1">
                            <div style={{
                                borderLeft: '1px solid #ddd',
                                borderBottom: '1px solid #ddd',
                            }}>
                                <GridTable
                                    columns={me.getColumnsDetail()}
                                />
                            </div>
                        </TabPane>
                    </Tabs>
                </Row>
                <div className='cls-fn-detail'>
                    <Space>
                        <Button type="primary" style={{ backgroundColor: '#52c41a' }} icon={<PlusOutlined />} size='small' >Thêm</Button>
                        <Button type="primary" danger icon={<LineOutlined />} size='small' >Xóa</Button>
                    </Space>

                </div>
            </>
        )
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(ContractDetail)