import React from 'react';
import BaseDictionaryDetail from '../../base/BaseDictionaryDetail';
import { Modal, Form, Checkbox, Button, Row, Col, Input, InputNumber,DatePicker } from 'antd';
import { connect } from 'react-redux';
import { doAction } from '../../../actions/action';
import * as Constant from '../../../utility/Constant';
import LabelForm from '../../controls/LabelForm';

//description: Form chi tiết khách hàng
//-------------------------------------
//created by: ntkien 
//created date: 24.08.2020

const mapStateToProps = state => {
    return {
        ...state.products
    }
}
const mapDispatchToProps = dispatch => {
    return {
        doAction: (type, param) => dispatch(doAction(type, param)),
    }
}
class ProductDetail extends BaseDictionaryDetail {
    constructor(props) {
        super(props);
    }

    getForm() {
        var me = this;
        return (
            <>
                <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                    <Col span={6}>
                        <LabelForm required >Mã sản phẩm</LabelForm>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="ProductCode"
                            rules={[
                                {
                                    max: 50,
                                    type: 'string',
                                    message: 'Mã sản phẩm không được nhập nhiều hơn 50 ký tự.',
                                },
                                {
                                    required: true,
                                    message: 'Mã sản phẩm không được để trống.',
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                    <Col span={6}>
                        <LabelForm required >Tên sản phẩm</LabelForm>
                    </Col>
                    <Col span={18}>
                        <Form.Item
                            name="ProductName"
                            rules={[
                                {
                                    max: 250,
                                    type: 'string',
                                    message: 'Tên sản phẩm không được nhập nhiều hơn 250 ký tự.',
                                },
                                {
                                    required: true,
                                    message: 'Tên sản phẩm không được để trống.',
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
               
                <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                    <Col span={6}>
                        <LabelForm>Giá</LabelForm>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="UnitPrice"
                        >
                            <InputNumber style ={{width:'100%'}} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                    <Col span={6}>
                        <LabelForm >Ngày nhập</LabelForm>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="InputDate"
                        >
                            <DatePicker style ={{width:'100%'}} format={Constant.FORMAT_DATE} />
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                    <Col span={6}>
                        <LabelForm >Ghi chú</LabelForm>
                    </Col>
                    <Col span={18}>
                        <Form.Item
                            name="Description"
                            rules={[
                                {
                                    max: 250,
                                    type: 'string',
                                    message: 'Ghi chú không được nhập nhiều hơn 250 ký tự.',
                                }
                            ]}
                        >
                            <Input.TextArea rows={2} />
                        </Form.Item>


                    </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                    <Col span={6}></Col>
                    <Col span={18}>
                        <Form.Item name="Inactive" valuePropName="checked">
                            <Checkbox disabled={me.props.editMode == Constant.editMode.add} >Ngừng theo dõi</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>

            </>
        )
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)