import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Budget = ({ userBudget }) => {
  return (
    <>
      <h3>Monthly Income</h3>
      <Table striped bordered hover className="mb-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userBudget.monthlyIncome.map((item) => (
            <tr key={item._id}>
              <td>{item.description}</td>
              <td>${item.amount}</td>
              <td>{item.category.name}</td>
              <td>
                <Link
                  to={`/budget/edit-item/inc/${userBudget._id}/${item._id}`}
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>Monthly Expenses</h3>
      <Table striped bordered hover className="mb-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userBudget.monthlyExpenses.map((item) => (
            <tr key={item._id}>
              <td>{item.description}</td>
              <td>${item.amount}</td>
              <td>{item.category.name}</td>
              <td>
                <Link
                  to={`/budget/edit-item/exp/${userBudget._id}/${item._id}`}
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>Funds</h3>
      <Table striped bordered hover className="mb-5">
        <thead>
          <tr>
            <th>Discretionary Funds</th>
            <th>Emergency Fund</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${userBudget.discretionaryFund}</td>
            <td>${userBudget.emergencyFund}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Budget;
