import React from "react";
import { Table } from "react-bootstrap";

const Budget = ({ userBudget }) => {
  return (
    <>
      <h1 className="my-3">Budget</h1>
      <h3>Monthly Income</h3>
      <Table striped bordered hover className="my-3">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {userBudget.monthlyIncome.map((item) => (
            <tr key={item._id}>
              <td>{item.description}</td>
              <td>${item.amount}</td>
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
          </tr>
        </thead>
        <tbody>
          {userBudget.monthlyExpenses.map((item) => (
            <tr key={item._id}>
              <td>{item.description}</td>
              <td>${item.amount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Budget;
