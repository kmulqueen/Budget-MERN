import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Badge } from "react-bootstrap";
import Message from "../../components/Message";
import { getUserBudget, createUserCategory } from "../../actions/budgetActions";

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
    } else if (!budget) {
      dispatch(getUserBudget());
    }
    if (success) {
      if (!budget.monthlyIncome.length) {
        history.push("/budget/update");
      } else {
        history.push("/");
      }
    }
  }, [success, budget, history, userInfo, dispatch]);

  // Sort categories alphabetically
  if (budget && budget.categories.length) {
    budget.categories.sort((a, b) =>
      a.name.localeCompare(b.name, "en", { sensitivity: "base" })
    );
  }

  return (
    <>
      <h3>Add New Categories</h3>
      <Form onSubmit={handleSubmit} className="mb-3">
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
        <Button
          variant="outline-info"
          className="mr-3"
          onClick={handleAddCategory}
        >
          Add Category
        </Button>
        <Button type="submit" variant="success">
          Save Categories
        </Button>
      </Form>
      <h3>Existing Categories</h3>
      {budget && budget.categories.length ? (
        budget.categories.map((item) => (
          <Badge variant="light" className="mr-2" key={item._id}>
            {item.name}
          </Badge>
        ))
      ) : (
        <Form.Text>
          You haven't created any categories yet. Some examples would include:{" "}
          <strong>
            Job, Rent, Gas, Groceries, Utilities, Entertainment, etc.
          </strong>
        </Form.Text>
      )}
    </>
  );
};

export default AddCategoryPage;
