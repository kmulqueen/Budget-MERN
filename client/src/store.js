import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { userRegisterReducer, userLoginReducer } from "./reducers/userReducer";
import {
  userBudgetReducer,
  userGetBudgetItemReducer,
  userAddBudgetItemReducer,
  userBudgetCreateReducer,
  userUpdateBudgetItemReducer,
  userDeleteBudgetItemReducer,
  userCategoryCreateReducer,
} from "./reducers/budgetReducer";

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userBudget: userBudgetReducer,
  userBudgetCreate: userBudgetCreateReducer,
  userGetBudgetItem: userGetBudgetItemReducer,
  userAddBudgetItem: userAddBudgetItemReducer,
  userUpdateBudgetItem: userUpdateBudgetItemReducer,
  userDeleteBudgetItem: userDeleteBudgetItemReducer,
  userCategoryCreate: userCategoryCreateReducer,
});

const middleware = [thunk];

const initialState = {};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
