import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Budget from "../../components/Budget";

const BudgetViewPage = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userBudget = useSelector((state) => state.userBudget);
  const { budget } = userBudget;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (userInfo && !budget) {
      history.push("/budget/update");
    }
  }, [userInfo, history, budget]);
  return <>{budget && <Budget userBudget={budget} />}</>;
};

export default BudgetViewPage;
