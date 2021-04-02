/*
     Login Api Constants
*/
import {
    actionCreator,
    createRequestActionTypes,
    jsonApiHeader
} from './../../../actions/utilAction';
export {
    actionCreator,
    jsonApiHeader
};

export const loginActionTypes = {
    post_login: createRequestActionTypes('POST_LOGIN'),
    change_lang: createRequestActionTypes('CHANGE_LANGUAGE'),
    email_verify: createRequestActionTypes('VERIFY_EMAIL')
};
