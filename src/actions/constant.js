/** MESSAGE CONSTANT */
export const DELETE_RECORD = 'Do you want to delete this record?';
export const DELETE_PRODUCT = 'Do you want to delete this product?';
export const DELETE_RECORD_SUCCESS = 'Record deleted successfully';
export const ALREADY_EXIST = 'Data already exist';

/** API CONSTANT */
export const USER_LOGIN = 'user/adminLogin';
export const USER_REGISTER = 'f/user/register';
export const USER_LIST = 'user/list';
export const CATEGORY_LIST = 'category/list/all';
export const ADD_CATEGORY = 'category';
export const SUBCATEGORY_LIST = 'sub-category/list/all';
export const ADD_SUBCATEGORY = 'sub-category';
export const DEACTIVATE_USER = 'user/deActivateUser';
export const REMOVE_CATEGORY = 'category';
export const REMOVE_SUBCATEGORY = 'sub-category';
export const EDIT_SUBCATEGORY = 'sub-category';
export const USER_DETAILS = '/user/detail';
export const USER_DELETE = 'user/deleteUser';
export const FORGOT_PASSWORD = 'f/user/forgotPassword';
export const PRODUCT_LIST = 'product/listProduct';
export const USER_PRODUCT_LIST = 'product/single-user-product';
export const PRODUCTS_DETAILS = 'product';
export const RESET_PASSWORD = 'f/user/resetPassword';
export const CHANGE_PASSWORD = 'user/changePassword';
export const GET_AUTH_DETAILS = 'user/getAuthDetails';
export const USER_UPDATE = 'user/updateUser';
export const PROFILE_PIC_UPDATE = 'user/updateProfilePic';
export const VERIFY_EMAIL = 'f/user/verifyEmail';
export const ADMIN_COUNT_LIST = 'user/getAdminDashboardCounts';
export const ADMIN_GRAPH_STATS = 'user/graph';
export const UPLOADMEDIA = 'media/upload';
export const USER_COUNT = 'user/count';
export const PRODUCT_COUNT = 'product/count';
export const PRODUCT_SOLD_COUNT = 'product/sold/count';
export const ADS_DATA = 'ads';
export const BANNER_DATA = 'banner/list';
export const REMOVE_BANNER = 'banner';
export const PROFILE = 'user/profile';
export const PRODUCT = 'product';

/** ROUTE CONSTANT */
export const DASHBOARD = '/dashboard';
export const USER_PROFILE = '/userprofile';
export const PRODUCT_DETAILS = '/productdetails';
export const SUBCATEGORY = '/subcategory/';
export const LOGIN = '/';

/** VALIDATION CONSTANT */




// kashME
export const ADMIN_LOGIN = 'login';
export const ADMIN_FORGOT_PASSWORD = 'forgotPassword';
export const ADMIN_RESET_PASSWORD = 'forgotPasswordChange';



// Create USD currency formatter.
export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// Create Base64 path.
export function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export const IMAGE_URL = 'https://ss.stagingsdei.com:9031/uploads/';