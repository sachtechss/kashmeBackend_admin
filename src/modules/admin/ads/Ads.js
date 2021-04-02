
import React, { Component } from 'react';
import { Button, Form, Input, Row, Col,InputNumber } from "antd";
import { connect } from 'react-redux';
import { getadsData, updateAds } from '../actions/adminActions';
import { API_URL } from '../../../actions/utilAction';

import axios from 'axios';
import * as constant from '../../../actions/constant';
import toastr from 'toastr';

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
const FormItem = Form.Item;

const data = [
    { name: '10/12/2019', click: 2, traffic: 1},
    { name: '11/12/2019', click: 1, traffic: 1},
    { name: '12/12/2019', click: 2, traffic: 10 },
    { name: '13/12/2019', click: 1, traffic: 15},
    { name: '10/12/2019', click: 2, traffic: 1},
    { name: '11/12/2019', click: 3, traffic: 1},
    { name: '12/12/2019', click: 2, traffic: 10},
    { name: '13/12/2019', click: 5, traffic: 0 },
    { name: '10/12/2019', click: 2, traffic: 1},
    { name: '11/12/2019', click: 1, traffic: 14},

];

class Ads extends Component {

    constructor(props) {
        super(props);
        this.state = {
            adsData: [],

        };
        this.formUpdate = this.props.form.setFieldsValue.bind(this);
    }

    async componentDidMount() {

        
         
        let access_token = localStorage.access_token;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
        }
        
        const response = await axios.get(API_URL + constant.ADS_DATA, config)
            
        if (response.data.status === true) {
            
            this.props.form.setFieldsValue({ adsId: response.data.data.test_id, adsPostion: response.data.data.test_position})
        }
    }
  
    
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            let obj = {
                test_id: values.adsId,
                test_position: values.adsPostion
            }
            if (!err) {
                this.props.updateAds(obj)
            }
        });
    };

    updateFielsd = () =>{
        alert('update')
        //this.props.form.setFieldsValue({ adsId: response.data.data.test_id, adsPostion: response.data.data.test_position })
    }
    // componentWillReceiveProps(nextProps) {
    //     let data = nextProps.adsData;
    //     this.setState({ adsData: data });
    // }
    clear_data = () => {
        this.setState({ adsData: [] });
        this.props.form.setFieldsValue({ adsId: '', adsPostion: '' })
    }

    render() {

        let state = this.state;

       

        const { getFieldDecorator } = this.props.form;
       
        return (
            <>
            <Row>
                <div className="gx-ads-container">
                    <div className="gx-ads-content">


                        <div className="gx-mb-4">
                            <h2>Manage Ads</h2>
                            <p></p>
                        </div>


                        <Form onSubmit={this.handleSubmit} className="gx-login-form gx-form-row0">
                            <FormItem
                                label="Google Ad ID"
                            >
                                {getFieldDecorator('adsId', {
                                    rules: [{
                                        required: true, message: 'Please enter ad ID',
                                    }],
                                })(
                                    <Input type="text" placeholder="Google Ad Id" />
                                )}
                            </FormItem>

                            <FormItem
                                label="Ad Positon Length"
                            >
                                {getFieldDecorator('adsPostion', {
                                    rules: [{
                                        required: true, message: 'Please enter Ad Postion'
                                    }],
                                })(
                                    <Input type="number" placeholder="Ad Position length" />
                                )}
                            </FormItem>
                            <FormItem>
                                <Row>
                                    <Col span={1}>
                                        <Button type="primary" htmlType="submit">
                                            Save
                            </Button>
                                    </Col>
                                    <Col span={2} offset={4}>
                                        <Button type="primary" htmlType="button" onClick={this.clear_data}>
                                            Clear
                            </Button>
                                    </Col>
                                </Row>

                            </FormItem>

                        </Form>


                    </div>
                </div>
                </Row>                    
                <Row>
                    <div className="gx-mb-4" style={{ 'text-align': 'center' }}>
                        <h2></h2>
                    </div>
                    <Col lg={24} md={24} xs={24}  >

                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <BarChart
                                    width={800}
                                    height={400}
                                    data={data}
                                    margin={{
                                        top: 10, right: 30, left: 0, bottom: 0
                                    }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="_id" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="click" fill="#F9897F" />
                                    <Bar dataKey="traffic" fill="#8884d8" />

                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Col>
                </Row>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        adsData: state.admin.adsData
    };
}

const WrappedAdForm = Form.create({ name: 'ads' })(Ads);
export default connect(mapStateToProps, { getadsData ,updateAds })(WrappedAdForm);
