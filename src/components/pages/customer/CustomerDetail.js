import React from 'react';  
import BaseDictionaryDetail from '../../base/BaseDictionaryDetail';
import { Modal, Form, Checkbox,Button,Row,Col,Input } from 'antd';
//description: Form chi tiết khách hàng
//-------------------------------------
//created by: ntkien 
//created date: 24.08.2020
class CustomerDetail extends BaseDictionaryDetail {
    constructor(props) {
        super(props);
    }

    render() {
        var me = this;
        return (
            <>
                <Modal title="Chi tiết khách hàng"
                    visible={me.props.showDetail}
                    centered
                    footer={[
                        <Button form="myForm" key="submit" htmlType="submit" type="primary" >
                            Cập nhật
                </Button>,
                        <Button key="back" type="primary" danger onClick={me.handleCancel}>
                            Hủy bỏ
                </Button>,
                    ]}
                    onCancel={me.handleCancel}
                    width={500}>
                    <React.Fragment>
                        {
                            me.props.loadingDetail ?
                                <div className="center50 pdtop10">
                                    {
                                        me.getReactLoading({ type: 'spin', color: '#20a8d8', height: '50px', width: '50px' })
                                    }
                                </div> :
                                <Form
                                    id="myForm"
                                    initialValues={me.props.masterData}
                                    onFinish={me.onFinish}
                                    name="basic"
                                >
                                    <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                                        <Col span={4}><label className='label-form ant-form-item-required' >Mã khách hàng</label></Col>
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
                                        <Col span={4}><label className='label-form ant-form-item-required' >Tên khách hàng</label></Col>
                                        <Col span={20}>
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
                                    {/* <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>

                                            <Col span={4}><label className='label-form' >Tên khách hàng</label></Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    name="CustomerName"
                                                >
                                                    <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="" />
                                                </Form.Item>

                                            </Col>
                                            <Col span={4}>
                                                <div className="ant-form-item-label"><label className='label-form ant-form-item-required' >Ngày hiệu lực</label></div>
                                            </Col>
                                            <Col span={8}>

                                                <Form.Item
                                                    name="NGAY_HIEU_LUC"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Ngày hiệu lực không được để trống.',
                                                        }
                                                    ]}
                                                >
                                                    <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="" />
                                                </Form.Item>
                                            </Col>
                                        </Row> */}
                                    <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                                        <Col span={4}><label className='label-form' >Điện thoại</label></Col>
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
                                        <Col span={4}><label className='label-form' >Địa chỉ</label></Col>
                                        <Col span={20}>
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
                                        <Col span={24}>
                                            <Form.Item  name="Inactive" valuePropName="checked">
                                                <Checkbox>Ngừng theo dõi</Checkbox>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                        }
                    </React.Fragment>

                </Modal>
            </>
        );
    }
}
export default CustomerDetail