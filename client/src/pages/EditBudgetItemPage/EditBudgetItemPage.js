import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { getUserBudgetItem } from "../../actions/budgetActions";

const EditBudgetItemPage = ({ history, match }) => {
  const budgetID = match.params.budgetid;
  const itemID = match.params.itemid;

  const dispatch = useDispatch();

  const userBudgetItem = useSelector((state) => state.userBudgetItem);
  const { budgetItem } = userBudgetItem;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  const submitHandler = (e) => {
    e.preventDefault();
    // Update budget item
  };

  const deleteHandler = () => {
    // Delete item by id
  };

  useEffect(() => {
    // If user isn't logged in, redirect to login page
    if (!userInfo) {
      history.push("/login");
    }
    // If no budget item is found, get budget item
    if (!budgetItem) {
      dispatch(getUserBudgetItem(budgetID, itemID));
    } else {
      // Set the description & amount to the budget item description & amount
      setDescription(budgetItem.description);
      setAmount(budgetItem.amount);
    }
  }, [dispatch, budgetID, itemID, history, budgetItem, userInfo]);

  return (
    <Container>
      <LinkContainer to="/">
        <Button variant="outline-secondary">Go Back</Button>
      </LinkContainer>
      <Form onSubmit={submitHandler} className="my-4">
        <Form.Group controlId="itemDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="itemAmount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Group>
        <Row>
          <Col>
            <Button type="submit" variant="success">
              Update Item
            </Button>
          </Col>
          <Col>
            <Button type="button" variant="danger" onClick={deleteHandler}>
              Delete Item
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default EditBudgetItemPage;
