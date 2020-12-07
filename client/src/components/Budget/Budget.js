import React from "react";
import { useSelector } from "react-redux";
import { Table, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Budget = ({ userBudget }) => {
  return (
    <>
      <h3>Monthly Income</h3>
      <Table striped bordered hover className="my-3">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userBudget.monthlyIncome.map((item) => (
            <tr key={item._id}>
              <td>{item.description}</td>
              <td>${item.amount}</td>
              <td>
                <Link to={`/budget/edit-item/${userBudget._id}/${item._id}`}>
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>Monthly Expenses</h3>
      <Table striped bordered hover className="my-3">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userBudget.monthlyExpenses.map((item) => (
            <tr key={item._id}>
              <td>{item.description}</td>
              <td>${item.amount}</td>
              <td>
                <Link to={`/budget/edit-item/${userBudget._id}/${item._id}`}>
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row>
        <Col>Discretionary Funds: ${userBudget.discretionaryFund}</Col>
        <Col>Emergency Fund: ${userBudget.emergencyFund}</Col>
      </Row>
    </>
  );
};

export default Budget;
