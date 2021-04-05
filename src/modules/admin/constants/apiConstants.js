/** Admin Api Constants */ 
     
import {
    actionCreator,
    createRequestActionTypes,
    jsonApiHeader,
} from './../../../actions/utilAction';
export {
    actionCreator,
    jsonApiHeader
};

export const adminActionTypes = {
    get_category: createRequestActionTypes('GET_CATEGORY'),
    get_subcategory: createRequestActionTypes('GET_SUBCATEGORY'),
    admin_counts: createRequestActionTypes('GET_ADMIN_COUNT'),
    admin_graphStats: createRequestActionTypes('GET_GRAPH_STATS'),
    ads_data: createRequestActionTypes('ADS_DATA'),
    banners_data: createRequestActionTypes('BANNERS_DATA'),

};
