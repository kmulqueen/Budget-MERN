import axios from "axios";
import {
  ADD_NEW_TRANSACTION_REQUEST,
  ADD_NEW_TRANSACTION_SUCCESS,
  ADD_NEW_TRANSACTION_FAIL,
  ADD_NEW_TRANSACTION_RESET,
} from "../actionTypes/transactionTypes";

export const createTransaction = (transaction) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: ADD_NEW_TRANSACTION_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.post("/api/transaction", transaction, config);

    dispatch({
      type: ADD_NEW_TRANSACTION_SUCCESS,
      payload: res.data,
    });

    dispatch({ type: ADD_NEW_TRANSACTION_RESET });
  } catch (error) {
    dispatch({
      type: ADD_NEW_TRANSACTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
