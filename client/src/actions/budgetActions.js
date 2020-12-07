import axios from "axios";
import {
  GET_USER_BUDGET_REQUEST,
  GET_USER_BUDGET_SUCCESS,
  GET_USER_BUDGET_FAIL,
  CREATE_USER_BUDGET_REQUEST,
  CREATE_USER_BUDGET_SUCCESS,
  CREATE_USER_BUDGET_FAIL,
  ADD_ITEMS_USER_BUDGET_REQUEST,
  ADD_ITEMS_USER_BUDGET_SUCCESS,
  ADD_ITEMS_USER_BUDGET_FAIL,
} from "../actionTypes/budgetTypes";

export const getUserBudget = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_BUDGET_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.get("/api/budget", config);

    dispatch({
      type: GET_USER_BUDGET_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_BUDGET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createUserBudget = (monthlyIncome, monthlyExpenses) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: CREATE_USER_BUDGET_REQUEST });

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
      "/api/budget/create",
      { monthlyIncome, monthlyExpenses },
      config
    );

    dispatch({
      type: CREATE_USER_BUDGET_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_USER_BUDGET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addNewBudgetItems = (incomeItems, expenseItems) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: ADD_ITEMS_USER_BUDGET_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Initialize response variable
    let res;

    // Check if incomeItems or expenseItems arrays exist
    if (incomeItems.length >= 1 && expenseItems.length >= 1) {
      // Send appropriate request
      res = await axios.put(
        "/api/budget/update",
        { incomeItems, expenseItems },
        config
      );
    } else if (incomeItems.length >= 1) {
      // Send appropriate request
      res = await axios.put("/api/budget/update", { incomeItems }, config);
    } else if (expenseItems.length >= 1) {
      // Send appropriate request
      res = await axios.put("/api/budget/update", { expenseItems }, config);
    }

    dispatch({
      type: ADD_ITEMS_USER_BUDGET_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_ITEMS_USER_BUDGET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
