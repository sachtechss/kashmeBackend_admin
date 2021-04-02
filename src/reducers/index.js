import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; // SAYING use redux form reducers as reducers
import loginReducer from '../modules/login/reducers/loginReducer';
import userReducer from '../modules/user/reducers/userReducer';
import adminReducer from '../modules/admin/reducers/adminReducer';
import productReducer from '../modules/product/reducers/productReducer';

const allReducers = combineReducers({
  form: formReducer,
  login: loginReducer,
  user: userReducer,
  product: productReducer,
  admin: adminReducer
});

export default allReducers;
