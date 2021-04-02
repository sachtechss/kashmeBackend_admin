
import React, { Component } from 'react';
import { registerUser } from '../login/actions/loginActions';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { Link } from "react-router-dom";

const FormItem = Form.Item;

class SignUpForm extends Component {

    componentDidMount() {
        localStorage.clear()
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let obj = {
                    firstname: values.firstname,
                    lastname: values.lastname,
                    email: values.email,
                    password: values.password,
                    signup_type: "email",
                }
                this.props.registerUser(obj);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (<div className="gx-login-container">
            <div className="gx-login-content">
                <div className="gx-login-header">
                    <img src={require("../../img/logo.png")} style={{ width: 100,borderRadius:5 }} alt="yellowCow" title="yellowCow" />
                </div>
                <div className="gx-mb-4 gx-text-center">
                    <h2>Sign Up</h2>
                </div>
                <Form onSubmit={this.handleSubmit} className="gx-login-form gx-form-row0">
                    <FormItem>
                        {getFieldDecorator('firstname', {
                            rules: [{ required: true, whitespace: true, message: 'Please enter firstname' }],
                        })(
                            <Input placeholder="Firstname" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('lastname', {
                            rules: [{ required: true, whitespace: true, message: 'Please enter lastname' }],
                        })(
                            <Input placeholder="Lastname" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email',
                                message: 'The input is not valid email',
                            }, { required: true, message: 'Please enter your email' }],
                        })(
                            <Input placeholder="Email" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: 'Please enter your password' },
                                {
                                    max: 20, message: 'Maximum 20 characters allowed',
                                }, {
                                    min: 6, message: 'Minimum 6 characters required',
                                }],
                        })(
                            <Input type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        {/* {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                            })(
                            <Checkbox>Remember me</Checkbox>
                            )} */}
                        <Link className="gx-login-form-forgot" to="/">Sign In</Link>
                    </FormItem>
                    <FormItem className="gx-text-center">
                        <Button type="primary" htmlType="submit" style={{width:'100%'}}>
                            CREATE MY ACCOUNT
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </div>);
    }
}

function mapStateToProps(state) {
    return {};
}

const SignUp = Form.create({ name: 'signup' })(SignUpForm);

export default connect(mapStateToProps, { registerUser })(SignUp);
