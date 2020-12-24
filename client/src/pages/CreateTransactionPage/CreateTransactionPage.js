import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Spinner } from "react-bootstrap";
import Message from "../../components/Message";
import { createTransaction } from "../../actions/transactionActions";
import { getUserBudget } from "../../actions/budgetActions";

const CreateTransactionPage = ({ history }) => {
  const [transactionType, setTransactionType] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [transactionError, setTransactionError] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userBudget = useSelector((state) => state.userBudget);
  const { budget, loading, error: budgetError } = userBudget;
  const addTransaction = useSelector((state) => state.addTransaction);
  const { success, error } = addTransaction;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      transactionType === "" ||
      transactionType === null ||
      description === "" ||
      description === null ||
      amount <= 0 ||
      amount === null ||
      category === "" ||
      category === null
    ) {
      setTransactionError(
        "Please fill out all fields and make sure amount is greater than 0."
      );
    } else {
      setTransactionError(null);
      const newTransaction = {
        transactionType,
        description,
        amount,
        category,
      };
      dispatch(createTransaction(newTransaction));
    }
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!budget) {
      dispatch(getUserBudget());
    } else if (
      (budget && budget.monthlyIncome.length === 0) ||
      (budget && budget.monthlyExpenses.length === 0) ||
      (budget && budget.categories.length === 0) ||
      budgetError
    ) {
      history.push("/");
    }

    if (success) {
      history.push("/transactions/all");
    }
  }, [history, userInfo, success, budget, budgetError, dispatch]);
  return (
    <>
      <h1>Add Transaction</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Form onSubmit={handleSubmit}>
          {transactionError && (
            <Message variant="danger">{transactionError}</Message>
          )}
          <Form.Group controlId="transactionTypeSelect">
            <Form.Label>Transaction Type</Form.Label>
            <Form.Control
              as="select"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <option></option>
              <option>Income</option>
              <option>Expense</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="transactionDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="transactionAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              step=".01"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="transactionCategorySelect">
            <Form.Label>Category</Form.Label>
            {budget && budget.categories ? (
              <Form.Control
                as="select"
                value={category.name}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option></option>
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
          <Button variant="success" type="submit">
            Add Transaction
          </Button>
        </Form>
      )}
    </>
  );
};

export default CreateTransactionPage;
