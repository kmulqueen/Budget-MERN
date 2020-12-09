import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Spinner, Button, Row, Col } from "react-bootstrap";
import Message from "../../components/Message";
import Budget from "../../components/Budget";
import { getUserBudget } from "../../actions/budgetActions";

const HomePage = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading: loginLoading, error: loginError } = userLogin;

  const userBudget = useSelector((state) => state.userBudget);
  const { budget, loading: budgetLoading } = userBudget;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getUserBudget());
    }
  }, [userInfo, dispatch, history]);
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

export default HomePage;
