import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Budget from "../../components/Budget";
import { getUserBudget } from "../../actions/budgetActions";

const BudgetViewPage = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userBudget = useSelector((state) => state.userBudget);
  const { budget, error } = userBudget;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (userInfo && !budget) {
      dispatch(getUserBudget());
    }

    if (error) {
      history.push("/");
    }
    if (
      budget.monthlyIncome.length === 0 ||
      budget.monthlyExpenses.length === 0 ||
      budget.categories.length === 0
    ) {
      history.push("/");
    }
  }, [userInfo, history, budget, dispatch, error]);
  return (
    <>
      {budget &&
        budget.monthlyIncome.length &&
        budget.monthlyExpenses.length &&
        budget.categories.length && <Budget userBudget={budget} />}
    </>
  );
};

export default BudgetViewPage;
