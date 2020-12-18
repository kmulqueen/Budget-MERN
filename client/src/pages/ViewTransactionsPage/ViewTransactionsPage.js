import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Table, Button, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Message from "../../components/Message";
import { getUsersTransactions } from "../../actions/transactionActions";
import { getUserBudget } from "../../actions/budgetActions";

const ViewTransactionsPage = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userBudget = useSelector((state) => state.userBudget);
  const { budget } = userBudget;
  const getUserTransactions = useSelector((state) => state.getUserTransactions);
  const { transactions, error } = getUserTransactions;

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [filter, setFilter] = useState({});
  const [filterShow, setFilterShow] = useState(false);

  const toggleFilterShow = () => {
    setFilterShow(!filterShow);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();

    setFilter((prevState) => ({
      ...prevState,
      month,
      year,
      category,
      transactionType,
    }));
  };

  const handleFilterClear = () => {
    setMonth("");
    setYear("");
    setCategory("");
    setTransactionType("");

    setFilter({});

    dispatch(getUsersTransactions({}));
  };

  const handleErrorRefresh = () => {
    dispatch(getUsersTransactions({}));
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!budget) {
      dispatch(getUserBudget());
    }

    if (filter === {}) {
      console.log("filter is empty...");
      dispatch(getUsersTransactions({}));
    } else {
      dispatch(getUsersTransactions(filter));
    }
  }, [history, userInfo, filter, dispatch]);
  return (
    <Container>
      <h1>Transactions</h1>
      {error && (
        <>
          <Message variant="danger">{error}</Message>
          <Button onClick={handleErrorRefresh}>Reload Transactions</Button>
        </>
      )}
      {transactions ? (
        <>
          {!filterShow ? (
            <Button className="mb-3" onClick={toggleFilterShow}>
              Show Filter
            </Button>
          ) : (
            <>
              <Button className="mb-3" onClick={toggleFilterShow}>
                Hide Filter
              </Button>

              <Form onSubmit={handleFilterSubmit}>
                <Form.Row>
                  <Form.Group as={Col} controlId="filterMonth">
                    <Form.Label>Month</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={(e) => setMonth(e.target.value)}
                      value={month}
                    >
                      <option></option>
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

                  <Form.Group as={Col} controlId="filterYear">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Year"
                      onChange={(e) => setYear(e.target.value)}
                      value={year}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="filterCategory">
                    <Form.Label>Category</Form.Label>
                    {budget.categories.length ? (
                      <Form.Control
                        as="select"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                      >
                        <option></option>
                        {budget.categories.map((category) => (
                          <option key={category._id}>{category.name}</option>
                        ))}
                      </Form.Control>
                    ) : (
                      <Form.Text>
                        You don't have any categories created.
                      </Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} controlId="filterTransactionType">
                    <Form.Label>Transaction Type</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={(e) => setTransactionType(e.target.value)}
                      value={transactionType}
                    >
                      <option></option>
                      <option>Income</option>
                      <option>Expense</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
                <Button className="mb-3 mr-3" type="submit" variant="success">
                  Apply Filter
                </Button>
                <Button
                  className="mb-3"
                  type="button"
                  onClick={handleFilterClear}
                  variant="outline-secondary"
                >
                  Clear Filter
                </Button>
              </Form>
            </>
          )}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>
                    <Moment format="MMM DD, YYYY">{transaction.date}</Moment>
                  </td>
                  <td>{transaction.description}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.transactionType}</td>
                  <td>
                    <Link to={`/transaction/edit/${transaction._id}`}>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <h3>You haven't logged any transactions yet.</h3>
      )}
    </Container>
  );
};

export default ViewTransactionsPage;
