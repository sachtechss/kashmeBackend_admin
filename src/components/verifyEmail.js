import React, { Component } from "react";
import { verifyEmail } from '../modules/login/actions/loginActions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Result } from 'antd';

class VerifyEmail extends Component {

    componentDidMount() {
        let obj = {
            verification_token: this.props.match.params.verificationkey
        }
        this.props.verifyEmail(obj)
    }

    render() {

        return (
            <div className="gx-login-container">
                <div className="gx-login-content">
                    <Result
                        status={this.props.verifiedEmail ? "success" : "warning"}
                        title={this.props.verifiedEmail ? "Your email has been verified" : "Process is pending"}
                        subTitle=""
                        extra={[
                            <Link className="gx-login-form-forgot" to="/">Sign In</Link>
                        ]}
                    />
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return { verifiedEmail: state.login.emailVerified };
}

export default connect(mapStateToProps, { verifyEmail })(VerifyEmail);

