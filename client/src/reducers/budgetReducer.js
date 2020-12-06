import {
  GET_USER_BUDGET_REQUEST,
  GET_USER_BUDGET_SUCCESS,
  GET_USER_BUDGET_FAIL,
  GET_USER_BUDGET_RESET,
  CREATE_USER_BUDGET_REQUEST,
  CREATE_USER_BUDGET_SUCCESS,
  CREATE_USER_BUDGET_FAIL,
} from "../actionTypes/budgetTypes";

export const userBudgetReducer = (state = {}, action) => {
  switch (action.type) {
    // Get User Budget Actions
    case GET_USER_BUDGET_REQUEST:
      return {
        loading: true,
      };
    case GET_USER_BUDGET_SUCCESS:
      return {
        loading: false,
        budget: action.payload,
      };
    case GET_USER_BUDGET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_USER_BUDGET_RESET:
      return {};
    // Create User Budget Actions
    case CREATE_USER_BUDGET_REQUEST:
      return {
        loading: true,
      };
    case CREATE_USER_BUDGET_SUCCESS:
      return {
        loading: false,
        budget: action.payload,
      };
    case CREATE_USER_BUDGET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
