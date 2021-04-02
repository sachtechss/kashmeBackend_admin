/** Login Actions  */

import {
    actionCreator,
    loginActionTypes,
    jsonApiHeader
} from './../constants/apiConstants';
import history from '../../../history.js';
import { API_URL } from '../../../actions/utilAction';
import axios from 'axios';
import toastr from 'toastr';
import * as constant from '../../../actions/constant';

let access_token = localStorage.access_token;

export function loginAction(authObj) {

    return (dispatch) => {
        axios.post(API_URL + constant.ADMIN_LOGIN, authObj, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(function (response) {


                
                if (response.data.status === true) {
                    console.log('response',response)
                    dispatch(actionCreator(loginActionTypes.post_login.SUCCESS, { errorMessage: null, access_token: response.data.data.token, authData: response.data.data }));
                    localStorage.setItem('access_token', response.data.data.token);

                    // // history.push(constant.DASHBOARD);    


                    if (typeof window !== 'undefined') {
                        console.log('ddd')
                        let url = window.location.href;
                        window.location.href = url + 'dashboard';
                    }



                    toastr.success(response.data.message)
                } else {
                    toastr.error(response.data.message)
                }
            });
    };
}

export function forgotPassword(authObj,cb) {

    return (dispatch) => {
        axios.post(API_URL + constant.ADMIN_FORGOT_PASSWORD, authObj, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(function (response) {
                if (response.data.status) {
                    console.log('cb')
                    cb()
                    toastr.success(response.data.message)
                } else {
                    console.log('cbdd')

                    toastr.error(response.data.message)
                }
            });
    };
}

export function resetPassword(obj,cb) {

    return (dispatch) => {
        console.log('objobjobj',obj)
        axios.post(API_URL + constant.ADMIN_RESET_PASSWORD, obj, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(function (response) {

                if (response.data.status === true) {
                    //history.push(constant.LOGIN);
                    toastr.success(response.data.message)

                    setTimeout(()=> {
                        cb();

                        
                        
                    },1500)

                    

                } else {
                    toastr.error(response.data.message)
                }

            });
    };
}

export function changePassword(obj) {

    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }

    return (dispatch) => {
        console.log('change',obj)
        axios.post(API_URL + constant.CHANGE_PASSWORD, obj, config)
            .then(function (response) {
                if (response.data.status === true) {
                    toastr.success(response.data.message)
                } else {
                    toastr.error(response.data.message)
                }
            }).catch(error => {
                toastr.warning(error.response.data.message)
    
            });
    };
}

export function refreshAuthDetails() {
    

    return (dispatch) => {
        axios.get(API_URL + constant.GET_AUTH_DETAILS, {
            headers: jsonApiHeader(access_token, 'application/json')
        })
            .then(function (response) {
                if (response.data.code === 200) {
                    dispatch(actionCreator(loginActionTypes.post_login.SUCCESS, { errorMessage: null, access_token: response.data.data.token, authData: response.data.data }));
                    localStorage.setItem('access_token', response.data.data.token);
                }
            });
    };
}

export function changeLanguage(lang) {
    return (dispatch) => {
        dispatch(actionCreator(loginActionTypes.change_lang.SUCCESS, { language: lang }));
    };
}

export function verifyEmail(obj) {

    return (dispatch) => {
        axios.post(API_URL + constant.VERIFY_EMAIL, obj, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(function (response) {
                if (response.data.code === 200) {
                    dispatch(actionCreator(loginActionTypes.email_verify.SUCCESS, { emailVerified: true }));
                }
            });
    };
}

export function registerUser(obj) {

    return (dispatch) => {
        axios.post(API_URL + constant.USER_REGISTER, obj, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(function (response) {
                if (response.data.code === 200) {
                    toastr.success(response.data.message)
                    history.push(constant.LOGIN);
                } else {
                    toastr.error(response.data.message)
                }
            });
    };
}



