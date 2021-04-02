import React, { Component } from 'react';
import Login from '../modules/login/Login';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import NoMatch from '../components/NoMatch';
import { Switch } from "react-router-dom";
import Dashboard from '../modules/admin/dashboard/Dashboard';
import Base from '../components/Base';
import SignUp from '../modules/signup/Signup';
import UserProfile from '../modules/user/userProfile';
import ProductDetails from '../modules/product/ProductDetails';
import Users from '../modules/user/User';
import Category from '../modules/master/Category';
import SubCategory from '../modules/master/Subcategory';
import Ads from '../modules/admin/ads/Ads';
import Ticket from '../modules/admin/ticket/Ticket';
import Banners from '../modules/admin/banner/Banners';
import AdminProfile from '../modules/admin/profile';
import WrappedForgotPasswordForm from '../components/ForgotPassword';
import WrappedChangePasswordForm from '../components/ChangePassword';
import WrappedResetPasswordForm from '../components/resetPassword';
import VerifyEmail from '../components/verifyEmail';
import { refreshAuthDetails, changeLanguage } from '../modules/login/actions/loginActions';
import history from '../history';
import { connect } from 'react-redux';
import { langString } from '../static/language';
import Test from '../../src/modules/test/Login';


class RoutesComponent extends Component {

    

    componentWillMount() {

        let access_token = localStorage.getItem('access_token');
        if (access_token && access_token != null) {
            this.props.refreshAuthDetails();
        } else {
            let split = this.props.location.pathname.split('/')
            let value = split[2];
            if (window.location.pathname !== "/" && window.location.pathname !== "/signup" &&
                window.location.pathname !== "/forgot" && window.location.pathname !== "/test" &&
                window.location.pathname !== "/verifyEmail/" + value && 
                window.location.pathname !== "/resetPassword/" + value) {
                history.push('/')
            }
        }
    }

    render() {
        let props = this.props;
        langString.setLanguage(localStorage.getItem("lang") ? localStorage.getItem("lang") : props.language);
        let split = props.location.pathname.split('/')
        let value = split[2];
        const listofPages = [
            '/',
            '/signup',
            '/forgot',
            '/resetPassword/' + value,
            '/verifyEmail/' + value,
            '/test'
        ];

        const token = localStorage.access_token ? true : false;

        if (listofPages.indexOf(props.location.pathname) > -1) {
            return (
                <Switch>
                    <PublicRoute exact path="/" component={Login} />
                    <PublicRoute exact path="/test" component={Test} />
                    <PublicRoute exact path="/signup" component={SignUp} />
                    <PublicRoute path="/forgot" component={WrappedForgotPasswordForm} />
                    <PublicRoute path="/resetPassword/:resetKey" component={WrappedResetPasswordForm} />
                    <PublicRoute path="/verifyEmail/:verificationkey" component={VerifyEmail} />
                </Switch>);
        } else if (props.userInfo.role === "admin") {
            return (
                <Base user={props.userInfo}>
                    <Switch>
                        <PrivateRoute path="/dashboard" component={Dashboard} user={token} />
                        <PrivateRoute path="/users" component={Users} user={token} />
                        <PrivateRoute path="/userprofile/:userId" component={UserProfile} user={token} />
                        <PrivateRoute path="/productdetails/:productId" component={ProductDetails} user={token} />
                        <PrivateRoute path="/category" component={Category} user={token} />
                        <PrivateRoute path="/subcategory/:categoryId" component={SubCategory} user={token} />
                        <PrivateRoute path="/ads" component={Ads} user={token} />
                        <PrivateRoute path="/ticket" component={Ticket} user={token} />
                        <PrivateRoute path="/reset" component={WrappedChangePasswordForm} user={token} />
                        <PrivateRoute path="/profile" component={AdminProfile} user={token} />
                        <PrivateRoute path="/banners" component={Banners} user={token} />
                        <PublicRoute path="*" component={NoMatch} />
                    </Switch>
                </Base>
            );
        } else {
            return (
                <Base user={props.userInfo}>
                    <Switch>
                        <PrivateRoute path="/dashboard" component={Dashboard} user={token} />
                        <PrivateRoute path="/users" component={Users} user={token} />
                        <PrivateRoute path="/userprofile/:userId" component={UserProfile} user={token} />
                        <PrivateRoute path="/productdetails/:productId" component={ProductDetails} user={token} />
                        <PrivateRoute path="/category" component={Category} user={token} />
                        <PrivateRoute path="/subcategory/:categoryId" component={SubCategory} user={token} />
                        <PrivateRoute path="/ads" component={Ads} user={token} />
                        <PrivateRoute path="/ticket" component={Ticket} user={token} />
                        <PrivateRoute path="/reset" component={WrappedChangePasswordForm} user={token} />
                        <PrivateRoute path="/profile" component={AdminProfile} user={token} />
                        <PrivateRoute path="/banners" component={Banners} user={token}  />
                        <PublicRoute path="*" component={NoMatch} />
                    </Switch>
                </Base>
            );
        }
    }
}
function mapStateToProps(state) {
    return {
        userInfo: state.login.authData,
        language: state.login.language
    };
}

export default connect(mapStateToProps, { refreshAuthDetails, changeLanguage })(RoutesComponent);
