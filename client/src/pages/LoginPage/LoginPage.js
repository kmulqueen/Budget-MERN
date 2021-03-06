import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Spinner, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import { loginUser } from "../../actions/userActions";
import { getUserBudget } from "../../actions/budgetActions";

const LoginPage = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const userBudget = useSelector((state) => state.userBudget);
  const { budget } = userBudget;

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserBudget());
      history.push("/");
    }
  }, [history, dispatch, userLogin, userInfo, budget]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <>
      {loading && <Spinner animation="grow" />}
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Don't have an account?{" "}
          <Link to="/register">Create an account here.</Link>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
