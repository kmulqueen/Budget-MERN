import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Form, Button, Col, Spinner } from "react-bootstrap";
import Message from "../../components/Message";
import { getUserBudget } from "../../actions/budgetActions";
import { getUsersTransactions } from "../../actions/transactionActions";

const SpendAnalysisPage = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userBudget = useSelector((state) => state.userBudget);
  const { budget, error: budgetError } = userBudget;
  const getUserTransactions = useSelector((state) => state.getUserTransactions);
  const { transactions, error, loading } = getUserTransactions;

  const currentDate = new Date();
  const currentMonth = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(currentDate);

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentDate.getFullYear());
  const [filter, setFilter] = useState({});

  const filterSubmitHandler = (e) => {
    e.preventDefault();

    setFilter((prevState) => ({
      ...prevState,
      month,
      year,
    }));
  };

  const handleFilterClear = () => {
    setMonth(currentMonth);
    setYear(currentDate.getFullYear());

    setFilter({});

    dispatch(getUsersTransactions({}));
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (userInfo && !budget) {
      dispatch(getUserBudget());
    } else if (userInfo && budgetError) {
      history.push("/");
    }

    if (filter === {}) {
      dispatch(getUsersTransactions({}));
    } else {
      dispatch(getUsersTransactions(filter));
    }
  }, [history, dispatch, userInfo, budget, budgetError, filter]);

  // Initialize table items & total items to map through to create table with possible rows that have 'table-danger' class
  let tableItems, totalItems;
  if (budget && transactions) {
    let totalExpenses, totalTransactions;
    // Map through each category in budget
    tableItems = budget.categories.map((category) => {
      // Calculate total expense amount for category
      totalExpenses = budget.monthlyExpenses.reduce(function (acc, expense) {
        if (
          category.name.toLowerCase() === expense.category.name.toLowerCase()
        ) {
          acc = acc + expense.amount;
        }
        return acc;
      }, 0);

      // Calculate total transaction amount for category
      totalTransactions = transactions.reduce(function (acc, transaction) {
        if (
          category.name.toLowerCase() === transaction.category.toLowerCase() &&
          transaction.transactionType.toLowerCase() === "expense"
        ) {
          acc = acc + transaction.amount;
        }
        return acc;
      }, 0);

      // Return an object with information for the category
      return {
        id: category._id,
        category: category.name,
        budget: totalExpenses,
        spent: totalTransactions,
        variance: totalExpenses - totalTransactions,
      };
    });
    // Sort categories alphabetically
    tableItems.sort((a, b) =>
      a.category.localeCompare(b.category, "en", { sensitivity: "base" })
    );

    // Assign totalItems to an object
    totalItems = {
      // Calculate total expense amount in budget
      totalBudgetExpenses: budget.monthlyExpenses.reduce(
        (acc, expense) => acc + expense.amount,
        0
      ),
      // Calculate total amount spent in budget
      totalSpent: transactions.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
      ),
      // Calculate total amount left in budget
      totalLeft:
        budget.monthlyExpenses.reduce(
          (acc, expense) => acc + expense.amount,
          0
        ) -
        transactions.reduce((acc, transaction) => acc + transaction.amount, 0),
    };
  }
  return (
    <>
      <h3>Spend Analysis</h3>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={filterSubmitHandler} className="my-3">
        <Form.Row className="align-items-center">
          <Col>
            <Form.Group>
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
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Button type="submit" variant="success">
              Apply Filter
            </Button>
          </Col>
          <Col>
            <Button onClick={handleFilterClear} variant="outline-danger">
              Reset Filter
            </Button>
          </Col>
        </Form.Row>
      </Form>

      {loading ? (
        <Spinner animation="border" />
      ) : tableItems ? (
        <>
          <Table bordered striped hover responsive size="sm" className="mb-5">
            <thead>
              <tr>
                <th>Category</th>
                <th>Budget</th>
                <th>Spent</th>
                <th>Variance</th>
              </tr>
            </thead>
            <tbody>
              {tableItems.map((item) =>
                item.variance < 0 ? (
                  <tr key={item.id} className="table-danger">
                    <td>{item.category}</td>
                    <td>${item.budget}</td>
                    <td>${item.spent}</td>
                    <td>$ {item.variance}</td>
                  </tr>
                ) : (
                  <tr key={item.id}>
                    <td>{item.category}</td>
                    <td>${item.budget}</td>
                    <td>${item.spent}</td>
                    <td>${item.variance}</td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
          <Table striped bordered hover responsive size="sm">
            <thead>
              <tr>
                <th>Budget Expenses</th>
                <th>Total Spent</th>
                <th>Total Left</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>$ {totalItems.totalBudgetExpenses}</td>
                <td>$ {totalItems.totalSpent}</td>
                {totalItems.totalLeft < 0 ? (
                  <td className="table-danger">$ {totalItems.totalLeft}</td>
                ) : (
                  <td>${totalItems.totalLeft}</td>
                )}
              </tr>
            </tbody>
          </Table>
        </>
      ) : (
        !transactions &&
        !error &&
        !loading && (
          <Form.Text>
            You haven't recorded any transactions that match the given filter.
          </Form.Text>
        )
      )}
    </>
  );
};

export default SpendAnalysisPage;
