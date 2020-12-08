import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  getUserBudgetItem,
  updateBudgetItem,
  updateBudgetItemReset,
} from "../../actions/budgetActions";

const EditBudgetItemPage = ({ history, match }) => {
  const budgetID = match.params.budgetid;
  const itemID = match.params.itemid;
  const type = match.params.itemtype;

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userGetBudgetItem = useSelector((state) => state.userGetBudgetItem);
  const { budgetItem } = userGetBudgetItem;
  const userUpdateBudgetItem = useSelector(
    (state) => state.userUpdateBudgetItem
  );
  const { success: successUpdate } = userUpdateBudgetItem;
  const userDeleteBudgetItem = useSelector(
    (state) => state.userDeleteBudgetItem
  );
  const { success: successDelete } = userDeleteBudgetItem;

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  const submitHandler = (e) => {
    e.preventDefault();
    // Create updated budget item
    const updatedItem = {
      _id: budgetItem._id,
      description,
      amount,
    };
    //Update Item
    dispatch(updateBudgetItem(budgetID, itemID, type, updatedItem));
  };

  const deleteHandler = () => {
    // Delete item by id
  };

  useEffect(() => {
    // If user isn't logged in, redirect to login page
    if (!userInfo) {
      history.push("/login");
    }
    if (successUpdate) {
      dispatch(updateBudgetItemReset());
      history.push("/");
    } else {
      if (!budgetItem || budgetItem._id !== itemID) {
        dispatch(getUserBudgetItem(budgetID, itemID, type));
      } else {
        setDescription(budgetItem.description);
        setAmount(budgetItem.amount);
      }
    }
  }, [
    dispatch,
    history,
    userInfo,
    budgetItem,
    budgetID,
    itemID,
    type,
    successUpdate,
  ]);

  return (
    <Container>
      <LinkContainer to="/budget/view">
        <Button variant="outline-secondary" className="mb-4">
          View Budget
        </Button>
      </LinkContainer>

      <Form onSubmit={submitHandler}>
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
