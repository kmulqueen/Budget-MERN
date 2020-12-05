import axios from "axios";
import {
  GET_USER_BUDGET_REQUEST,
  GET_USER_BUDGET_SUCCESS,
  GET_USER_BUDGET_FAIL,
  GET_USER_BUDGET_RESET,
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
