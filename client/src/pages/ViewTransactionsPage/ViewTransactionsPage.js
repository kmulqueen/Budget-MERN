import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Message from "../../components/Message";
import { getUsersTransactions } from "../../actions/transactionActions";

const ViewTransactionsPage = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const getUserTransactions = useSelector((state) => state.getUserTransactions);
  const { transactions, error } = getUserTransactions;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (
        !transactions ||
        transactions === null ||
        transactions === undefined
      ) {
        dispatch(getUsersTransactions());
      }
    }
  }, [history, userInfo, transactions, dispatch]);
  return (
    <Container>
      <h1>Transactions</h1>
      {error && <Message variant="danger">{error}</Message>}
      {transactions ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>
                  <Moment format="MMM DD, YYYY">{transaction.date}</Moment>
                </td>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.category}</td>
                <td>{transaction.transactionType}</td>
                <td>
                  <Link to={`/transaction/edit/${transaction._id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h3>You haven't logged any transactions yet.</h3>
      )}
    </Container>
  );
};

export default ViewTransactionsPage;
