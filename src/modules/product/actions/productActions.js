/** Product Actions  */

import {
    actionCreator,
    productActionTypes,
    jsonApiHeader,
} from './../constants/apiConstants';
import { API_URL } from '../../../actions/utilAction';
import axios from 'axios';
import * as constant from '../../../actions/constant';
import history from '../../../history';
import toastr from 'toastr';

let access_token = localStorage.access_token;

const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
    },
}


export function getProductList(obj) {
    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }
    // return (dispatch) => {
    //     axios.post(API_URL + constant.PRODUCT_LIST, obj, config)
    //         .then(function (response) {
    //             if (response.data.status === true) {
    //                 dispatch(actionCreator(productActionTypes.get_products.SUCCESS, { productList: response.data.data }));
    //             }
    //         });
    // };
    return (dispatch) => {
        axios.get(API_URL + constant.USER_PRODUCT_LIST + '?userId=' + obj.userId + '&page=1', config)
            .then(function (response) {
                if (response.data.status === true) {
                    //  console.log('productresponse',response)
                    dispatch(actionCreator(productActionTypes.get_products.SUCCESS, { productList: response.data.data }));
                } else if (response.data.status === false) {
                    dispatch(actionCreator(productActionTypes.get_products.SUCCESS, { productList: response.data.data }));
                }
            });
    };
}

export function getProductDetails(obj) {
    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }
    return (dispatch) => {
        axios.get(API_URL + constant.PRODUCTS_DETAILS + '?id=' + obj.productId, config)
            .then(function (response) {
                if (response.data.status === true) {
                    dispatch(actionCreator(productActionTypes.product_details.SUCCESS, { productDetails: response.data.data }));
                }
            });
    };
}

export function getProductDelete(obj) {

    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }
    return (dispatch) => {
        
        
        axios.delete(API_URL + constant.PRODUCT, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
            data: obj
        })
            .then(function (response) {
                if (response.data.status === true) {
                    toastr.success(response.data.message)
                    history.goBack()
                } else if (response.data.status === false) {
                    toastr.warning(response.data.message)
                }
            }).catch(error => {
                toastr.warning(error.response.data.message)
    
            });
    };
}