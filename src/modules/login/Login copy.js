
import React, { Component } from 'react';
import { loginAction, changeLanguage } from './actions/loginActions';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Select } from 'antd';
import { Link } from "react-router-dom";
import { langString } from '../../static/language';
// import {
//   auth,
//   facebookAuthProvider
// } from "../../firebase/firebase";
const FormItem = Form.Item;
const { Option } = Select;

class LoginForm extends Component {

  componentDidMount() {
    localStorage.clear()
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.loginAction(values);
      }
    });
  };

  handleLanguageChange(value) {
    this.props.changeLanguage(value);
    localStorage.setItem("lang", value);
  }

  // signUpFb(){
  //   auth.signInWithPopup(facebookAuthProvider).then(function(result) {
  //     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  //     debugger
  //     var token = result.credential.accessToken;
  //     // The signed-in user info.
  //     var user = result.user;
  //     // ...
  //   }).catch(function(error) {
  //     // Handle Errors here.
  //     debugger
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     // The email of the user's account used.
  //     var email = error.email;
  //     // The firebase.auth.AuthCredential type that was used.
  //     var credential = error.credential;
  //     // ...
  //   });
  // }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (<div className="gx-login-container">
      <div className="gx-login-content">
        <div className="gx-login-header">
          {/* <img src={require("../../img/login-bg.png")} style={{ width: 100, borderRadius:5 }} alt="yellowCow" title="yellowCow" /> */}
          
        </div>
        <div className="gx-mb-4 gx-text-center">
          <h2>{langString.loginHead}</h2>
        </div>
        <Form onSubmit={this.handleSubmit} className="gx-login-form gx-form-row0">
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{
                type: 'email',
                message: 'The input is not valid email',
              }, { required: true, message: 'Please enter your email' }],
            })(
              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please enter your password' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {/* {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )} */}
            {/* <Link className="gx-login-form-forgot" to="/forgot">Forgot password?</Link>
            <span className="pull-right"><Link className="gx-login-form-forgot" to="/signup">Sign Up</Link></span> */}
          </FormItem>
          <FormItem className="gx-text-center">
            <Button type="primary" style={{width:'100%'}} htmlType="submit">
              {langString.loginBtn}
            </Button>
          </FormItem>
          {/* <FormItem className="gx-text-center">
            <Button type="primary" onClick={this.signUpFb.bind(this)}>
              Sign Up with facebook
            </Button>
          </FormItem> */}
        </Form>
        
      </div>
    </div>);
  }
}

function mapStateToProps(state) {
  return { language: state.login.language };
}

const Login = Form.create({ name: 'login' })(LoginForm);

export default connect(mapStateToProps, { loginAction, changeLanguage })(Login);
