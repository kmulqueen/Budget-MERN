import {
  GET_USER_BUDGET_REQUEST,
  GET_USER_BUDGET_SUCCESS,
  GET_USER_BUDGET_FAIL,
  GET_USER_BUDGET_RESET,
  CREATE_USER_BUDGET_REQUEST,
  CREATE_USER_BUDGET_SUCCESS,
  CREATE_USER_BUDGET_FAIL,
  CREATE_USER_BUDGET_RESET,
  CREATE_USER_CATEGORY_REQUEST,
  CREATE_USER_CATEGORY_SUCCESS,
  CREATE_USER_CATEGORY_FAIL,
  CREATE_USER_CATEGORY_RESET,
  ADD_ITEMS_USER_BUDGET_REQUEST,
  ADD_ITEMS_USER_BUDGET_SUCCESS,
  ADD_ITEMS_USER_BUDGET_FAIL,
  ADD_ITEMS_USER_BUDGET_RESET,
  GET_ITEM_USER_BUDGET_REQUEST,
  GET_ITEM_USER_BUDGET_SUCCESS,
  GET_ITEM_USER_BUDGET_FAIL,
  GET_ITEM_USER_BUDGET_RESET,
  UPDATE_ITEM_USER_BUDGET_REQUEST,
  UPDATE_ITEM_USER_BUDGET_SUCCESS,
  UPDATE_ITEM_USER_BUDGET_FAIL,
  UPDATE_ITEM_USER_BUDGET_RESET,
  DELETE_ITEM_USER_BUDGET_REQUEST,
  DELETE_ITEM_USER_BUDGET_SUCCESS,
  DELETE_ITEM_USER_BUDGET_FAIL,
  DELETE_ITEM_USER_BUDGET_RESET,
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

export const userBudgetCreateReducer = (state = {}, action) => {
  switch (action.type) {
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
    case CREATE_USER_BUDGET_RESET:
      return {};
    default:
      return state;
  }
};

export const userCategoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_USER_CATEGORY_REQUEST:
      return {
        loading: true,
      };
    case CREATE_USER_CATEGORY_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
        success: true,
      };
    case CREATE_USER_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_USER_CATEGORY_RESET:
      return {};

    default:
      return state;
  }
};

export const userGetBudgetItemReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ITEM_USER_BUDGET_REQUEST:
      return {
        loading: true,
      };
    case GET_ITEM_USER_BUDGET_SUCCESS:
      return {
        loading: false,
        budgetItem: action.payload,
      };
    case GET_ITEM_USER_BUDGET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_ITEM_USER_BUDGET_RESET:
      return {};
    default:
      return state;
  }
};

export const userAddBudgetItemReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ITEMS_USER_BUDGET_REQUEST:
      return {
        loading: true,
      };
    case ADD_ITEMS_USER_BUDGET_SUCCESS:
      return {
        loading: false,
        budget: action.payload,
        success: true,
      };
    case ADD_ITEMS_USER_BUDGET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADD_ITEMS_USER_BUDGET_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateBudgetItemReducer = (
  state = { budgetItem: {} },
  action
) => {
  switch (action.type) {
    case UPDATE_ITEM_USER_BUDGET_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_ITEM_USER_BUDGET_SUCCESS:
      return {
        loading: false,
        budgetItem: action.payload,
        success: true,
      };
    case UPDATE_ITEM_USER_BUDGET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_ITEM_USER_BUDGET_RESET:
      return { budgetItem: {} };
    default:
      return state;
  }
};

export const userDeleteBudgetItemReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ITEM_USER_BUDGET_REQUEST:
      return {
        loading: true,
      };
    case DELETE_ITEM_USER_BUDGET_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_ITEM_USER_BUDGET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_ITEM_USER_BUDGET_RESET:
      return {};
    default:
      return state;
  }
};
