import {
  ADD_NEW_TRANSACTION_REQUEST,
  ADD_NEW_TRANSACTION_SUCCESS,
  ADD_NEW_TRANSACTION_FAIL,
  ADD_NEW_TRANSACTION_RESET,
  GET_USER_TRANSACTIONS_REQUEST,
  GET_USER_TRANSACTIONS_SUCCESS,
  GET_USER_TRANSACTIONS_FAIL,
  GET_USER_TRANSACTIONS_RESET,
} from "../actionTypes/transactionTypes";

export const addTransactionReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_TRANSACTION_REQUEST:
      return {
        loading: true,
      };
    case ADD_NEW_TRANSACTION_SUCCESS:
      return {
        loading: false,
        transaction: action.payload,
        success: true,
      };
    case ADD_NEW_TRANSACTION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADD_NEW_TRANSACTION_RESET:
      return {};

    default:
      return state;
  }
};

export const getUserTransactionsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_TRANSACTIONS_REQUEST:
      return {
        loading: true,
      };
    case GET_USER_TRANSACTIONS_SUCCESS:
      return {
        loading: false,
        transactions: action.payload,
      };
    case GET_USER_TRANSACTIONS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_USER_TRANSACTIONS_RESET:
      return {};

    default:
      return state;
  }
};
