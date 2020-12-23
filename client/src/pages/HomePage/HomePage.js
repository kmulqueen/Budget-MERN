import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Spinner } from "react-bootstrap";
import Budget from "../../components/Budget";
import Message from "../../components/Message";
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
  const { budget, error: budgetError, loading: budgetLoading } = userBudget;

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
          {budgetError && <Message variant="danger">{budgetError}</Message>}
          {budgetLoading ? (
            <Spinner animation="border" />
          ) : !budget ? (
            <>
              <p>You haven't created a budget.</p>
              <Button onClick={createHandler}>Create Budget</Button>
            </>
          ) : !budget.monthlyIncome.length &&
            !budget.monthlyExpenses.length &&
            !budget.categories.length ? (
            <>
              <h4>You need to create some categories to start your budget!</h4>
              <LinkContainer to="/budget/categories">
                <Button>Create Categories</Button>
              </LinkContainer>
            </>
          ) : (!budget.monthlyIncome.length && budget.categories.length) ||
            (!budget.monthlyExpenses.length && budget.categories.length) ? (
            <>
              <h4>
                You need to have at least 1 monthly income item and 1 monthly
                expense. Update your budget!
              </h4>
              <LinkContainer to="/budget/update">
                <Button>Update Budget</Button>
              </LinkContainer>
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
