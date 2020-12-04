import React, { useState } from "react";
import { Form, Button, Container, InputGroup, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../../components/Message";

const EditBudgetPage = () => {
  const [monthlyIncomeDescription, setMonthlyIncomeDescription] = useState("");
  const [monthlyIncomeAmount, setMonthlyIncomeAmount] = useState(0);
  const [monthlyExpenseDescription, setMonthlyExpenseDescription] = useState(
    ""
  );
  const [monthlyExpenseAmount, setMonthlyExpenseAmount] = useState(0);
  const [incomeItems, setIncomeItems] = useState([]);
  const [expenseItems, setExpenseItems] = useState([]);
  const [incMessage, setIncMessage] = useState(null);
  const [incError, setIncError] = useState(null);
  const [expMessage, setExpMessage] = useState(null);
  const [expError, setExpError] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const incomeHandler = () => {
    // Check that fields are filled out correctly
    if (
      monthlyIncomeDescription === "" ||
      monthlyIncomeDescription === null ||
      monthlyIncomeAmount <= 0 ||
      monthlyIncomeAmount === null ||
      monthlyIncomeAmount === ""
    ) {
      // If not send error message
      setIncMessage(null);
      setIncError(
        "Please ensure both fields are filled out and the amount is greater than 0"
      );
    } else {
      // If so create a new income item and append it to the income items array
      setIncError(null);
      const newIncomeItem = {
        description: monthlyIncomeDescription,
        amount: monthlyIncomeAmount,
      };

      setIncomeItems([...incomeItems, newIncomeItem]);
      // Show success message
      setIncMessage(
        "Income item created. Click 'Update Budget' below when you are finished to finalize all changes."
      );
      // Clear fields
      setMonthlyIncomeDescription("");
      setMonthlyIncomeAmount(0);
    }
  };

  const expenseHandler = () => {
    // Check that fields are filled out correctly
    if (
      monthlyExpenseDescription === "" ||
      monthlyExpenseDescription === null ||
      monthlyExpenseAmount <= 0 ||
      monthlyExpenseAmount === null ||
      monthlyExpenseAmount === ""
    ) {
      setExpMessage(null);
      setExpError(
        "Please ensure both fields are filled out and the amount is greater than 0"
      );
    } else {
      // Create new expense item
      const newExpenseItem = {
        description: monthlyExpenseDescription,
        amount: monthlyExpenseAmount,
      };
      // Append new expense item to expense items array
      setExpenseItems([...expenseItems, newExpenseItem]);
      // Clear error if exists
      setExpError(null);
      // Show success message
      setExpMessage(
        "Expense item created. Click 'Update Budget' below when you are finished to finalize all changes."
      );
      // Clear fields
      setMonthlyExpenseDescription("");
      setMonthlyExpenseAmount(0);
    }
  };
  return (
    <Container>
      <LinkContainer to="/budget/view">
        <Button variant="outline-secondary">View Budget</Button>
      </LinkContainer>
      <Form onSubmit={submitHandler}>
        <h1 className="my-4">Monthly Income</h1>
        {incError && <Message variant="danger">{incError}</Message>}
        {incMessage && <Message variant="success">{incMessage}</Message>}
        <label htmlFor="monthlyIncomeDescription">Add Description</label>
        <InputGroup className="mb-3">
          <Form.Control
            id="monthlyIncomeDescription"
            type="text"
            placeholder="Enter description"
            value={monthlyIncomeDescription}
            onChange={(e) => setMonthlyIncomeDescription(e.target.value)}
          />
        </InputGroup>
        <label htmlFor="monthlyIncomeAmount">Add Amount</label>
        <InputGroup className="mb-3">
          <Form.Control
            id="monthlyIncomeAmount"
            type="number"
            placeholder="Enter income amount"
            value={monthlyIncomeAmount}
            onChange={(e) => setMonthlyIncomeAmount(e.target.value)}
          />
        </InputGroup>
        <Button variant="outline-info" onClick={incomeHandler}>
          Add Income Item
        </Button>
        <h1 className="my-4">Monthly Expenses</h1>
        {expError && <Message variant="danger">{expError}</Message>}
        {expMessage && <Message variant="success">{expMessage}</Message>}
        <label htmlFor="monthlyExpenseDescription">Add Description</label>
        <InputGroup className="mb-3">
          <Form.Control
            id="monthlyExpenseDescription"
            type="text"
            placeholder="Enter description"
            value={monthlyExpenseDescription}
            onChange={(e) => setMonthlyExpenseDescription(e.target.value)}
          />
        </InputGroup>
        <label htmlFor="monthlyExpenseAmount">Add Amount</label>
        <InputGroup className="mb-3">
          <Form.Control
            id="monthlyExpenseAmount"
            type="number"
            placeholder="Enter expense amount"
            value={monthlyExpenseAmount}
            onChange={(e) => setMonthlyExpenseAmount(e.target.value)}
          />
        </InputGroup>
        <Row>
          <Col>
            <Button
              className="mb-5"
              variant="outline-info"
              onClick={expenseHandler}
            >
              Add Expense Item
            </Button>
          </Col>
        </Row>
        <Button type="submit" variant="success">
          Update Budget
        </Button>
      </Form>
    </Container>
  );
};

export default EditBudgetPage;