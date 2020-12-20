import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Form, Button, Col } from "react-bootstrap";
import Moment from "react-moment";
import { getUserBudget } from "../../actions/budgetActions";
import { getUsersTransactions } from "../../actions/transactionActions";

const SpendAnalysisPage = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userBudget = useSelector((state) => state.userBudget);
  const { budget } = userBudget;
  const getUserTransactions = useSelector((state) => state.getUserTransactions);
  const { transactions, error, loading } = getUserTransactions;

  const currentDate = new Date();
  const currentMonth = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(currentDate);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!budget) {
      dispatch(getUserBudget());
    }
  }, [history, dispatch, userInfo, budget, month]);
  return (
    <>
      <h3>Spend Analysis</h3>
      <Form onSubmit={submitHandler}>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Month</Form.Label>
            <Form.Control
              as="select"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
      </Form>
      <Table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Budget</th>
            <th>Spent</th>
            <th>Variance</th>
          </tr>
        </thead>
        <tbody>
          {budget.categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>
                {budget.monthlyExpenses.reduce(function (acc, expense) {
                  if (
                    category.name.toLowerCase() ===
                    expense.category.name.toLowerCase()
                  ) {
                    acc = acc + expense.amount;
                  }
                  return acc;
                }, 0)}
              </td>
              <td>
                {transactions.reduce(function (acc, transaction) {
                  if (
                    category.name.toLowerCase() ===
                      transaction.category.toLowerCase() &&
                    transaction.transactionType.toLowerCase() === "expense"
                  ) {
                    acc = acc + transaction.amount;
                  }
                  return acc;
                }, 0)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default SpendAnalysisPage;
