import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import {
  getTransaction,
  getTransactionReset,
  updateTransaction,
  updateTransactionReset,
  getUsersTransactionsReset,
  deleteTransaction,
  deleteTransactionReset,
} from "../../actions/transactionActions";
import { getUserBudget } from "../../actions/budgetActions";

const EditTransactionPage = ({ history, match }) => {
  const transactionID = match.params.id;

  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [transactionType, setTransactionType] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userBudget = useSelector((state) => state.userBudget);
  const { budget, error: budgetError } = userBudget;
  const getTransactionItem = useSelector((state) => state.getTransactionItem);
  const { transaction } = getTransactionItem;
  const updateTransactionItem = useSelector(
    (state) => state.updateTransactionItem
  );
  const { success: successUpdate } = updateTransactionItem;
  const deleteTransactionItem = useSelector(
    (state) => state.deleteTransactionItem
  );
  const { success: successDelete } = deleteTransactionItem;

  const submitHandler = (e) => {
    e.preventDefault();
    const updatedTransaction = {
      _id: transaction._id,
      description,
      amount,
      category,
      transactionType,
    };

    dispatch(updateTransaction(updatedTransaction));
  };

  const deleteHandler = () => {
    dispatch(deleteTransaction(transactionID));
  };

  useEffect(() => {
    // Push to login screen if no user info is found
    if (!userInfo) {
      history.push("/login");
    }
    // Try to get user's budget if no budget is found in state
    if (!budget) {
      dispatch(getUserBudget());
    }
    // If no budget is found for user, push to home screen where user can create new budget
    if (budgetError) {
      history.push("/");
    }

    if (successUpdate) {
      dispatch(getTransactionReset());
      dispatch(updateTransactionReset());
      dispatch(getUsersTransactionsReset());
      history.push("/transactions/all");
    } else if (successDelete) {
      dispatch(deleteTransactionReset());
      dispatch(getTransactionReset());
      dispatch(getUsersTransactionsReset());
      history.push("/transactions/all");
    } else {
      if (!transaction || transaction._id !== transactionID) {
        dispatch(getTransaction(transactionID));
      } else {
        setDescription(transaction.description);
        setAmount(transaction.amount);
        setCategory(transaction.category);
        setTransactionType(transaction.transactionType);
      }
    }
  }, [
    history,
    dispatch,
    userInfo,
    budget,
    transaction,
    transactionID,
    successUpdate,
    successDelete,
    budgetError,
  ]);
  return (
    <Container>
      <LinkContainer to="/transactions/all">
        <Button variant="outline-secondary" className="mb-4">
          View Transactions
        </Button>
      </LinkContainer>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="transactionDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="transactionAmount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            step=".01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="transactionCategory">
          <Form.Label>Category</Form.Label>
          {budget && budget.categories ? (
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {budget.categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          ) : (
            <Form.Text>You don't have any categories created.</Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId="transactionType">
          <Form.Label>Type</Form.Label>
          <Form.Control
            as="select"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option>Income</option>
            <option>Expense</option>
          </Form.Control>
        </Form.Group>
        <Row>
          <Col>
            <Button type="submit" variant="success">
              Update Transaction
            </Button>
          </Col>
          <Col>
            <Button type="button" variant="danger" onClick={deleteHandler}>
              Delete Transaction
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default EditTransactionPage;
