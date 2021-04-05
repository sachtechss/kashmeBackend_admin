import React, { Component } from "react";
import { Button, Form, Input, Icon } from "antd";
import { Link } from "react-router-dom";
import { forgotPassword,resetPassword } from '../modules/login/actions/loginActions';
import { connect } from 'react-redux';
import { langString } from '../static/language';
import axios from 'axios';
import toastr from 'toastr';

import * as constant from '../actions/constant';
import { API_URL } from '../actions/utilAction';

const FormItem = Form.Item;

class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            steps:0,

        };
      }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                
               // this.props.forgotPassword(values,this.callBackStatus())

                let authObj = {
                    email: values.email
                }

                var self = this;

                axios.post(API_URL + constant.ADMIN_FORGOT_PASSWORD, authObj, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(function (response) {
                        if (response.data.status) {
                            self.setState({steps: 1})
                            toastr.success(response.data.message)
                        } else {
                            console.log('cbdd')
                           
                            toastr.error(response.data.message)
                        }
                    });

                this.setState({
                    email:values.email
                })
            }
        });
    };

    callBackStatus =() => {
        this.setState({
            steps:1,
        })
    }


    handleSubmitChangePassword = (e) => {
        let self = this;
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            let obj = {
                otp: values.otp,
                password: values.password,
                email: this.state.email
            }
            if (!err) {
             this.props.resetPassword(obj,this.redirectLogin)
            }
        });
    };

    redirectLogin = () => {

        this.props.history.push("/");

    };
    
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    backStep = () => {
        this.setState({
            step:0
        })
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="gx-login-container">
                <div className="gx-login-content">

                    <div className="gx-login-header">
                        {/* <img src={require("../img/logo.png")} style={{ width: 100, borderRadius:5  }} alt="yellowCow" title="yellowCow" /> */}
                    </div>

                    {this.state.steps === 0 ? 
                    (<>
                        <div className="gx-mb-4 gx-text-center">
                    <h2 style={{'color':'#261f71',fontWeight:'600',marginBottom:'3.5rem',fontSize:'3rem'}}>{langString.forgotHead}</h2>
                        <p></p>
                    </div>


                    <Form layout="vertical" onSubmit={this.handleSubmit} className="gx-login-form gx-form-row0">

                    

                        <FormItem>
                            {getFieldDecorator('email', {
                                rules: [{
                                    type: 'email', message: 'The input is not valid email',
                                }, {
                                    required: true, message: 'Please enter your email',
                                }],
                            })(
                                <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Link className="gx-login-form-forgot pull-right" style={{fontWeight:'bold',fontStyle:'italic',color:'#7b789a'}} to="/">Sign In</Link>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" style={{width:'100%',background:'#130061'}} htmlType="submit">
                                Send
                             </Button>
                        </FormItem>
                    </Form>
                    </>
                    )
                    :
                    (
                        <>

                        <div className="gx-mb-4 gx-text-center">
                    <h2 style={{'color':'#261f71',fontWeight:'600',marginBottom:'3.5rem',fontSize:'3rem'}}>Reset Password</h2>
                        <p></p>
                    </div>
                    


                    <Form onSubmit={this.handleSubmitChangePassword} className="gx-login-form gx-form-row0">

                    <FormItem>
                            {getFieldDecorator('otp', {
                                rules: [{
                                    required: true, message: 'Please enter your OTP',
                                }],
                            })(
                                <Input type="text" placeholder="OTP" />
                            )}
                        </FormItem>

                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: 'Please enter your password',
                                }, {
                                    validator: this.validateToNextPassword,
                                }, {
                                    max: 20, message: 'Maximum 20 characters allowed',
                                }, {
                                    min: 6, message: 'Minimum 6 characters required',
                                }],
                            })(
                                <Input type="password" placeholder="New Password" />
                            )}
                        </FormItem>

                        <FormItem>
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: 'Please confirm your password',
                                }, {
                                    validator: this.compareToFirstPassword,
                                }],
                            })(
                                <Input placeholder="Retype New Password" type="password" onBlur={this.handleConfirmBlur} />
                            )}
                        </FormItem>
                        <FormItem>
                        <Link className="gx-login-form-forgot" style={{fontWeight:'bold',fontStyle:'italic',color:'#7b789a'}} to="/forgot" onClick={()=>{this.setState({steps:0})}}>Back</Link>
                        
                            <Link className="gx-login-form-forgot pull-right" style={{fontWeight:'bold',fontStyle:'italic',color:'#7b789a'}} to="/">Sign In</Link>
                        </FormItem>
                        <FormItem>
                        <Button type="primary" style={{width:'100%',background:'#130061'}} htmlType="submit">
                                Submit
                            </Button>
                        </FormItem>
                    </Form>
                        </>
                    )    
                }
                    

                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {};
}

const WrappedForgotPasswordForm = Form.create()(ForgotPassword);

export default connect(mapStateToProps, { forgotPassword,resetPassword })(WrappedForgotPasswordForm);

