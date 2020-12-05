import {
  GET_USER_BUDGET_REQUEST,
  GET_USER_BUDGET_SUCCESS,
  GET_USER_BUDGET_FAIL,
  GET_USER_BUDGET_RESET,
} from "../actionTypes/budgetTypes";

export const userBudgetReducer = (state = {}, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};
