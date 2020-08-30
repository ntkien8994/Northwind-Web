import React from 'react';
import BaseDictionaryDetail from '../../base/BaseDictionaryDetail';
import { Modal, Form, Checkbox, Button, Row, Col, Input } from 'antd';
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
        ...state.customers
    }
}
const mapDispatchToProps = dispatch => {
    return {
        doAction: (type, param) => dispatch(doAction(type, param)),
    }
}
class CustomerDetail extends BaseDictionaryDetail {
    constructor(props) {
        super(props);
    }

    getForm() {
        var me = this;
        return (
            <>
                <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                    <Col span={6}>
                        <LabelForm required >Mã khách hàng</LabelForm>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="CustomerCode"
                            rules={[
                                {
                                    max: 50,
                                    type: 'string',
                                    message: 'Mã khách hàng không được nhập nhiều hơn 50 ký tự.',
                                },
                                {
                                    required: true,
                                    message: 'Mã khách hàng không được để trống.',
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                    <Col span={6}>
                        <LabelForm required >Tên khách hàng</LabelForm>
                    </Col>
                    <Col span={18}>
                        <Form.Item
                            name="CustomerName"
                            rules={[
                                {
                                    max: 255,
                                    type: 'string',
                                    message: 'Tên khách hàng không được nhập nhiều hơn 255 ký tự.',
                                },
                                {
                                    required: true,
                                    message: 'Tên khách hàng không được để trống.',
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                    <Col span={6}>
                        <LabelForm >Điện thoại</LabelForm>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="Phone"
                            rules={[
                                {
                                    max: 50,
                                    type: 'string',
                                    message: 'Điện thoại không được nhập nhiều hơn 50 ký tự.',
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                    <Col span={6}>
                        <LabelForm >Địa chỉ</LabelForm>
                    </Col>
                    <Col span={18}>
                        <Form.Item
                            name="Address"
                            rules={[
                                {
                                    max: 255,
                                    type: 'string',
                                    message: 'Ghi chú không được nhập nhiều hơn 200 ký tự.',
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
export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetail)