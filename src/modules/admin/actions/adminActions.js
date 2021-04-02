/** Admin Actions  */

import {
    actionCreator,
    adminActionTypes,
    jsonApiHeader
} from './../constants/apiConstants';
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

export function getCategory(obj) {
    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }
    return (dispatch) => {
        axios.get(API_URL + constant.CATEGORY_LIST + '?page=' + obj.page + '&count='+obj.pageSize + '&sortValue=' + obj.sortValue +'&sortOrder=' + obj.sortOrder, null, config)
            .then(function (response) {
                if (response.data.status === true) {
                    dispatch(actionCreator(adminActionTypes.get_category.SUCCESS, { categoryData: response.data.data, categoryCount: response.data.totalCount }));
                }
            });
    };
}

export function getSubcategory(obj) {
    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }
    let newobj = {
        categoryId: obj.categoryId
    }
    return (dispatch) => {
        axios.post(API_URL + constant.SUBCATEGORY_LIST + '?page=' + obj.page + '&limit='+obj.pageSize + '&sortValue=' + obj.sortValue +'&sortOrder=' + obj.sortOrder, newobj, config)
            .then(function (response) {
                //console.log('response_sub_category',response)
                if (response.data.status === true) {
                    dispatch(actionCreator(adminActionTypes.get_subcategory.SUCCESS, { subcategoryData: response.data.data, subcategoryCount: response.data.totalCount }));
                }
            });
    };
}

export function addCategory(authObj) {

    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }


    return async (dispatch) => {

        console.log(authObj.categoryIcon[0]);
        let file_name = '';
        let formdata = new FormData();
        formdata.append("file", authObj.categoryIcon[0]);



        const imgResponse = await axios.post(API_URL + constant.UPLOADMEDIA, formdata, config)

        if (imgResponse.data.status) {
            file_name = imgResponse.data.data.file;
        }

        let obj = {
            value: [
                {
                    lang: "en",
                    data: {
                        name: authObj.name,
                        description: authObj.description,
                        categoryIcon: file_name,

                    }
                },
                {
                    lang: "zh",
                    data: {
                        name: authObj.name_zh,
                        description: authObj.description_zh,
                        categoryIcon: file_name,

                    }
                }
            ]
        }

        axios.post(API_URL + constant.ADD_CATEGORY, obj, config).then(function (response) {

            if (response.data.status === true) {
                let catObj = {
                    page: 0
                }
                toastr.success(response.data.message)
                axios.get(API_URL + constant.CATEGORY_LIST + '?page=1&count=10&sortValue=&sortOrder=', null, config)
                    .then(function (response) {
                        if (response.data.status === true) {
                            dispatch(actionCreator(adminActionTypes.get_category.SUCCESS, { categoryData: response.data.data, categoryCount: response.data.totalCount }));
                        }
                    });
            } else if (response.data.status === false) {
                toastr.warning(response.data.message)
            }
        }).catch(error => {
            toastr.warning(error.response.data.message)

        });
    };


}

export function addSubCategory(authObj,obj) {
    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }
    return (dispatch) => {
        axios.post(API_URL + constant.ADD_SUBCATEGORY + '?page=' + obj.page + '&count=10' +'&sortValue=' + obj.sortValue +'&sortOrder=' + obj.sortOrder, authObj, config).then(function (response) {
            if (response.data.status === true) {
                let catObj = {
                    // page: 0,
                    categoryId: authObj.value[0].data._category
                }
                toastr.success(response.data.message)
                axios.post(API_URL + constant.SUBCATEGORY_LIST, catObj, config)
                    .then(function (response) {
                        if (response.data.status === true) {
                            dispatch(actionCreator(adminActionTypes.get_subcategory.SUCCESS, { subcategoryData: response.data.data, subcategoryCount: response.data.totalCount }));
                        }
                    });
            } else if (response.data.status === false) {
                toastr.warning(response.data.message)
            }
        });
    };
}
export function editSubCategory(authObj,usrObj) {
    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }
    return (dispatch) => {
        axios.put(API_URL + constant.EDIT_SUBCATEGORY, authObj, config).then(function (response) {
            if (response.data.status === true) {

                let catObj = {
                    // page: 0,
                    categoryId: authObj.value[0].data._category
                }
                toastr.success(response.data.message)
                axios.post(API_URL + constant.SUBCATEGORY_LIST + '?page=' + usrObj.page + '&limit='+usrObj.pageSize + '&sortValue=' + usrObj.sortValue +'&sortOrder=' + usrObj.sortOrder, catObj, config)
                    .then(function (response) {
                        if (response.data.status === true) {
                            dispatch(actionCreator(adminActionTypes.get_subcategory.SUCCESS, { subcategoryData: response.data.data, subcategoryCount: response.data.totalCount }));
                        }
                    });
            } else if (response.status === false) {
                toastr.warning(response.message)
            }
        }).catch(error => {
            toastr.warning(error.response.data.message)

        });
    };
}

export function removeCategory(obj, userObj) {
    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }

    return (dispatch) => {
        axios.delete(API_URL + constant.REMOVE_CATEGORY, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
            data: obj
        })
            .then(function (response) {
                if (response.data.status === true) {
                    toastr.success(response.data.message)

                    axios.get(API_URL + constant.CATEGORY_LIST + '?page=' + userObj.page + '&count='+userObj.pageSize + '&sortValue=' + userObj.sortValue +'&sortOrder=' + userObj.sortOrder, null, config)
                        .then(function (response) {
                            if (response.data.status === true) {
                                dispatch(actionCreator(adminActionTypes.get_category.SUCCESS, { categoryData: response.data.data, categoryCount: response.data.totalCount }));
                            }
                        });
                } else if (response.data.code === 201) {
                    toastr.warning(response.data.message)
                }
            });
    };
}

export function removeSubcategory(obj,usrObj) {
    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }
    let subcategory = {
        subCategoryId: obj.subCategoryId
    }
    return (dispatch) => {
        axios.delete(API_URL + constant.REMOVE_SUBCATEGORY, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
            data: subcategory
        })
            .then(function (response) {
                let getObj = {
                    categoryId: obj.categoryId

                }
                if (response.data.status === true) {
                    toastr.success(response.data.message)
                    axios.post(API_URL + constant.SUBCATEGORY_LIST + '?page=' + usrObj.page + '&limit='+usrObj.pageSize + '&sortValue=' + usrObj.sortValue +'&sortOrder=' + usrObj.sortOrder, getObj, config)
                        .then(function (response) {
                            if (response.data.status === true) {
                                dispatch(actionCreator(adminActionTypes.get_subcategory.SUCCESS, { subcategoryData: response.data.data, subcategoryCount: response.data.totalCount }));
                            } else {
                                dispatch(actionCreator(adminActionTypes.get_subcategory.SUCCESS, { subcategoryData: response.data.data, subcategoryCount: response.data.totalCount }));
                            }
                        });
                } else if (response.data.code === 201) {
                    toastr.warning(response.data.message)
                }
            });
    };
}

export function getAdminDashboardCounts() {

    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }
    const obj = {

    }
    return (dispatch) => {
        axios.get(API_URL + constant.USER_COUNT, config)
            .then(function (response) {
                if (response.data.status === true) {
                    obj.user = response.data.data;
                    axios.get(API_URL + constant.PRODUCT_COUNT, config)
                        .then(function (response) {
                            if (response.data.status === true) {
                                obj.product = response.data.data;
                                axios.get(API_URL + constant.PRODUCT_SOLD_COUNT, config)
                                    .then(function (response) {
                                        if (response.data.status === true) {
                                            obj.product_sold = response.data.data;


                                            dispatch(actionCreator(adminActionTypes.admin_counts.SUCCESS, { dashboardCounts: obj }));
                                        }
                                    });

                            }
                        });


                    //dispatch(actionCreator(adminActionTypes.admin_counts.SUCCESS, { dashboardCounts: response.data.data }));
                }
            }, (error) => {
                console.log('errrror==>>>', error);
                return error
            })
    };
}

export function getGraphByMonth(date) {


    var d = date;
    var month = '' + (d.getMonth() + 1)
    var day = '' + d.getDate()
    var year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    //console.log('date', [year,month].join('/'));

    let obj = {
        date: [year, month].join('/')
    }

    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }
    return (dispatch) => {
        // console.log('graph',obj)
        axios.post(API_URL + constant.ADMIN_GRAPH_STATS, obj, config)
            .then(function (response) {
                if (response.data.status === true) {
                    dispatch(actionCreator(adminActionTypes.admin_graphStats.SUCCESS, { graphStats: response.data.data }));
                }
            });
    };
}

export function getemptySubcategory() {


    return (dispatch) => {
        dispatch(actionCreator(adminActionTypes.get_subcategory.EMPTY));
    }

}

export function editCategory(authObj, userObj) {

let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }


    return async (dispatch) => {


        let file_name = '';
        if (authObj.image_edit) {
            file_name = authObj.image_name;
        }
        else {

            let formdata = new FormData();
            formdata.append("file", authObj.categoryIcon[0]);

            const imgResponse = await axios.post(API_URL + constant.UPLOADMEDIA, formdata, config)

            if (imgResponse.data.status) {
                file_name = imgResponse.data.data.file;
            }
        }


        let obj = {
            id: authObj.id,
            value: [
                {
                    lang: "en",
                    data: {
                        name: authObj.name,
                        description: authObj.description,
                        categoryIcon: file_name,

                    }
                },
                {
                    lang: "zh",
                    data: {
                        name: authObj.name_zh,
                        description: authObj.description_zh,
                        categoryIcon: file_name,

                    }
                }
            ]
        }


        axios.put(API_URL + constant.ADD_CATEGORY, obj, config).then(function (response) {

            if (response.data.status === true) {
                let catObj = {
                    page: 0
                }
                toastr.success(response.data.message)
                axios.get(API_URL + constant.CATEGORY_LIST + '?page=' + userObj.page + '&count='+userObj.pageSize + '&sortValue=' + userObj.sortValue +'&sortOrder=' + userObj.sortOrder, null, config)
                    .then(function (response) {
                        if (response.data.status === true) {
                            dispatch(actionCreator(adminActionTypes.get_category.SUCCESS, { categoryData: response.data.data, categoryCount: response.data.totalCount }));
                        }
                    });
            } else if (response.data.status === false) {
                toastr.warning(response.data.message)
            }
        }).catch(error => {
            toastr.warning(error.response.data.message)

        });
    };


}

export function getadsData() {

    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }

    return (dispatch) => {

        //dispatch(actionCreator(adminActionTypes.ads_data.SUCCESS, { adsData: response.data.data }));
        axios.get(API_URL + constant.ADS_DATA, config)
            .then(function (response) {
                if (response.data.status === false) {
                    dispatch(actionCreator(adminActionTypes.ads_data.SUCCESS, { adsData: response.data.data }));

                }
            });
    };

}


export function updateAds(obj) {

    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }

    return (dispatch) => {
        axios.post(API_URL + constant.ADS_DATA, obj, config).then(function (response) {
            if (response.data.status === true) {

                toastr.success(response.data.message)
                dispatch(actionCreator(adminActionTypes.ads_data.SUCCESS, { adsData: response.data.data }));
            } else if (response.data.status === false) {
                toastr.warning(response.data.message)
            }
        });
    };

}



export function getBanner(obj) {

    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }
    return (dispatch) => {
        axios.get(API_URL + constant.BANNER_DATA + '?page=' + obj.page + '&count=10', null, config)
            .then(function (response) {
                if (response.data.status === true) {
                    dispatch(actionCreator(adminActionTypes.banners_data.SUCCESS, { bannerData: response.data.data, bannerCount: response.data.totalCount }));
                }
            });
    };

}
export function removeBanner(obj, userObj) {

    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }
    
    return (dispatch) => {


        axios.delete(API_URL + constant.REMOVE_BANNER, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
            data: obj
        })
            .then(function (response) {
                if (response.data.status === true) {
                    toastr.success(response.data.message)
                    axios.get(API_URL + constant.BANNER_DATA + '?page=' + userObj.page + '&count=10', null, config)
                        .then(function (response) {
                            if (response.data.status === true) {
                                dispatch(actionCreator(adminActionTypes.banners_data.SUCCESS, { bannerData: response.data.data, bannerCount: response.data.totalCount }));
                            }
                        });

                }
            }).catch(error => {
                toastr.warning(error.response.data.message)

            });
    };

}

export function addBanner(obj) {

    let access_token = localStorage.access_token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
    }


    return async (dispatch) => {


        console.log(obj.bannerIcon[0]);
        let file_name = '';
        let formdata = new FormData();
        formdata.append("file", obj.bannerIcon[0]);

        


        const imgResponse = await axios.post(API_URL + constant.UPLOADMEDIA, formdata, config)

        if (imgResponse.data.status) {
            file_name = imgResponse.data.data.file;
        }

        let obj_banner = {
            url: file_name
        }

        axios.post(API_URL + constant.REMOVE_BANNER, obj_banner, config).then(function (response) {

            if (response.data.status === true) {

                toastr.success(response.data.message)

                axios.get(API_URL + constant.BANNER_DATA + '?page=1&count=10', null, config)
                    .then(function (response) {
                        if (response.data.status === true) {
                            dispatch(actionCreator(adminActionTypes.banners_data.SUCCESS, { bannerData: response.data.data, bannerCount: response.data.totalCount }));
                        }
                    });


            } else if (response.data.status === false) {
                toastr.warning(response.data.message)
            }
        }).catch(error => {
            toastr.warning(error.response.data.message)

        });



    };

}