import {
  ADD_NEW_TRANSACTION_REQUEST,
  ADD_NEW_TRANSACTION_SUCCESS,
  ADD_NEW_TRANSACTION_FAIL,
  ADD_NEW_TRANSACTION_RESET,
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
