import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { userRegisterReducer, userLoginReducer } from "./reducers/userReducer";
import {
  userBudgetItemReducer,
  userBudgetReducer,
} from "./reducers/budgetReducer";

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userBudget: userBudgetReducer,
  userBudgetItem: userBudgetItemReducer,
});

const middleware = [thunk];

const initialState = {};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
