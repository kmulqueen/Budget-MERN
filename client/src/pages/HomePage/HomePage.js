import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Spinner, Button, Row, Col } from "react-bootstrap";
import Message from "../../components/Message";
import Budget from "../../components/Budget";

const HomePage = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading: loginLoading, error: loginError } = userLogin;

  const userBudget = useSelector((state) => state.userBudget);
  const { budget, loading: budgetLoading } = userBudget;

  const HomePageAuthenticated = () => {
    return (
      <>
        {loginLoading && <Spinner />}
        {budgetLoading && <Spinner />}
        {loginError && <Message variant="danger">{loginError}</Message>}
        <h1>Hello, {userInfo.name}</h1>
        {!budget ? (
          <>
            <Row>
              <Col>
                <p>You haven't created a budget yet.</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <LinkContainer to="/budget/update">
                  <Button>Create Budget</Button>
                </LinkContainer>
              </Col>
            </Row>
          </>
        ) : (
          budget && !budgetLoading && <Budget userBudget={budget} />
        )}
      </>
    );
  };

  const HomePageGuest = () => {
    return (
      <>
        <h1>
          Please <Link to="/login">login</Link> to continue.
        </h1>
      </>
    );
  };

  useEffect(() => {}, [userInfo, budget]);
  return userInfo ? <HomePageAuthenticated /> : <HomePageGuest />;
};

export default HomePage;
