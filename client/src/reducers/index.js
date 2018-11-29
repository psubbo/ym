import { combineReducers } from "redux";
import authReducer from "./authReducer";
import reviewsReducer from "./reviewsReducer";
export default combineReducers({ auth: authReducer, reviews: reviewsReducer });
