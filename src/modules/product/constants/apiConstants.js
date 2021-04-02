/** Product Api Constants */
     
import {
    actionCreator,
    createRequestActionTypes,
    jsonApiHeader,
} from './../../../actions/utilAction';
export {
    actionCreator,
    jsonApiHeader
};

export const productActionTypes = {
    get_products: createRequestActionTypes('GET_PRODUCT'),
    product_details: createRequestActionTypes('PRODUCT_DETAILS')
};
