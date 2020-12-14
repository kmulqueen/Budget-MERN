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

import {
  addTransactionReducer,
  getUserTransactionsReducer,
  getTransactionItemReducer,
  updateTransactionItemReducer,
  deleteTransactionItemReducer,
} from "./reducers/transactionReducer";

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
  addTransaction: addTransactionReducer,
  getUserTransactions: getUserTransactionsReducer,
  getTransactionItem: getTransactionItemReducer,
  updateTransactionItem: updateTransactionItemReducer,
  deleteTransactionItem: deleteTransactionItemReducer,
});

const middleware = [thunk];

// Retrieve any existing user info from local storage (if exists)
const userInfoFromStorage = localStorage.getItem("budgetPalUserInfo")
  ? JSON.parse(localStorage.getItem("budgetPalUserInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
