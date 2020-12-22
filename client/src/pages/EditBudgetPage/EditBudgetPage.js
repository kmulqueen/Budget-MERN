import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, InputGroup, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../../components/Message";
import {
  getUserBudget,
  addNewBudgetItems,
  addNewBudgetItemsReset,
} from "../../actions/budgetActions";

const EditBudgetPage = ({ history }) => {
  const [monthlyIncomeDescription, setMonthlyIncomeDescription] = useState("");
  const [monthlyIncomeAmount, setMonthlyIncomeAmount] = useState(0);
  const [monthlyIncomeCategory, setMonthlyIncomeCategory] = useState({
    name: "",
  });
  const [monthlyExpenseDescription, setMonthlyExpenseDescription] = useState(
    ""
  );
  const [monthlyExpenseAmount, setMonthlyExpenseAmount] = useState(0);
  const [monthlyExpenseCategory, setMonthlyExpenseCategory] = useState({
    name: "",
  });
  const [incomeItems, setIncomeItems] = useState([]);
  const [expenseItems, setExpenseItems] = useState([]);
  const [incMessage, setIncMessage] = useState(null);
  const [incError, setIncError] = useState(null);
  const [expMessage, setExpMessage] = useState(null);
  const [expError, setExpError] = useState(null);
  const [message, setMessage] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userBudget = useSelector((state) => state.userBudget);
  const { budget } = userBudget;
  const userAddBudgetItem = useSelector((state) => state.userAddBudgetItem);
  const { success: successAdd } = userAddBudgetItem;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    setMessage(null);

    // Check if any items or categories have been added
    if (incomeItems.length >= 1 || expenseItems.length >= 1) {
      // Clear any errors/messages if any
      setMessage(null);
      // Update existing budget
      dispatch(addNewBudgetItems(incomeItems, expenseItems));
    } else {
      setMessage(
        "Please add at least 1 income or 1 expense item to update your budget."
      );
    }
  };

  const incomeHandler = () => {
    // Check that fields are filled out correctly
    if (
      monthlyIncomeDescription === "" ||
      monthlyIncomeDescription === null ||
      monthlyIncomeAmount <= 0 ||
      monthlyIncomeAmount === null ||
      monthlyIncomeAmount === "" ||
      monthlyIncomeCategory.name === null ||
      monthlyIncomeCategory.name === ""
    ) {
      // If not send error message
      setIncMessage(null);
      setIncError(
        "Please ensure all fields are filled out and the amount is greater than 0"
      );
    } else {
      // If so create a new income item and append it to the income items array
      setIncError(null);
      setIncMessage(null);
      const newIncomeItem = {
        description: monthlyIncomeDescription,
        amount: monthlyIncomeAmount,
        category: monthlyIncomeCategory,
      };

      setIncomeItems([...incomeItems, newIncomeItem]);
      // Show success message
      setIncMessage(
        "Income item created. Click 'Update Budget' below when you are finished to finalize all changes."
      );
      // Clear fields
      setMonthlyIncomeDescription("");
      setMonthlyIncomeAmount(0);
      setMonthlyIncomeCategory((prevState) => ({
        ...prevState,
        name: "",
      }));
    }
  };

  const expenseHandler = () => {
    // Check that fields are filled out correctly
    if (
      monthlyExpenseDescription === "" ||
      monthlyExpenseDescription === null ||
      monthlyExpenseAmount <= 0 ||
      monthlyExpenseAmount === null ||
      monthlyExpenseAmount === "" ||
      monthlyExpenseCategory.name === null ||
      monthlyExpenseCategory.name === ""
    ) {
      setExpMessage(null);
      setExpError(
        "Please ensure all fields are filled out and the amount is greater than 0"
      );
    } else {
      setExpMessage(null);
      setIncError(null);
      // Create new expense item
      const newExpenseItem = {
        description: monthlyExpenseDescription,
        amount: monthlyExpenseAmount,
        category: monthlyExpenseCategory,
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
      setMonthlyExpenseCategory((prevState) => ({
        ...prevState,
        name: "",
      }));
    }
  };

  useEffect(() => {
    // If user isn't logged in, redirect to login page
    if (!userInfo) {
      history.push("/login");
    }
    if (successAdd) {
      // Get updated budget
      dispatch(getUserBudget());
      // Reset update state
      dispatch(addNewBudgetItemsReset());
      // Redirect to home page
      history.push("/");
    }
  }, [userInfo, history, dispatch, successAdd]);

  return (
    <Container>
      <LinkContainer to="/budget/view">
        <Button variant="outline-secondary">View Budget</Button>
      </LinkContainer>
      <Form onSubmit={submitHandler}>
        <h3 className="my-4">Monthly Income</h3>
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
            step=".01"
            placeholder="Enter income amount"
            value={monthlyIncomeAmount}
            onChange={(e) => setMonthlyIncomeAmount(e.target.value)}
          />
        </InputGroup>

        <Form.Group controlId="incomeCategorySelect">
          <Form.Label>Select Category for Income Item</Form.Label>
          {budget && budget.categories ? (
            <Form.Control
              as="select"
              onChange={(e) =>
                setMonthlyIncomeCategory((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
            >
              <option></option>
              {budget.categories.map((category) => (
                <option key={category._id}>{category.name}</option>
              ))}
            </Form.Control>
          ) : !budget || !budget.categories ? (
            <Form.Text>
              You haven't created any categories. Please create at least one to
              continue.
            </Form.Text>
          ) : null}
        </Form.Group>
        <Button variant="outline-info" onClick={incomeHandler}>
          Add Income Item
        </Button>

        <h3 className="my-4">Monthly Expenses</h3>
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
            step=".01"
            placeholder="Enter expense amount"
            value={monthlyExpenseAmount}
            onChange={(e) => setMonthlyExpenseAmount(e.target.value)}
          />
        </InputGroup>
        <Form.Group controlId="expenseCategorySelect">
          <Form.Label>Select Category for Expense Item</Form.Label>
          {budget && budget.categories ? (
            <Form.Control
              as="select"
              onChange={(e) =>
                setMonthlyExpenseCategory((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
            >
              <option></option>
              {budget.categories.map((category) => (
                <option key={category._id}>{category.name}</option>
              ))}
            </Form.Control>
          ) : !budget || !budget.categories ? (
            <Form.Text>
              You haven't created any categories. Please create at least one to
              continue.
            </Form.Text>
          ) : null}
        </Form.Group>
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
        {message && <Message variant="danger">{message}</Message>}
        {!budget ? (
          <Button type="submit" variant="success">
            Create Budget
          </Button>
        ) : (
          <Button type="submit" variant="success">
            Update Budget
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default EditBudgetPage;
