/** Admin Reducers  */

import { adminActionTypes } from './../constants/apiConstants';

const initialState = {
    categoryData: [],
    subcategoryData: [],
    categoryCount: 0,
    subcategoryCount: 0,
    dashboardCounts: '',
    graphStats: [],
    adsData:[],
    bannerData:[]
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case adminActionTypes.get_category.SUCCESS:
            return {
                ...state,
                categoryData: payload.categoryData,
                categoryCount: payload.categoryCount
            };
        case adminActionTypes.get_subcategory.SUCCESS:
            return {
                ...state,
                subcategoryData: payload.subcategoryData,
                subcategoryCount: payload.subcategoryCount
            };
        case adminActionTypes.get_subcategory.EMPTY:
            return {
                ...state,
                subcategoryData: [],
                subcategoryCount: ''
            };
        case adminActionTypes.admin_counts.SUCCESS:
            return {
                ...state,
                dashboardCounts: payload.dashboardCounts
            };
        case adminActionTypes.admin_graphStats.SUCCESS:
            return {
                ...state,
                graphStats: payload.graphStats
            };
        case adminActionTypes.ads_data.SUCCESS:
            return {
                ...state,
                adsData: payload.adsData
            };
            case adminActionTypes.banners_data.SUCCESS:
                return {
                    ...state,
                    bannerData: payload.bannerData,
                    bannerCount: payload.bannerCount
                };    
        default:
            return state;
    }
};
