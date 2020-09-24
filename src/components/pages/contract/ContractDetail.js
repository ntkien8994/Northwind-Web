import React from 'react';
import BaseMasterDetail from '../../base/BaseMasterDetail';
import { Form, Row, Col, Input, DatePicker, Select, Tabs, Button, Space } from 'antd';
import { connect } from 'react-redux';
import { doAction } from '../../../actions/action';
import * as Constant from '../../../utility/Constant';
import LabelForm from '../../controls/LabelForm';
import GridTable from '../../controls/GridTable';
import { PlusOutlined, LineOutlined } from '@ant-design/icons';
import * as common from '../../../utility/common';

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
        this.grd = React.createRef();
    }

    acceptChange = (record) => {
        var me = this;
        record.UnitPrice = record.UnitPrice;
        record.Amount = record.Quantity * record.UnitPrice;
        record.TotalAmount = record.Quantity * record.UnitPrice - record.Amount * record.PromotionRate / 100;
        me.grd.current.updateGrid();
    }
    disableControl(){
        var me=this;
        me.grd.current.updateGridToView();
    }
    getForm() {
        var me = this;
        var isViewMode = (me.props.editMode === Constant.editMode.none);
        var disableDeleteRow = (me.props.detailData && me.props.detailData.length > 0) ? false : true;

        var customers = me.props.customers ? me.props.customers : [];
        var details = me.props.detailData.filter(x => !(x.EditMode && x.EditMode === Constant.entityEditMode.delete));
        var propsTable = {
            columns: me.getColumnsDetail(),
            data: details ? [...details] : [],
            scrollheight: 160,
            rkey: "RowId",
            allowEdit: true,
            disabled:  isViewMode ,
            acceptChange: me.acceptChange
        }
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
                            <Input disabled={isViewMode} />
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
                            <DatePicker disabled={isViewMode} style={{ width: '100%' }} format={Constant.FORMAT_DATE} />
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
                            <Input disabled={isViewMode} />
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
                            <Input disabled={isViewMode} />
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
                            <Input disabled={isViewMode} />
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
                            <Select disabled={isViewMode} allowClear
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
                            <Input disabled={isViewMode} />
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
                            <Input disabled={isViewMode} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                    <Tabs defaultActiveKey="1" style={{ width: '100%', height: '250px' }} type="card" size='small'>

                        <TabPane tab="Chi tiết" key="1">
                            <GridTable

                                ref={me.grd}
                                {...propsTable}
                            />
                        </TabPane>
                    </Tabs>
                </Row>
                <div className='cls-fn-detail'>
                    <Space>
                        <Button disabled={isViewMode} type="primary" onClick={me.addNewRow} style={{ backgroundColor: isViewMode ? '#ddd' : '#52c41a' }} icon={<PlusOutlined />} size='small' >Thêm</Button>
                        <Button disabled={disableDeleteRow || isViewMode} type="primary" onClick={me.deleteRow} danger icon={<LineOutlined />} size='small' >Xóa</Button>
                    </Space>
                </div>
            </>
        )
    }
    getDetailDataForSave(){
        var me=this;
        return [
            {
                TableName:'ContractDetail',
                Value:me.props.detailData
            }
        ]
    }
    addNewRow = () => {
        var me = this;
        var param = me.initNewRow();

        me.props.doAction(Constant.ContractAction.ADD_ROW, param);
        if (me.grd && me.grd.current) {
            me.grd.current.focusRow(param)
        }
    }
    deleteRow = () => {
        var me = this;
        var param = me.grd.current.getCurrent();
        if (param) {
            me.props.doAction(Constant.ContractAction.DELETE_ROW, param);
        }
        var details = me.props.detailData.filter(x => x.RowId != param.RowId);
        if (me.grd && me.grd.current && details.length > 0) {
            me.grd.current.setCurrent(details[0]);
        }
    }
    getColumnsDetail() {
        var me = this;
        return [
            {
                title: 'Tên hàng hóa',
                dataIndex: 'ProductId',
                key: 'ProductId',
                width: 200,
                ellipsis: true,
                editable: true,
                required: true,
                valuekey: 'ProductId',
                memberkey: 'ProductName',
                datasource: me.props.products
            },
            {
                title: 'Số lượng',
                dataIndex: 'Quantity',
                key: 'Quantity',
                width: 80,
                ellipsis: true,
                align: 'right',
                editable: true,
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
                editable: true
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
                dataType: Constant.valueType.percent,
                editable: true
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
    initNewRow() {
        var me = this;
        return {
            RowId: common.getMaxId(me.props.detailData, 'RowId'),
            ContractDetailId: common.getnewid(),
            ContractId: me.props.masterData[me.props.primaryKey],
            ProductId: null,
            ProductName: 'a',
            UnitPrice: 0,
            Quantity: 0,
            Amount: 0,
            PromotionRate: 0,
            TotalAmount: 0,
            EditMode: Constant.entityEditMode.add
        }
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(ContractDetail)