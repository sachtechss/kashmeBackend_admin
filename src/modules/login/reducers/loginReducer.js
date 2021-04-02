/*
     Login Reducers 
*/
import { loginActionTypes } from './../constants/apiConstants';

const initialState = {
    access_token: null,
    authData: [],
    language: 'en',
    emailVerified: false
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case loginActionTypes.post_login.SUCCESS:
            
            return {
                ...state,
                access_token: payload.access_token,
                authData: payload.authData
            };
        case loginActionTypes.change_lang.SUCCESS:
            return {
                ...state,
                language: payload.language
            };
        case loginActionTypes.email_verify.SUCCESS:
            return {
                ...state,
                emailVerified: payload.emailVerified
            };
        default:
            return state;
    }
};
