import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../../actions/userActions";

const NavBar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>Budget Pal</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {userInfo ? (
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavDropdown title="Budget" className="basic-nav-dropdown">
              <LinkContainer to="/budget/view">
                <NavDropdown.Item>View Budget</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/budget/update">
                <NavDropdown.Item>Update Budget</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown title="Transactions" className="basic-nav-dropdown">
              <LinkContainer to="/transactions/new">
                <NavDropdown.Item>New Transaction</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/transactions/all">
                <NavDropdown.Item>View Transactions</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>

            <LinkContainer to="/">
              <Nav.Link className="ml-auto" onClick={logoutHandler}>
                Logout
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      ) : (
        <LinkContainer to="/login">
          <Nav className="ml-auto">
            <Nav.Link className="ml-auto">Login</Nav.Link>
          </Nav>
        </LinkContainer>
      )}
    </Navbar>
  );
};

export default NavBar;
