const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const EMPTY = 'EMPTY';

/** Local */
// export const API_URL = 'http://localhost:5000/api/';
// export const PRODUCT_IMG_PATH = 'http://localhost:5000/app/uploads/product/';
// export const PROFILE_IMG_PATH = 'http://localhost:5000/app/uploads/profile/';


/** Staging */
//export const API_URL = 'http://localhost:5200/api/v1/admin/';
export const API_URL = 'http://204.236.221.197:6200/api/v1/admin/';


export const PRODUCT_IMG_PATH = 'https://ss.stagingsdei.com:9031/app/uploads/product/';
export const PROFILE_IMG_PATH = 'https://ss.stagingsdei.com:9031/app/uploads/profile/';
export const IMAGE_URL = 'https://ss.stagingsdei.com:9031/uploads/';


export function actionCreator(actionType, data) {
  return {
    type: actionType,
    payload: data,
  };
}

export function createRequestActionTypes(base) {
  return [REQUEST, SUCCESS, FAILURE,EMPTY].reduce((requestTypes, type) => {
    requestTypes[type] = `${base}_${type}`;
    return requestTypes;
  }, {});
}

// function calculateTimeZone() {
//   let TZ = /\((.*)\)/.exec(new Date().toString());
//   let TimeZone = "";
//   if (TZ.length > 0) TimeZone = TZ[1];

//   return TimeZone;
// }

export const jsonApiHeader = (accessToken, ContentType) => {
  return {
    "Content-Type": ContentType,
    Authorization: localStorage.access_token
      ? `${localStorage.access_token}`
      : "",
    // Timezone: calculateTimeZone()
  };
};