/** User Actions  */
import {
    actionCreator,
    userActionTypes,
    jsonApiHeader,
} from './../constants/apiConstants';

import { loginActionTypes } from './../../login/constants/apiConstants';
import { API_URL } from '../../../actions/utilAction';
import axios from 'axios';
import * as constant from '../../../actions/constant';
import toastr from 'toastr';

let access_token = localStorage.access_token;

const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
    },
}

export function getUsers(obj) {
    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }
    return (dispatch) => {

        axios.get(API_URL + constant.USER_LIST + '?page=' + obj.page + '&limit='+obj.pageSize + '&searchString=' + obj.searchString +'&sortValue=' + obj.sortValue +'&sortOrder=' + obj.sortOrder, config)
            .then(function (response) {
                if (response.data.status === true) {

                    dispatch(actionCreator(userActionTypes.get_users.SUCCESS, { userData: response.data.data, totalCount: response.data.totalCount }));
                } else if (response.data.status === false) {
                    dispatch(actionCreator(userActionTypes.get_users.SUCCESS, { userData: response.data.data, totalCount: response.data.totalCount }));
                }
            });
    };
}

export function deActivateUser(values) {
    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }

    return (dispatch) => {
        axios.post(API_URL + constant.DEACTIVATE_USER, values, {
            headers: jsonApiHeader(access_token, 'application/json')
        }
        ).then(function (response) {
            if (response.data.code === 200) {
                axios.post(API_URL + constant.USER_LIST, values, {
                    headers: jsonApiHeader(access_token, 'application/json')
                })
                    .then(function (response) {
                        if (response.data.code === 200) {
                            dispatch(actionCreator(userActionTypes.get_users.SUCCESS, { userData: response.data.data }));
                        }
                    });
                toastr.success(response.data.message)
            } else {
                toastr.error(response.data.message)
            }
        });
    };
}

export function getUserDetails(obj) {
    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }

    return (dispatch) => {

        axios.get(API_URL + constant.USER_DETAILS + '?id=' + obj.userId, config)
            .then(function (response) {
                if (response.data.status === true) {

                    dispatch(actionCreator(userActionTypes.get_userDetails.SUCCESS, { userDetails: response.data.data }));
                }
            });
    };
}

export function deleteUser(obj, userObj) {
    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }
    return (dispatch) => {
        axios.post(API_URL + constant.USER_DELETE, obj, config)
            .then(function (response) {

                if (response.data.status === true) {
                    toastr.success(response.data.message)
                    axios.get(API_URL + constant.USER_LIST + '?page=' + userObj.page + '&limit='+userObj.pageSize + '&searchString=' + userObj.searchString +'&sortValue=' + userObj.sortValue +'&sortOrder=' + userObj.sortOrder, config)
                        .then(function (response) {
                            if (response.data.status === true) {
                                dispatch(actionCreator(userActionTypes.get_users.SUCCESS, { userData: response.data.data, totalCount: response.data.totalCount }));
                            } else if (response.data.status === false) {
                                dispatch(actionCreator(userActionTypes.get_users.SUCCESS, { userData: response.data.data, totalCount: response.data.totalCount }));
                            }
                        });
                }
            });
    };
}

export function updateProfile(obj) {

    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }

    return async (dispatch) => {

        let file_name = '';
        if (!obj.image_edit) {
            
            let formdata = new FormData();
            formdata.append("file", obj.categoryIcon[0]);

            const imgResponse = await axios.post(API_URL + constant.UPLOADMEDIA, formdata, config)

            if (imgResponse.data.status) {
                file_name = imgResponse.data.data.file;
            }
        }

        const newObj= {
            "firstname": obj.firstname,
        "lastname": obj.lastname,
        "address": obj.address,
        }
        
        if (!obj.image_edit) {
            newObj.profilePhoto = file_name
        }
     
        
        axios.post(API_URL + constant.USER_UPDATE, newObj, config)
            .then(function (response) {

                if (response.data.status === true) {
                    toastr.success(response.data.message)
                    axios.post(API_URL + constant.PROFILE, null, config)
                        .then(function (response) {

                            if (response.data.status === true) {

                                
                                dispatch(actionCreator(userActionTypes.get_userInfo.SUCCESS, { userInfo: response.data.data }));

                            }
                        });


                }
            });
    };
}

export function updateProfilePic(formdata, obj) {

    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }


    return async (dispatch) => {

        var file_name = '';

        const imgResponse = await axios.post(API_URL + constant.UPLOADMEDIA, formdata, config)

        if (imgResponse.data.status) {
            file_name = imgResponse.data.data.file;

            

            const newobj = {
                "userId": obj._id,
                "username": obj.username,
                "firstname": obj.firstname,
                "lastname": obj.lastname,
                "profilePhoto": file_name,
                "coverPhoto": obj.coverPhoto,
                "phone": obj.phone,
                "address": obj.address,
                "city": obj.city,
                "state": obj.state,
                "country": obj.country,
                "geo": obj.geo,
                "gender": obj.gender,
                "bio": obj.bio,
                "isActive": obj.isActive
            }

            axios.post(API_URL + constant.USER_UPDATE, newobj, config)
                .then(function (response) {

                    if (response.data.status === true) {
                        toastr.success('Profile Picture Updated Successfully');
                        axios.post(API_URL + constant.PROFILE, null, config)
                            .then(function (response) {

                                if (response.data.status === true) {

                                   
                                    dispatch(actionCreator(userActionTypes.get_userInfo.SUCCESS, { userInfo: response.data.data }));

                                }
                            });


                    }
                });


        } else {
            toastr.warning('Image not uplaoded')
        }

    };
}

export function updateProfile_user(obj, userObj) {
    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }
    return (dispatch) => {

        axios.post(API_URL + constant.USER_UPDATE, obj, config)
            .then(function (response) {

                if (response.data.status === true) {
                    toastr.success('User Update Successfully')

                    axios.get(API_URL + constant.USER_LIST + '?page=' + userObj.page + '&limit='+userObj.pageSize + '&searchString=' + userObj.searchString +'&sortValue=' + userObj.sortValue +'&sortOrder=' + userObj.sortOrder, config)
                        .then(function (response) {
                            if (response.data.status === true) {
                                dispatch(actionCreator(userActionTypes.get_users.SUCCESS, { userData: response.data.data, totalCount: response.data.totalCount }));
                            } else if (response.data.status === false) {
                                dispatch(actionCreator(userActionTypes.get_users.SUCCESS, { userData: response.data.data, totalCount: response.data.totalCount }));
                            }
                        });
                }
            });
    };
}

export function getAdminDetails() {

    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }

    return (dispatch) => {


        axios.post(API_URL + constant.PROFILE, null, config)
            .then(function (response) {

                if (response.data.status === true) {

                    
                    dispatch(actionCreator(userActionTypes.get_userInfo.SUCCESS, { userInfo: response.data.data }));

                }
            });
    };
}
