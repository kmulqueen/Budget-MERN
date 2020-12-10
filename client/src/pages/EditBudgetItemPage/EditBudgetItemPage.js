import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  getUserBudgetItem,
  getBudgetItemReset,
  updateBudgetItem,
  updateBudgetItemReset,
  deleteBudgetItem,
  deleteBudgetItemReset,
} from "../../actions/budgetActions";

const EditBudgetItemPage = ({ history, match }) => {
  const budgetID = match.params.budgetid;
  const itemID = match.params.itemid;
  const type = match.params.itemtype;

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userBudget = useSelector((state) => state.userBudget);
  const { budget } = userBudget;
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
  const [category, setCategory] = useState({ name: "" });

  const submitHandler = (e) => {
    e.preventDefault();
    // Create updated budget item
    const updatedItem = {
      _id: budgetItem._id,
      description,
      amount,
      category,
    };
    //Update Item
    dispatch(updateBudgetItem(budgetID, itemID, type, updatedItem));
  };

  const deleteHandler = () => {
    // Delete item by id
    dispatch(deleteBudgetItem(budgetID, itemID, type));
  };

  useEffect(() => {
    // If user isn't logged in, redirect to login page
    if (!userInfo) {
      history.push("/login");
    }

    if (successUpdate) {
      dispatch(getBudgetItemReset());
      dispatch(updateBudgetItemReset());
      history.push("/");
    } else if (successDelete) {
      dispatch(deleteBudgetItemReset());
      history.push("/");
    } else {
      if (!budgetItem || budgetItem._id !== itemID) {
        dispatch(getUserBudgetItem(budgetID, itemID, type));
      } else {
        setDescription(budgetItem.description);
        setAmount(budgetItem.amount);
        setCategory({
          name: budgetItem.category.name,
        });
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
    successDelete,
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
        <Form.Group controlId="itemCategory">
          <Form.Label>Category</Form.Label>
          {budget && budget.categories ? (
            <Form.Control
              as="select"
              value={category.name}
              onChange={(e) =>
                setCategory({
                  name: e.target.value,
                })
              }
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
