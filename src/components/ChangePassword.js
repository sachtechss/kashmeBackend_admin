import React, { Component } from "react";
import { Button, Form, Input } from "antd";
import { changePassword } from '../modules/login/actions/loginActions';
import { connect } from 'react-redux';

const FormItem = Form.Item;

class ChangePassword extends Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();
        
        this.props.form.validateFields((err, values) => {
            let obj = {
                //email: this.props.userInfo.email,
                oldPassword: values.currentpassword,
                newpassword: values.password
            }
            if (!err) {
                console.log('passsword',obj)
                this.props.changePassword(obj);
                this.props.form.resetFields()
            }
        });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        
        return (
            <div className="gx-login-container">
                <div className="gx-login-content">

                    <div className="gx-login-header">
                        <img src={require("../img/logo.png")} style={{ width: 100,borderRadius:5 }} alt="yellowCow" title="yellowCow" />
                    </div>
                    <div className="gx-mb-4">
                        <h2>Reset Password</h2>
                        <p></p>
                    </div>


                    <Form onSubmit={this.handleSubmit} className="gx-login-form gx-form-row0">
                        <FormItem>
                            {getFieldDecorator('currentpassword', {
                                rules: [{
                                    required: true, message: 'Please enter your current password',
                                }],
                            })(
                                <Input type="password" placeholder="Current Password" />
                            )}
                        </FormItem>

                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: 'Please enter your new password',
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
                                    required: true, message: 'Please confirm your new password',
                                }, {
                                    validator: this.compareToFirstPassword,
                                }],
                            })(
                                <Input placeholder="Retype New Password" type="password" onBlur={this.handleConfirmBlur} />
                            )}
                        </FormItem>

                        <FormItem>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </FormItem>
                    </Form>


                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {userInfo: state.login.authData};
}

const WrappedChangePasswordForm = Form.create({ name: 'reset' })(ChangePassword);

export default connect(mapStateToProps, { changePassword })(WrappedChangePasswordForm);

