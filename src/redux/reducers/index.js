import { combineReducers } from "redux";

import recipeReducer from "./recipeReducer";
import userReducer from "./userReducer";

export default combineReducers({ recipes: recipeReducer, user: userReducer});