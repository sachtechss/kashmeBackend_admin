/** Product Reducers  */

import { productActionTypes } from './../constants/apiConstants';

const initialState = {
    productList: [],
    productDetails:''
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case productActionTypes.get_products.SUCCESS:
            return {
                ...state,
                productList: payload.productList
            };
            case productActionTypes.product_details.SUCCESS:
            return {
                ...state,
                productDetails: payload.productDetails
            };
        default:
            return state;
    }
};
