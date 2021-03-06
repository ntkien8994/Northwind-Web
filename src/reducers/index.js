import {combineReducers} from 'redux';
import { layouts } from './layoutReducer';
import {customers} from './customerReducer';
import {products} from './productReducer';
import {contracts} from './contractReducer';

let reducers= combineReducers({layouts,customers,products,contracts});
export default reducers;