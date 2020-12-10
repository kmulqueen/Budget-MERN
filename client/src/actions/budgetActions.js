import axios from "axios";
import {
  GET_USER_BUDGET_REQUEST,
  GET_USER_BUDGET_SUCCESS,
  GET_USER_BUDGET_FAIL,
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
  ADD_ITEMS_USER_BUDGET_RESET,
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

export const createUserBudget = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_USER_BUDGET_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.post("/api/budget/create", null, config);

    dispatch({
      type: CREATE_USER_BUDGET_SUCCESS,
      payload: res.data,
    });

    dispatch({
      type: GET_USER_BUDGET_SUCCESS,
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

export const createUserBudgetReset = () => (dispatch) => {
  dispatch({ type: CREATE_USER_BUDGET_RESET });
};

export const createUserCategory = (categories) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: CREATE_USER_CATEGORY_REQUEST });

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
      "/api/budget/category",
      { categories },
      config
    );

    dispatch({
      type: CREATE_USER_CATEGORY_SUCCESS,
      payload: res.data,
    });

    dispatch({
      type: GET_USER_BUDGET_SUCCESS,
      payload: res.data,
    });

    dispatch({
      type: CREATE_USER_CATEGORY_RESET,
    });
  } catch (error) {
    dispatch({
      type: CREATE_USER_CATEGORY_FAIL,
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

    // Check if incomeItems & expenseItems arrays exist
    if (incomeItems.length >= 1 && expenseItems.length >= 1) {
      // Send appropriate request
      res = await axios.put(
        "/api/budget/update",
        { incomeItems, expenseItems },
        config
      );
    } else if (incomeItems.length >= 1 && expenseItems.length >= 1) {
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

export const addNewBudgetItemsReset = () => (dispatch) => {
  dispatch({ type: ADD_ITEMS_USER_BUDGET_RESET });
};

export const getUserBudgetItem = (budgetID, itemID, type) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: GET_ITEM_USER_BUDGET_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.get(
      `/api/budget/get-item/${type}/${budgetID}/${itemID}`,
      config
    );
    dispatch({
      type: GET_ITEM_USER_BUDGET_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ITEM_USER_BUDGET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getBudgetItemReset = () => (dispatch) => {
  dispatch({ type: GET_ITEM_USER_BUDGET_RESET });
};

export const updateBudgetItem = (budgetID, itemID, type, updatedItem) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: UPDATE_ITEM_USER_BUDGET_REQUEST });

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
      `/api/budget/update-item/${type}/${budgetID}/${itemID}`,
      updatedItem,
      config
    );

    dispatch({
      type: UPDATE_ITEM_USER_BUDGET_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ITEM_USER_BUDGET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateBudgetItemReset = () => (dispatch) => {
  dispatch({ type: UPDATE_ITEM_USER_BUDGET_RESET });
};

export const deleteBudgetItem = (budgetID, itemID, type) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: DELETE_ITEM_USER_BUDGET_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.delete(
      `/api/budget/delete-item/${type}/${budgetID}/${itemID}`,
      config
    );

    dispatch({
      type: DELETE_ITEM_USER_BUDGET_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ITEM_USER_BUDGET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteBudgetItemReset = () => (dispatch) => {
  dispatch({ type: DELETE_ITEM_USER_BUDGET_RESET });
};
