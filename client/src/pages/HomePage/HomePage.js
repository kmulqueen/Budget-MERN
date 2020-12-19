import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Budget from "../../components/Budget";
import {
  getUserBudget,
  createUserBudget,
  createUserBudgetReset,
} from "../../actions/budgetActions";

const HomePage = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading: loginLoading, error: loginError } = userLogin;
  const userBudget = useSelector((state) => state.userBudget);
  const { budget, error: budgetError } = userBudget;

  const createHandler = () => {
    dispatch(createUserBudget());
    dispatch(createUserBudgetReset());
    history.push("/budget/categories");
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!budget) {
      dispatch(getUserBudget());
    }
  }, [userInfo, history, dispatch, budget]);

  return (
    <>
      {!userInfo ? (
        <Link to="/login">Please Login</Link>
      ) : (
        <>
          <h1 className="mb-5">Hello, {userInfo.name}</h1>
          {!budget ? (
            <>
              <p>You haven't created a budget.</p>
              <Button onClick={createHandler}>Create Budget</Button>
            </>
          ) : (
            <Budget userBudget={budget} />
          )}
        </>
      )}
    </>
  );
};

export default HomePage;
