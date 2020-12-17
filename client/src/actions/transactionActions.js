import axios from "axios";
import {
  ADD_NEW_TRANSACTION_REQUEST,
  ADD_NEW_TRANSACTION_SUCCESS,
  ADD_NEW_TRANSACTION_FAIL,
  ADD_NEW_TRANSACTION_RESET,
  GET_USER_TRANSACTIONS_REQUEST,
  GET_USER_TRANSACTIONS_SUCCESS,
  GET_USER_TRANSACTIONS_FAIL,
  GET_USER_TRANSACTIONS_RESET,
  GET_TRANSACTION_ITEM_REQUEST,
  GET_TRANSACTION_ITEM_SUCCESS,
  GET_TRANSACTION_ITEM_FAIL,
  GET_TRANSACTION_ITEM_RESET,
  UPDATE_TRANSACTION_ITEM_REQUEST,
  UPDATE_TRANSACTION_ITEM_SUCCESS,
  UPDATE_TRANSACTION_ITEM_FAIL,
  UPDATE_TRANSACTION_ITEM_RESET,
  DELETE_TRANSACTION_ITEM_REQUEST,
  DELETE_TRANSACTION_ITEM_SUCCESS,
  DELETE_TRANSACTION_ITEM_FAIL,
  DELETE_TRANSACTION_ITEM_RESET,
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

    const res = await axios.post(
      "/api/transaction/create",
      transaction,
      config
    );

    dispatch({
      type: ADD_NEW_TRANSACTION_SUCCESS,
      payload: res.data,
    });

    dispatch({ type: ADD_NEW_TRANSACTION_RESET });
    dispatch({ type: GET_USER_TRANSACTIONS_RESET });
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

export const getUsersTransactions = ({
  month,
  year,
  category,
  transactionType,
}) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_TRANSACTIONS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.post(
      "/api/transaction",
      { month, year, category, transactionType },
      config
    );

    dispatch({
      type: GET_USER_TRANSACTIONS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_TRANSACTIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUsersTransactionsReset = () => (dispatch) => {
  dispatch({ type: GET_USER_TRANSACTIONS_RESET });
};

export const getTransaction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TRANSACTION_ITEM_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.get(`/api/transaction/${id}`, config);

    dispatch({
      type: GET_TRANSACTION_ITEM_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_TRANSACTION_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTransactionReset = () => (dispatch) => {
  dispatch({ type: GET_TRANSACTION_ITEM_RESET });
};

export const updateTransaction = (transaction) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: UPDATE_TRANSACTION_ITEM_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.put(
      `/api/transaction/${transaction._id}`,
      transaction,
      config
    );

    dispatch({
      type: UPDATE_TRANSACTION_ITEM_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TRANSACTION_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTransactionReset = () => (dispatch) => {
  dispatch({ type: UPDATE_TRANSACTION_ITEM_RESET });
};

export const deleteTransaction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_TRANSACTION_ITEM_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/transaction/${id}`, config);

    dispatch({ type: DELETE_TRANSACTION_ITEM_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_TRANSACTION_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTransactionReset = () => (dispatch) => {
  dispatch({ type: DELETE_TRANSACTION_ITEM_RESET });
};
