import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import { createUserCategory } from "../../actions/budgetActions";

const AddCategoryPage = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userCategoryCreate = useSelector((state) => state.userCategoryCreate);
  const { success } = userCategoryCreate;
  const userBudget = useSelector((state) => state.userBudget);
  const { budget } = userBudget;

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ name: "" });
  const [categoryMessage, setCategoryMessage] = useState(null);
  const [categoryError, setCategoryError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddCategory = () => {
    if (category.name === "" || category.name === null) {
      setCategoryMessage(null);
      setCategoryError("Please enter a category name.");
    } else {
      setCategoryMessage(null);
      setCategoryError(null);
      // Add category to categories array
      setCategories([...categories, category]);
      setCategoryMessage(
        "Category added successfully. Click 'Save Categories' when you are done to save all changes."
      );
      // Clear input field
      setCategory((prevState) => ({
        ...prevState,
        name: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (categories.length >= 1) {
      dispatch(createUserCategory(categories));
    } else {
      setCategoryMessage(null);
      setCategoryError(
        "Please add at least 1 category and then click 'Save Categories' to save all changes."
      );
    }
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (success) {
      if (!budget.monthlyIncome.length) {
        history.push("/budget/update");
      } else {
        history.push("/");
      }
    }
  }, [success, budget, history, userInfo]);

  return (
    <Container>
      <h1>Add New Categories</h1>
      <Form onSubmit={handleSubmit}>
        {categoryError && <Message variant="danger">{categoryError}</Message>}
        {categoryMessage && (
          <Message variant="success">{categoryMessage}</Message>
        )}
        <Form.Group controlId="addCategory">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter category name"
            value={category.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="outline-info" onClick={handleAddCategory}>
          Add Category
        </Button>
        <Button type="submit" variant="success">
          Save Categories
        </Button>
      </Form>
    </Container>
  );
};

export default AddCategoryPage;
